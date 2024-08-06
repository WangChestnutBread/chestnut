package com.chestnut.backend.openchat.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.web.util.HtmlUtils;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ChatLog {

    @Id
    public String id;

    public String loginId;
    public String nickname;
    public String content;
    public LocalDateTime sendAt;

    public ChatLog(Input input, String loginId, String nickname) {
        this.loginId = loginId;
        this.nickname = nickname;
        this.content = HtmlUtils.htmlEscape(input.getContent());
        this.sendAt = LocalDateTime.now();
    }

}
