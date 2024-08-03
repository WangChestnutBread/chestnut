package com.chestnut.backend.qna;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name="QnA_category")
@Getter
public class QnACategory {

    @Id
    @Column(columnDefinition = "tinyint", nullable = false)
    private Byte qnaCategoryId;

    @Column(columnDefinition = "varchar(5)", nullable = false)
    private String qnaCategoryName;

    protected QnACategory() {}
}
