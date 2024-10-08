package com.chestnut.backend.study.service;

import com.chestnut.backend.common.exception.InvalidMemberException;
import com.chestnut.backend.common.exception.MemberNotFoundException;
import com.chestnut.backend.common.exception.NotFoundException;
import com.chestnut.backend.log.entity.StudyLog;
import com.chestnut.backend.log.repository.StudyLogRepository;
import com.chestnut.backend.log.service.LogService;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.study.dto.*;
import com.chestnut.backend.study.entity.*;
import com.chestnut.backend.study.repository.*;
import com.chestnut.backend.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class StudyService {

    private final StudyInfoRepository studyInfoRepository;
    private final StudyRepository studyRepository;
    private final StudyResourceRepository studyResourceRepository;
    private final StudyCategoryRepository studyCategoryRepository;
    private final StudyConfusedPronounceRepository studyConfusedPronounceRepository;
    private final MemberRepository memberRepository;
    private final StudyLogRepository studyLogRepository;
    private final VocabularyRepository vocabularyRepository;

    /**
     * 챕터명과 챕터 진도율 조회 쿼리
     */
    public List<ChapterInfoDto> getChapterInfo(String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);
        if (member.isWithdraw()) throw new InvalidMemberException();
        return studyInfoRepository.findChapterInfoByMemberId(member.getMemberId());
    }

    /**
     * 챕터내 학습 목록 조회
     */
    public List<?> findChapterStudyInfo(String loginId, int chapterId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);
        if (member.isWithdraw()) throw new InvalidMemberException();
        return switch (chapterId) {
            case 4 -> this.phonologyGroupInfo(member.getMemberId());
            case 7 -> this.confusedWordsGroup(member.getMemberId());
            default -> convertData(member.getMemberId(), chapterId);
        };
    }

    /**
     * 챕터내 학습 목록 조회 (1,2,3,5,6단원 데이터 가공)
     */
    public List<ChapterStudyInfoParentDto> convertData(Long memberId, int chapterId) {
        List<ChapterStudyInfo> list = studyInfoRepository.findChapterStudyInfo(memberId, chapterId);
        Map<String, List<ChapterStudyInfo>> collect = list.stream()
                .collect(Collectors.groupingBy(item -> item.getCategoryContent(),
                        TreeMap::new, Collectors.toList()));
        Set<String> keys = collect.keySet();
        return keys.stream()
                .map(item -> mapToParent(item, collect))
                .toList();
    }

    public ChapterStudyInfoParentDto mapToParent(String key, Map<String, List<ChapterStudyInfo>> collect) {
        List<ChapterStudyInfoChildDto> child = collect.get(key).stream()
                .map(item -> new ChapterStudyInfoChildDto(item.getStudyId(), item.getWord(), item.getIsPass(), item.getIsStudy(), item.getIsVocabList()))
                .toList();
        return new ChapterStudyInfoParentDto(key, child);
    }


    /**
     * 챕터내 학습 목록 조회 (4단원)
     */
    public List<PhonologyGroupInfoDto> phonologyGroupInfo(Long memberId) {
        List<Byte> studyCategoryIds = Arrays.asList((byte)22, (byte)23, (byte)24, (byte)25);
        List<Long> studyIdList = studyLogRepository.findStudyIdByChapterIdAndMemberId(memberId, (byte) 4); //회원이 학습한 study_id
        Set<Long> studyIdSet = new HashSet<>(studyIdList);
        List<String> categoryName = studyInfoRepository.getCategoryName(studyCategoryIds);
        Map<Byte, List<PhonologyStudyInfo>> phonologyStudyInfo = studyInfoRepository.getPhonologyStudyInfo(studyCategoryIds);

        return IntStream.range(0, studyCategoryIds.size())
                .mapToObj(i -> {
                    List<PhonologyStudyInfo> infoList = phonologyStudyInfo.getOrDefault(
                        studyCategoryIds.get(i), Collections.emptyList());
                    for (PhonologyStudyInfo info : infoList) {
                        if (studyIdSet.contains(info.getStudyId())) {
                            info.setIsPass(1);
                        } else {
                            info.setIsPass(0);
                        }
                    }
                    return new PhonologyGroupInfoDto(
                        categoryName.get(i),
                        studyCategoryIds.get(i),
                        infoList
                    );
                })
                .collect(Collectors.toList());
    }

    /**
     * 챕터내 학습 목록 조회 (7단원)
     */
    public List<ParentDto> confusedWordsGroup(Long memberId) {
        List<StudyCategory> parents = studyCategoryRepository.findByStudyCategoryIds(Arrays.asList((byte) 1, (byte) 2)); //parent 카테고리
        List<StudyCategory> collectedChildren = collectChildCategories(parents); //parent 카테고리들의 child를 하나의 리스트로 합침
        List<StudyConfusedPronounce> confusedWords = studyConfusedPronounceRepository.findByCategories(collectedChildren); //각 child 카테고리에 속한 학습 목록을 가져옴
        Map<Byte, List<StudyConfusedPronounce>> wordsMappedByCategory = groupWords(confusedWords); //학습 목록을 child 카테고리를 기준으로 묶음 (키: child 카테고리 id, 값: 학습목록)

        return parents.stream()
                .map(parent -> mapToParentDto(parent, wordsMappedByCategory, memberId))
                .toList();
    }

    //parent 카테고리들의 child를 하나의 리스트로 합침
    private List<StudyCategory> collectChildCategories(List<StudyCategory> parents) {
        return parents.stream()
                .flatMap(parent -> parent.getChild().stream())
                .toList();
    }

    //학습 목록을 child 카테고리를 기준으로 묶음 (키: child 카테고리 id, 값: 학습목록)
    private Map<Byte, List<StudyConfusedPronounce>> groupWords(List<StudyConfusedPronounce> confusedWords) {
        return confusedWords.stream()
                .collect(Collectors.groupingBy(item -> item.getStudyCategory().getStudyCategoryId()));
    }

    //ParentDto 생성
    private ParentDto mapToParentDto(StudyCategory studyCategory, Map<Byte, List<StudyConfusedPronounce>> collect, Long memberId) {
        //childCategory에 들어갈 객체 생성
        List<ChildDto> childs = studyCategory.getChild().stream()
                .map(childCategory -> mapToChildDto(childCategory, collect, memberId))
                .toList();

        return ParentDto.builder()
                .parentCategoryId(studyCategory.getStudyCategoryId())
                .parentCategory(studyCategory.getCategoryContent())
                .childCategory(childs)
                .build();
    }

    //ChildDto 생성
    private ChildDto mapToChildDto(StudyCategory studyCategory, Map<Byte, List<StudyConfusedPronounce>> collect, Long memberId) {
        //맵에서 해당 카테고리에 속하는 학습 목록 가져오기
        List<StudyConfusedPronounce> studyInfos = collect.getOrDefault(studyCategory.getStudyCategoryId(), Collections.emptyList());
        //해당 학습 목록을 dto에 맞게 변환
        List<ConfusedStudyInfo> confusedWords = studyInfos.stream()
                .map(this::makeStudyInfo)
                .toList();

        //학습 기록 끼워넣기
        List<StudyLog> recentStudyLogList = studyLogRepository.findRecentStudyLogByMemberId(memberId, (byte) 7);
        Set<Long> passedSet = new HashSet<>();
        Set<Long> studiedSet = new HashSet<>();
        for (StudyLog log : recentStudyLogList) {
            Long studyId = log.getStudy().getStudyId();
            studiedSet.add(studyId);
            if (log.isPassRecord()) {
                passedSet.add(studyId);
            }
        }
        confusedWords = confusedWords.stream().peek(info -> {
            if (passedSet.contains(info.getStudyId())) {
                info.setIsPass(1);
            } else {
                info.setIsPass(0);
            }
            if (studiedSet.contains(info.getStudyId())) {
                info.setIsStudy(1);
            } else {
                info.setIsStudy(0);
            }
        }).toList();

        //confusedWords를 confusedGroupId를 키로 묶기
        Map<Integer, List<ConfusedStudyInfo>> groupedWords = confusedWords.stream()
                .collect(Collectors.groupingBy(item -> item.getConfusedGroupId()));

        List<List<ConfusedStudyInfo>> groupedWordsList = groupedWords.keySet().stream()
                .map(key -> groupedWords.get(key))
                .toList();

        //ChildDto 생성
        return ChildDto.builder()
                .studyCategoryId(studyCategory.getStudyCategoryId())
                .categoryContent(studyCategory.getCategoryContent())
                .grandChildCategory(groupedWordsList)
                .build();
    }

    //학습 목록을 dto에 맞게 변환하는 메서드
    private ConfusedStudyInfo makeStudyInfo(StudyConfusedPronounce word) {
        return ConfusedStudyInfo.builder()
                .studyId(word.getStudyId())
                .confusedGroupId(word.getConfusedGroupId())
                .word(word.getWord())
                .pronounce(word.getPronounce())
                .build();
    }



    /**
     * 학습 상세 페이지 - 표기와 발음 조회
     */
    public WordPronounceDto getWordInfo(Long studyId, String loginId) {
        try {
            Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);
            if (member.isWithdraw()) throw new InvalidMemberException();
            WordPronounceDto wordByStudyId = studyRepository.findWordByStudyId(studyId, member);
            return wordByStudyId;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 학습 상세 페이지 - 발음 방법
     */
    public List<PronounceMethodDto> getPronounceMethod(Map<String, String> words) {
        List<PronounceMethodDto> list = new ArrayList<>();
        SyllableLocation[] locations = SyllableLocation.values();
        String[] params = new String[]{"initial", "middle", "last"};

        for (int i = 0; i < 3; i++) {
            String word = words.getOrDefault(params[i], "none");
            if (word.equals("none")) continue;
            PronounceMethodDto dto = studyRepository.findPronounceMethod(word, locations[i])
                    .orElseThrow(NotFoundException::new);
            list.add(dto);
        }

        return list;
    }



    /**
     * 학습 상세 페이지 - 이미지
     */
    public ImgUrlDto getImgUrl(Long studyId) {
        StudyResource url = studyResourceRepository.findByStudyId(studyId)
                .orElseThrow(NotFoundException::new);
        return new ImgUrlDto(url.getTongueImg(), url.getMouthImg());
    }

    /**
     * 학습 상세 페이지 - 단어 관련 문장 조회
     */
    public List<String> getSentences(Long studyId) {
        Study study = studyRepository.findByStudyId(studyId)
                .orElseThrow(NotFoundException::new);

        return studyRepository.findSentences(study.getWord())
                .orElse(new ArrayList<>())
                .stream()
                .limit(3)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    /**
     * studyId 전체 리스트 반환
     * @return List of study_id of Study table
     */
    public List<Long> getWholeStudyIdList() {
        List<Long> studyIdList = studyRepository.getStudyIdList();
        studyIdList.sort(Long::compareTo);
        return studyIdList;
    }



}
