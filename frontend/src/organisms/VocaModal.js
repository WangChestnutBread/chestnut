import Notation from "../organisms/StudyList/NotationChapter1";
import RecordData from "../organisms/StudyList/Record";
import "../organisms/StudyList/NotationChapter1.css";
import PronunciationLeft from "../molecules/StudyList/PronunciationLeft";
import PronunciationRight from "../molecules/StudyList/PronunciationRight";
import "./VocaModal.css";

const VocaModal = ({ word, pronounce, onClose }) => {

  return (
    <div className="Modal VocaModal">
      {/* x버튼 */}
      <div className="CloseModal">
        <span onClick={onClose}>
          &times;
        </span>
      </div>

      {/* 모달 */}
      <div className="ContentModal">
        {/* 표기, 카메라 */}
        <div className="row">
          <div className="col-6 mt-2">
            <div className="box">
              <div className="abc">표기</div>
              <div className="data1">{word}</div>
            </div>
        </div>

        </div>
        
      {/* 발음 */}
      <div className="row">
        <div className="PronounceBoxes">
          <div className="d-flex">
            <PronunciationLeft data={"발음"} />
            {word ? <PronunciationRight data={word} /> : <></>}
          </div>
          <div className="d-flex">
            <PronunciationLeft data={"내 발음"} />

            {pronounce ? <PronunciationRight data={pronounce} /> : <></>}
          </div>
        </div>
      </div>
        <div className="col-6 mt-2 mb-3"></div>
      </div>
      {/* 마이크 */}
      <RecordData />
    </div>
  );
};
export default VocaModal;
