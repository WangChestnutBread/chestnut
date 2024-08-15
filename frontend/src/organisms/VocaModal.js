import { Modal, Container, Stack } from "react-bootstrap";
import "../organisms/StudyList/NotationChapter1.css";
import "./VocaModal.css";
import Text24 from "../atoms/Text24";
import Text32 from "../atoms/Text32";
import { useState } from "react";
import baseApi from "../api/fetchAPI";
import CustomAlert from "../atoms/alert";
import RecordForModal from "./StudyList/RecordForModal";
import CameraOrganism from "./StudyList/CameraOrganism";

const VocaModal = ({ word, pronounce, studyId, chapterId, onClose }) => {
  const [myPronounce, setMyProunce] = useState(
    `이곳에 녹음한 내 발음이 \n 표시돼요😎`
  );
  const [answerPronounce, setAnswerPronounce] = useState([100000]);
  const [show, isShow] = useState(false);
  const [correct, isCorrect] = useState(false);
  const [wrong, isWrong] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const movePronounce = (value) => {
    setMyProunce(value);
  };

  const handleCloseAlert = () => {
    setAlertContent(null); // Alert 닫기
  };

  const answer = (value) => {
    setAnswerPronounce(value);
    // console.log(value);
    if (value.length === 0) {
      isShow(true);
      baseApi
        .get("/log/study", {
          params: {
            studyId,
            isPass: 1,
          },
        })
        .then((res) => {
          isCorrect(true);
          setTimeout(() => {
            isCorrect(false);
          }, 2000);
          setAlertContent(`✨ 축하합니다~! ✨<br> 성공입니다~! 🥳`);
        })
        .catch((err) => {
          isWrong(true);

          setTimeout(() => {
            isWrong(false);
          }, 2000);
        });
    } else if (value.length > 0 && value.length < 15) {
      setAlertContent(`❌ 실패입니다~! 😭<br>다시 한번 녹음해주세요~!`);
    }
  };

  return (
    <div>
      {/* 모달 */}
      <Modal size="lg" show onHide={onClose} centered>
        {/* x버튼 */}
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body>
          <Container fluid className="ContentModal">
            {/* 표기 */}
            <Stack direction="horizontal" className="ShowBox">
              <div className="p-2 GreenBoard">
                <div className="box GreenBox">
                  <div className="abc">표기</div>
                  <div className="data1" style={{ fontSize: "2rem" }}>
                    {word}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 p-2 ModalCam">
                <CameraOrganism />
              </div>
            </Stack>
            {/* 발음 */}
            <Stack direction="horizontal" className="PronunciationStack">
              <div className="col-12 col-lg-6 PronunciationGroup">
                <div className="LeftSide">
                  <Text24 text="발음" />
                </div>
                {word ? (
                  <div className="RightSide">
                    {/* <Text24 text={pronounce}  /> */}
                    {pronounce.split("").map((char, index) => (
                      <span
                        key={index}
                        style={{
                          color: answerPronounce.includes(index)
                            ? "red"
                            : "black",
                          fontSize: "1.5rem",
                          whiteSpace: "pre",
                          display: "inline-block",
                        }}
                        // onClick={() => onCharacterClick(char)}
                      >
                        {char}
                      </span>
                    ))}
                    {/* <p>{pronounce.split("").map((char,index)=> )}</p> */}
                  </div>
                ) : null}
              </div>
              <Stack direction="horizontal" className=" PronunciationGroup">
                <div className="col-12 col-lg-6 PronunciationGroup">
                  <div className="LeftSide">
                    <Text24 text="내 발음" />
                  </div>
                  {pronounce ? (
                    <div className="RightSide">
                      <Text24 text={myPronounce} />
                    </div>
                  ) : null}
                </div>
              </Stack>
            </Stack>
          </Container>
        </Modal.Body>

        {/* 마이크 */}
        <Modal.Footer className="ModalFooter">
          <RecordForModal
            func={movePronounce}
            func2={answer}
            studyId={studyId}
            chapterId={chapterId}
          />
        </Modal.Footer>
      </Modal>

      {alertContent && (
        <CustomAlert content={alertContent} onClose={handleCloseAlert} />
      )}
    </div>
  );
};
export default VocaModal;
