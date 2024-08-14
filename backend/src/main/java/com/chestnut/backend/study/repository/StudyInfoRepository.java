package com.chestnut.backend.study.repository;

import com.chestnut.backend.study.dto.ConfusedStudyInfo;
import com.chestnut.backend.study.dto.PhonologyStudyInfo;
import com.chestnut.backend.study.dto.ChapterInfoDto;
import com.chestnut.backend.study.dto.ChapterStudyInfo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class StudyInfoRepository {

    @PersistenceContext
    EntityManager em;

    /**
     * 챕터명과 챕터 진도율 조회 쿼리
     */
    public List<ChapterInfoDto> findChapterInfoByMemberId(Long memberId) {
        String query = "select new com.chestnut.backend.study.dto.ChapterInfoDto(c.chapterId, c.chapterName, c.totalStudies, coalesce(y.cnt,0L)) from " +
                "Chapter c left join (" +
                "select x.chapterId as chapterId, count(*) as cnt " +
                "from (" +
                "select s.chapter.chapterId as chapterId, s.study.studyId as studyId " +
                "from StudyLog s " +
                "where s.member.memberId = :memberId and s.passRecord = TRUE " +
                "group by s.study.studyId, s.chapter.chapterId" +
                ") as x " +
                "group by x.chapterId" +
                ") as y " +
                "on c.chapterId = y.chapterId";
        return em.createQuery(query, ChapterInfoDto.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    //


    /**
     * 챕터내 학습 목록 조회 (1,2,3,5,6 단원용)
     * 이렇게 쿼리 한번으로 조회하는게 맞나.. 분리해서 조회하는 법 생각해보기. 또는 인덱스를 만들어서 속도 변화 측정해보기
     */
    public List<ChapterStudyInfo> findChapterStudyInfo(Long memberId, int chapterId) {
        String query = "select new com.chestnut.backend.study.dto.ChapterStudyInfo(sc.categoryContent, s.studyCategory.studyCategoryId, s.studyId, s.word, " +
                "case when sl.passRecord = true then 1 else 0 end, " +
                "case when sl.passRecord is null then 0 else 1 end, " +
                "case when v.studyId is null then 0 else 1 end) " +
                "from Study s left join (" +
                        "select x.study.studyId as studyId, x.studyLogId as studyLogId, x.passRecord as passRecord " +
                        "from StudyLog x join ( " +
                                "select studyLog.study.studyId as studyId, max(studyLog.studyLogId) as recent from StudyLog studyLog " +
                                "where studyLog.member.memberId = :memberId " +
                                "group by studyLog.study.studyId " +
                        ") y " +
                        "on x.study.studyId = y.studyId and x.studyLogId = y.recent " +
                        "where x.member.memberId = :memberId " +
                ") sl " +
                "on s.studyId = sl.studyId " +
                "join StudyCategory sc " +
                "on sc.studyCategoryId = s.studyCategory.studyCategoryId " +
                "left join ( " +
                        "select v.study.studyId as studyId from Vocabulary v where v.member.memberId = :memberId " +
                ") v " +
                "on s.studyId = v.studyId " +
                "where s.chapter.chapterId = :chapterId and (:chapterId != 1 or (s.studyId < 100 and s.studyId != 12))";

        return em.createQuery(query, ChapterStudyInfo.class)
                .setParameter("memberId", memberId)
                .setParameter("chapterId", chapterId)
                .getResultList();
    }

    /**
     * 4단원 챕터내 학습 목록 조회
     * Batch Query 사용 -> 8번의 쿼리 조회를 2번으로 줄임
     */
    public Map<Byte, List<PhonologyStudyInfo>> getPhonologyStudyInfo(List<Byte> studyCategoryIds) {
        String query = "select new com.chestnut.backend.study.dto.PhonologyStudyInfo(s.studyCategory.studyCategoryId, s.studyId, sp.phonologyRule, sp.phonologyExplanation, sp.example) " +
                "from Study s " +
                "join StudyPhonology sp " +
                "on s.studyId = sp.studyId " +
                "where s.studyCategory.studyCategoryId in :studyCategoryIds";

        return em.createQuery(query, PhonologyStudyInfo.class)
                .setParameter("studyCategoryIds", studyCategoryIds)
                .getResultList()
                .stream()
                .collect(Collectors.groupingBy(PhonologyStudyInfo::getStudyCategoryId));
    }

    public List<String> getCategoryName(List<Byte> studyCategoryId) {
        String query = "select sc.categoryContent from StudyCategory sc where sc.studyCategoryId in :ids";
        return em.createQuery(query, String.class)
                .setParameter("ids", studyCategoryId)
                .getResultList();
    }


    /**
     * 7단원 챕터내 학습 목록 조회
     * 간단한 쿼리 2번 날리고 서비스 클래스에서 데이터 가공함
     * 4단원도 이런 식으로 고칠 것
     */
//    public List<ConfusedStudyInfo> getConfusedStudyInfo() {
//        String query = "select new com.chestnut.backend.study.dto.ConfusedStudyInfo(parent.studyCategoryId, parent.categoryContent, " +
//                            "sc.studyCategoryId, sc.categoryContent, " +
//                            "s.studyId, scp.confusedGroupId, " +
//                            "s.word, s.pronounce) " +
//                    "from Study s " +
//                    "join StudyCategory sc " +
//                    "on s.studyCategory.studyCategoryId = sc.studyCategoryId " +
//                    "join StudyConfusedPronounce scp " +
//                    "on scp.studyId = s.studyId " +
//                    "join StudyCategory parent " +
//                    "on parent.studyCategoryId = sc.parent.studyCategoryId";
//
//        return em.createQuery(query, ConfusedStudyInfo.class)
//                .getResultList();
//    }



}
