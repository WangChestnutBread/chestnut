import { Modal, Container, Stack } from "react-bootstrap";
import Record from "../organisms/StudyList/Record";
import "../organisms/StudyList/NotationChapter1.css";
import "./VocaModal.css";
import Text24 from "../atoms/Text24";
import Text32 from "../atoms/Text32";
import { useState } from "react";
import baseApi from "../api/fetchAPI";

const VocaModal = ({ word, pronounce, studyId, onClose }) => {
  const [myPronounce, setMyProunce] = useState(
    `이곳에 녹음한 내 발음이 \n 표시돼요😎`
  );
  const [answerPronounce, setAnswerPronounce] = useState([100000]);
  const [show, isShow] = useState(false);

  const movePronounce = (value) => {
    setMyProunce(value);
  };

  const answer = (value) => {
    setAnswerPronounce(value);
    console.log(value);
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
          console.log(res);
          alert("축하드려요 성공입니다.");
        });
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
              <div className="col-12 col-lg-6 p-2">
                <div className="box">
                  <div className="abc">표기</div>
                  <div className="data1" style={{ fontSize: "2rem" }}>
                    {word}
                  </div>
                </div>
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
                    <Text24 text={pronounce} />
                  </div>
                ) : null}
              </div>
              <Stack direction="horizontal" className=" PronunciationGroup">
                <div className="col-12 col-lg-6 PronunciationGroup">
                  <div className="LeftSide">
                    <Text24 text="내 발음" />
                  </div>
                  {word ? (
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
          <Record func={movePronounce} func2={answer} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default VocaModal;
