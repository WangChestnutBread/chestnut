package com.chestnut.backend.qna.dto;

import com.chestnut.backend.qna.entity.QnACategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QnAResDTO {
    List<QnACategory> qnaCategory;
//    Page<QnAListDTO> qnaList;
    List<QnAListDTO> qnaList;
    Pageable pageable;
}
