package com.chestnut.backend.member.repository;

import com.chestnut.backend.member.dto.MainMemberInfoDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;

/**
 * 멤버 관련 데이터베이스 작업을 수행하는 Repository 클래스.
 * 이 클래스는 멤버의 정보를 조회하고 업데이트하는 메서드를 포함하며,
 * JPA를 사용하여 데이터베이스와 상호작용 수행.
 *
 * 주요 기능:
 * - 멤버 정보 조회
 * - 멤버의 랭킹 업데이트
 */
@Repository
public class MainMemberRepository {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * 주어진 멤버 ID에 대한 메인페이지에 나타낼 멤버 정보를 조회.
     *
     * 이 메서드는 멤버의 아바타 정보, 닉네임, 보상, 랭킹,
     * 학습 정보 및 출석 기록을 포함한 DTO 객체를 반환.
     *
     * @param memberId 조회할 멤버의 ID
     * @return MainMemberInfoDto 조회한 멤버 정보 DTO
     * @throws EmptyResultDataAccessException 멤버 ID에 해당하는 정보가 없을 경우 발생
     */
    public MainMemberInfoDto findMainMemberInfo(Long memberId) {
        // JPQL 쿼리 정의
        String query = """
                SELECT new com.chestnut.backend.member.dto.MainMemberInfoDto(
                    a.avatarId, a.avatarName, a.avatarImgUrl,
                    COALESCE(nextA.lowerLimit, a.lowerLimit),
                    m.nickname, m.reward, m.ranking,
                    s.studyId, s.word, c.chapterId, c.chapterName,
                    COALESCE(al.attendanceCount, 0)
                )
                FROM Member m
                LEFT JOIN m.avatar a
                LEFT JOIN Avatar nextA ON a.avatarId + 1 = nextA.avatarId
                LEFT JOIN m.study s
                LEFT JOIN s.chapter c
                LEFT JOIN AttendanceLog al ON m.memberId = al.member.id
                WHERE m.memberId = :memberId
                ORDER BY al.attendanceLogId DESC
            """;
        // TypedQuery 객체 생성
        TypedQuery<MainMemberInfoDto> typedQuery = entityManager.createQuery(query, MainMemberInfoDto.class);
        typedQuery.setParameter("memberId", memberId);
        // 결과를 최대 1개로 제한
        typedQuery.setMaxResults(1);  // Fetch only the top result
        // 쿼리 실행 후 결과 반환
        return typedQuery.getSingleResult();
    }

    public void updateRanking() {
        String query = "UPDATE member m " +
                "JOIN (SELECT member_id, RANK() OVER (ORDER BY reward DESC) AS ranking FROM member) r " +
                "ON r.member_id = m.member_id " +
                "SET m.ranking = r.ranking";

        entityManager.createNativeQuery(query).executeUpdate();
    }

}
