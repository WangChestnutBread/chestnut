package com.chestnut.backend.qna.dto;

import com.chestnut.backend.qna.entity.QnA;
import com.chestnut.backend.qna.entity.QnACategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QnAResDto {
    List<QnACategory> qnaCategory;
    Page<QnA> qnaList;
}
