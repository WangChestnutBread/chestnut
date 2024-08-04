package com.chestnut.backend.member.service;

import com.chestnut.backend.common.exception.MailCodeMismatchException;
import com.chestnut.backend.common.exception.MailSendException;
import com.chestnut.backend.common.exception.MailSessionNotFoundException;
import com.chestnut.backend.common.service.RedisService;
import com.chestnut.backend.member.dto.MailAuthDto;
import com.chestnut.backend.member.dto.SendMailReqDTO;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MailAuthService {

    private final JavaMailSender javaMailSender;
    private final RedisService redisService;
    private final ResourceLoader resourceLoader;
    private static final String senderEmail = "chestnutpronounce@gmail.com";

    private String createCode() {
        int leftLimit = 48; // number '0'
        int rightLimit = 122; // alphabet 'z'
        int targetStringLength = 6;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 | i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    private String getHtmlTemplate(String purpose) {
        String filePath = "classpath:/email/form/" + purpose + ".html";
        Resource resource = resourceLoader.getResource(filePath);

        try (var inputStream = resource.getInputStream()) {
            return new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                    .lines()
                    .collect(Collectors.joining("\n"));
        } catch (IOException e) {
            throw new MailSendException();
        }
    }

    private String setContext(String htmlTemplate, String code) {
        return htmlTemplate.replace("{{authCode}}", code);
    }

    private MimeMessage createEmailForm(String email, String purpose)  {
        String authCode = createCode();
        String htmlTemplate = getHtmlTemplate(purpose);
        String emailContent = setContext(htmlTemplate, authCode);

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            message.addRecipients(MimeMessage.RecipientType.TO, email);
            message.setSubject("왕밤빵 인증번호");
            message.setFrom(senderEmail);
            message.setText(emailContent, "utf-8", "html");
            redisService.setDataExpire(generatePrefixedKey(email, purpose), authCode, 60 * 5 * 1000L);
            return message;
        } catch (Exception e) {
            throw new MailSendException();
        }
    }

    public void sendMail(SendMailReqDTO sendMailReqDTO) {

        if (redisService.existData(generatePrefixedKey(sendMailReqDTO.getEmail(), sendMailReqDTO.getPurpose()))) {
            redisService.deleteData(generatePrefixedKey(sendMailReqDTO.getEmail(), sendMailReqDTO.getPurpose()));
        }

        //purpose가 signup, changeEmail인 경우 -> 아래 로직 수행 (code 발급)
        MimeMessage emailForm = createEmailForm(sendMailReqDTO.getEmail(), sendMailReqDTO.getPurpose());
        javaMailSender.send(emailForm);

        //purpose가 changePassword인 경우 -> 링크 보내기
    }

    public Boolean verifyEmailCode(MailAuthDto mailAuthDto) {
        String issuedCode = redisService.getData(generatePrefixedKey(mailAuthDto.getEmail(), mailAuthDto.getPurpose()));
        if (issuedCode == null) {
            throw new MailSessionNotFoundException(); //세션에 해당 키 값 없다.
        }

        if (!issuedCode.equals(mailAuthDto.getCode())) {
            throw new MailCodeMismatchException();
        }

        redisService.deleteData(generatePrefixedKey(mailAuthDto.getEmail(), mailAuthDto.getPurpose()));
        return true;
    }

    private String generatePrefixedKey(String email, String purpose) {
        return "AuthCode:" + purpose + ":" + email;
    }

}
