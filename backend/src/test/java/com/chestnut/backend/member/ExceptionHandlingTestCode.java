//package com.chestnut.backend.member;
//
//import com.chestnut.backend.member.repository.MainMemberRepository;
//import jakarta.persistence.NoResultException;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.BeanFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.dao.EmptyResultDataAccessException;
//import org.springframework.test.util.AssertionErrors;
//import org.springframework.transaction.annotation.Transactional;
//
//@SpringBootTest
//@Transactional
//public class ExceptionHandlingTestCode {
//
//    @Autowired
//    private MainMemberRepository mainMemberRepository;
//
//    @Autowired
//    private BeanFactory context;
//
//    @Test
//    public void PersistenceExceptionTranslationPostProcessor_빈등록_여부() {
//        Assertions.assertTrue(context.containsBean("persistenceExceptionTranslationPostProcessor"));
//    }
//
//    @Test
//    public void 아이디로_멤버찾기_스프링추상화오류() {
//        Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
//            mainMemberRepository.findMemberByLoginId("notAMember");
//        });
//    }
//
//    @Test
//    public void 아이디로_멤버찾기_순수Jpa오류터지나() {
//        try {
//            mainMemberRepository.findMemberByLoginId("notAMember");
//        } catch (NoResultException e) {
//            AssertionErrors.fail("NoResultException 발생");
//        } catch (Exception e) {
//            System.out.println("순수 Jpa 오류 발생하지 않음");
//        }
//    }
//
//
//}
