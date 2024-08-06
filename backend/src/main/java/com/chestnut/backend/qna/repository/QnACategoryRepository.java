package com.chestnut.backend.qna.repository;

import com.chestnut.backend.qna.entity.QnACategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QnACategoryRepository extends JpaRepository<QnACategory, Byte> {

}
