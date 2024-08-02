import HowSpeak from "../../molecules/StudyList/HowSpeak";
import SpeakExplanation from "../../molecules/StudyList/SpeakExplanation";
import './SoundMethod.css'

const mokData = {
  data: {
    syllableList: [
      {
        word: "ㄱ",
        pronounceMethod: "90도 폴더 인사입니다.",
      },
      {
        word: "ㅏ",
        pronounceMethod: "화날때 입을 벌려봅시다.",
      },
      {
        word: "ㄱ",
        pronounceMethod: "90도 폴더 인사입니다.",
      },
    ],
  },
};

const SoundMethod = () => {
  return (
    <div className="box">
      <HowSpeak />
      <SpeakExplanation data={mokData.data.syllableList} />
    </div>
  );
};
export default SoundMethod;
