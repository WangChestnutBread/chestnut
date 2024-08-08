package com.chestnut.backend.member.repository;

import com.chestnut.backend.member.dto.MainMemberInfoDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

@Repository
public class MainMemberRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public MainMemberInfoDto findMainMemberInfo(Long memberId) {
        String query = "SELECT new com.chestnut.backend.member.dto.MainMemberInfoDto(" +
                "a.avatarId, a.avatarName, a.avatarImgUrl, " +
                "COALESCE(nextA.lowerLimit, a.lowerLimit), " +
                "m.nickname, m.reward, m.ranking, " +
                "s.studyId, s.word, c.chapterId, c.chapterName, " +
                "COALESCE(al.attendanceCount, 0)) " +
                "FROM Member m " +
                "LEFT JOIN m.avatar a " +
                "LEFT JOIN Avatar nextA ON a.avatarId + 1 = nextA.avatarId " +
                "LEFT JOIN m.study s " +
                "LEFT JOIN s.chapter c " +
                "LEFT JOIN AttendanceLog al ON m.memberId = al.member.id " +
                "WHERE m.memberId = :memberId " +
                "ORDER BY al.attendanceLogId DESC";

        TypedQuery<MainMemberInfoDto> typedQuery = entityManager.createQuery(query, MainMemberInfoDto.class);
        typedQuery.setParameter("memberId", memberId);
        typedQuery.setMaxResults(1);  // Fetch only the top result

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
