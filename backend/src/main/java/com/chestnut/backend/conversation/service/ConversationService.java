package com.chestnut.backend.conversation.service;

import com.chestnut.backend.common.exception.*;
import com.chestnut.backend.common.service.RedisService;
import com.chestnut.backend.conversation.dto.ChatMessageDto;
import com.chestnut.backend.conversation.dto.ChatReposeJsonDto;
import com.chestnut.backend.conversation.dto.ConversationDto;
import com.chestnut.backend.log.service.LogService;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.study.service.ClovaSpeechClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConversationService {

    private final MemberRepository memberRepository;
    private final ClovaSpeechClient clovaSpeechClient;
    private final OpenAIChatClient openAIChatClient;
    private final RedisService redisService;
    private final LogService logService;

    @Value("${openai.max-token.limit:500}")
    private short MAX_TOKEN_LIMIT; // ChatGPT API의 토큰 제한
    @Value("${openai.expiration-time.millis:300000}")
    private long EXPIRATION_TIME_MILLIS; // 대화 기록 만료 시간 (5분)
    private final String REWARD_PURPOSE = "DailyConversationReward:";
    private final String HISTORY_PURPOSE = "History:";
    private final String TOKEN_SIZE_PURPOSE = "Len:";

    public void startConversation(String loginId) {
        log.debug("대화 시작 태그 : service");
        Member member = memberRepository.findByLoginId(loginId).orElseThrow(MemberNotFoundException::new);
        if(member.isWithdraw()) throw new InvalidMemberException();
        initializeConversation(loginId);
    }

    @Transactional
    public ConversationDto chatMessage(String loginId,
//                            MultipartFile audioFile,
                                       String sttResult) {
        Member member = memberRepository.findByLoginId(loginId).orElseThrow(MemberNotFoundException::new);
        if(member.isWithdraw()) throw new InvalidMemberException();
        try {
//            String sttResult = clovaSpeechClient.upload(audioFile);
            log.debug("STT 태그 : STT 결과 = "+ sttResult);
            if (sttResult.isEmpty()) throw new NullSTTException();
            // 글자 수 확인
            if (Integer.parseInt(redisService.getData(generatePrefixedKey(TOKEN_SIZE_PURPOSE, loginId))) + sttResult.length() > MAX_TOKEN_LIMIT) throw new TokenLenException();
            // 기존 대화 이어서 처리
            List<ChatMessageDto> chatHistory = redisService.getListData(generatePrefixedKey(HISTORY_PURPOSE, loginId));
            log.debug("대화 태그 : 기존 대화 = "+chatHistory);
            // 대화 시간 만료 = 새로운 대화 시작 유도
            if (chatHistory == null) throw new TimeOutException();
            //CHATGPT 전달
            chatHistory.add(new ChatMessageDto("user", sttResult));
            log.debug("대화 태그 : 새로운 질문 포함 = "+chatHistory);
            ChatReposeJsonDto chatReposeJsonDto = openAIChatClient.sendMessage(chatHistory);
            log.debug("대화 태그 : ai 대답 = "+chatReposeJsonDto.getAiMessage());
            // 대화 기록 업데이트
            chatHistory.add(new ChatMessageDto("system", chatReposeJsonDto.getAiMessage()));
            // 보상 로직 첫 대화 시 보상
            if (!redisService.existData(generatePrefixedKey(REWARD_PURPOSE, loginId))) {
                logService.getReward(member, (byte) 5, (byte) 2);
                String todayDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
                long millisUntilMidnight = LocalTime.now().until(LocalTime.MIDNIGHT, ChronoUnit.MILLIS);
                if (millisUntilMidnight < 0) { millisUntilMidnight += TimeUnit.DAYS.toMillis(1);}
                log.debug("대화 태그 : 보상 시간 "+millisUntilMidnight);
                redisService.setDataExpire(generatePrefixedKey(REWARD_PURPOSE, loginId), todayDate, millisUntilMidnight);
                log.debug("대화 태그 : 보상 부여 완료");
            }
            redisService.setListDataExpire(generatePrefixedKey(HISTORY_PURPOSE, loginId),
                    chatHistory,
                    EXPIRATION_TIME_MILLIS);
            log.debug(String.valueOf(chatReposeJsonDto.getTotalTokens()));
            redisService.setDataExpire(generatePrefixedKey(TOKEN_SIZE_PURPOSE, loginId),
                    String.valueOf(chatReposeJsonDto.getTotalTokens()),
                    EXPIRATION_TIME_MILLIS);
            byte isLimit = chatReposeJsonDto.getTotalTokens() >= MAX_TOKEN_LIMIT? (byte) 1 : (byte) 0 ;
            return new ConversationDto(sttResult,chatReposeJsonDto.getAiMessage(), isLimit);
        }catch (FileIOException e){
            throw new FileIOException();
        }catch (SttFailException e){
            throw new SttFailException();
        }catch (NullSTTException e){
            throw new NullSTTException();
        }catch (RedisException e){
            throw new RedisException();
        }catch (TimeOutException e){
            throw new TimeOutException();
        }catch (TokenLenException e){
            throw new TokenLenException();
        }catch (DatabaseException e){
            throw new DatabaseException();
        }catch (ChatApiFailException e){
            throw new ChatApiFailException();
        }catch (Exception e){
            log.debug(e.getMessage());
            throw new UnknownException();
        }
    }
    private void initializeConversation(String loginId) {
        try {
        redisService.deleteData(generatePrefixedKey(HISTORY_PURPOSE, loginId));
        redisService.deleteData(generatePrefixedKey(TOKEN_SIZE_PURPOSE, loginId));
        redisService.setListDataExpire(generatePrefixedKey(HISTORY_PURPOSE, loginId),
                List.of(new ChatMessageDto("system", "Answer in Korean")),
                EXPIRATION_TIME_MILLIS);
        redisService.setDataExpire(generatePrefixedKey(TOKEN_SIZE_PURPOSE, loginId), "3", EXPIRATION_TIME_MILLIS);
        }catch (RedisException e){
            throw new RedisException();
        }
    }

    private String generatePrefixedKey(String purpose, String loginId) {
        return new StringBuilder().append("Conversation:").append(purpose).append(":").append(loginId).append(":").toString();
    }
}
