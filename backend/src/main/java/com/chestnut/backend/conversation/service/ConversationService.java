package com.chestnut.backend.conversation.service;

import com.chestnut.backend.common.exception.TimeOutException;
import com.chestnut.backend.common.exception.TokenLenException;
import com.chestnut.backend.common.service.RedisService;
import com.chestnut.backend.conversation.dto.ChatMessageDto;
import com.chestnut.backend.conversation.dto.ChatReposeJsonDto;
import com.chestnut.backend.conversation.dto.ConversationDto;
import com.chestnut.backend.log.service.LogService;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.service.MemberService;
import com.chestnut.backend.study.service.ClovaSpeechClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

/**
 * AI 자유 대화 관련 기능 제공 서비스 클래스.
 * 대화 시작, 메시지 보내기 기능 포함.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ConversationService {

    private final ClovaSpeechClient clovaSpeechClient;
    private final OpenAIChatClient openAIChatClient;
    private final RedisService redisService;
    private final LogService logService;
    private final MemberService memberService;

    // ChatGPT 대화 설정
    @Value("${openai.max-token.limit:500}")
    private short MAX_TOKEN_LIMIT; // ChatGPT API 토큰 제한
    @Value("${openai.expiration-time.millis:300000}")
    private long EXPIRATION_TIME_MILLIS; // 대화 기록 만료 시간 (5분)

    // redis 저장 prefix
    private final String REWARD_PURPOSE = "DailyConversationReward:";
    private final String HISTORY_PURPOSE = "History:";
    private final String TOKEN_SIZE_PURPOSE = "Len:";

    /**
     * AI 자유 대화 메서드.
     *
     * @param loginId 대화할 사용자 아이디
     */
    public void startConversation(String loginId) {
        log.debug("대화 시작 태그 : service");
        // 멤버 유효성 검사
        memberService.validateMember(loginId);
        // 대화 초기화
        initializeConversation(loginId);
    }

    /**
     * AI에게 메시지를 주고 받는 메서드.
     *
     * @param loginId 대화하는 사용자
     * @param audioFile 사용자 질문 녹음본
     * @return ConversationDto 사용자 물음과 AI 답변을 포함하는 DTO
     */
    @Transactional
    public ConversationDto chatMessage(String loginId,
                                       MultipartFile audioFile) {
        // 멤버 유효성 검사
        Member member = memberService.validateMember(loginId);
        // 현재 시작한 발음 여부 확인
        validateConversationState(loginId);

        // 사용자 질문 녹음 STT 수행
         String sttResult = clovaSpeechClient.upload(audioFile);

        log.debug("STT 태그 : STT 결과 = "+ sttResult);

        // 글자 수가 지정한 토큰 제한을 넘었는지 검사
        validateTokenLimit(loginId, sttResult);

        // 기존 대화 이어서 처리
        List<ChatMessageDto> chatHistory = getChatHistory(loginId);
        log.debug("대화 태그 : 기존 대화 = "+chatHistory);


        // 사용자 대화 DTO로 정리 및 기록
        ChatMessageDto userMessage = new ChatMessageDto("user", sttResult);
        chatHistory.add(userMessage);
        log.debug("대화 태그 : 새로운 질문 포함 = "+chatHistory);

        // CHATGPT 전달
         ChatReposeJsonDto chatReposeJsonDto = openAIChatClient.sendMessage(chatHistory);

        log.debug("대화 태그 : ai 대답 = "+chatReposeJsonDto.getAiMessage());

        // AI 대답 DTO로 정리 및 기록
        ChatMessageDto aiMessage = new ChatMessageDto("system", chatReposeJsonDto.getAiMessage());
        chatHistory.add(aiMessage);
        // 첫 대화 시 보상
        giveReword(member);

        // 대화 기록 갱신
        insertRedisChatHistory(loginId, chatHistory, String.valueOf(chatReposeJsonDto.getTotalTokens()));
        log.debug(String.valueOf(chatReposeJsonDto.getTotalTokens()));

        // 유효 토큰 만료 여부
        byte isLimit = chatReposeJsonDto.getTotalTokens() >= MAX_TOKEN_LIMIT? (byte) 1 : (byte) 0 ;

        // 현재 질문과 그에 따른 AI 답변 반환
        return new ConversationDto(List.of( userMessage, aiMessage ), isLimit);
    }

    /**
     * 대화 상태를 검증하는 메서드.
     *
     * @param loginId 사용자 로그인 아이디
     * @throws TimeOutException 대화 시간이 만료된 경우
     */
    private void validateConversationState(String loginId) {
        if(!redisService.existData(generatePrefixedKey(HISTORY_PURPOSE, loginId)))
            throw new TimeOutException(); // 시간 만료 예외
    }

    /**
     * 글자 수가 지정한 토큰 제한을 넘었는지 검사.
     *
     * @param loginId 사용자 로그인 ID
     * @param sttResult STT 결과 텍스트
     * @throws TokenLenException 토큰 제한을 초과한 경우
     */
    private void validateTokenLimit(String loginId, String sttResult ) {
        int curToken = Integer.parseInt(redisService.getData(generatePrefixedKey(TOKEN_SIZE_PURPOSE, loginId))) + sttResult.length();
        if ( curToken > MAX_TOKEN_LIMIT)
            throw new TokenLenException();
    }

    /**
     * 대화 기록을 가져오는 메서드.
     *
     * @param loginId 사용자 로그인 ID
     * @return List<ChatMessageDto> 대화 기록
     * @throws TimeOutException 대화 시간이 만료된 경우
     */
    private List<ChatMessageDto> getChatHistory(String loginId) {
        List<ChatMessageDto> chatHistory = redisService.getListData(generatePrefixedKey(HISTORY_PURPOSE, loginId));
        // 대화 시간 만료 = 새로운 대화 시작 유도
        if (chatHistory == null)
            throw new TimeOutException();
        return chatHistory;
    }

    /**
     * 보상을 처리하는 메서드.
     *
     * @param member 사용자 정보
     */
    private void giveReword(Member member) {
        // 이미 오늘 보상을 주었으면 주지 않음
        if (redisService.existData(generatePrefixedKey(REWARD_PURPOSE, member.getLoginId())))
            return;
        logService.getReward(member, (byte) 5, (byte) 2);
        log.debug("대화 태그 : 보상 부여 완료");
        String todayDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        log.debug("대화 태그 : 보상 날짜 "+todayDate);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime nextMidnight = now.toLocalDate().plusDays(1).atStartOfDay();
        long millisUntilMidnight = ChronoUnit.MILLIS.between(now, nextMidnight);
        log.debug("대화 태그 : 보상 시간 "+millisUntilMidnight);
        redisService.setDataExpire(generatePrefixedKey(REWARD_PURPOSE, member.getLoginId()), todayDate, millisUntilMidnight);
        log.debug("대화 태그 : 보상 부여 기록 완료");
    }

    /**
     * AI 자유 대화 초기화 메서드.
     *
     * @param loginId 대화할 사용자 아이디
     */
    private void initializeConversation(String loginId) {
        // 기존 대화 기록 삭제
        redisService.deleteData(generatePrefixedKey(HISTORY_PURPOSE, loginId)); // 대화 기록 삭제
        redisService.deleteData(generatePrefixedKey(TOKEN_SIZE_PURPOSE, loginId)); // 대화 토큰 삭제
        // 초기 system 설정 세팅
        insertRedisChatHistory(loginId,
                               List.of(new ChatMessageDto("system", "Answer in Korean, within 35 tokens. Respond in one concise sentence. Be engaging and supportive, encouraging further questions")),
                         "23");
    }

    /**
     * Redis 저장할 key 생성.
     *
     * @param purpose 저장 목적
     * @param loginId 저장할 사용자 아이디
     * @return String prefix 포함한 Redis key
     */
    private String generatePrefixedKey(String purpose, String loginId) {
        return new StringBuilder().append("Conversation:").append(purpose).append(":")
                                  .append(loginId).append(":").toString();
    }

    /**
     * Redis에 사용자 대화 기록 생성/추가
     * @param loginId 대화 중인 사용자 아이디
     * @param chatHistory 생성/추가할 대화 기록
     * @param token 지금까지 대화한 총 토큰 수
     */
    private void insertRedisChatHistory(String loginId, List<ChatMessageDto> chatHistory, String token){// 첫 system 설정 토큰 수 저장
        redisService.setListDataExpire(generatePrefixedKey(HISTORY_PURPOSE, loginId),
                chatHistory,
                EXPIRATION_TIME_MILLIS); // 대화 내용 갱신
        redisService.setDataExpire(generatePrefixedKey(TOKEN_SIZE_PURPOSE, loginId),
                token,
                EXPIRATION_TIME_MILLIS); // 대화 길이(토큰) 갱신
    }
}
