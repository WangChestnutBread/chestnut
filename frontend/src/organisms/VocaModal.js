import { Modal, Container, Stack } from "react-bootstrap";
import RecordData from "../organisms/StudyList/Record";
import "../organisms/StudyList/NotationChapter1.css";
import "./VocaModal.css";
import Text24 from "../atoms/Text24";
import Text32 from "../atoms/Text32";

const VocaModal = ({ word, pronounce, onClose }) => {
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
                  <div className="data1" style={{fontSize: "2rem"}}>{word}</div>
                </div>
              </div>
              
            </Stack>

            {/* 발음 */}
            <Stack direction="horizontal" className="PronunciationStack">
              <div className="col-12 col-lg-6 PronunciationGroup">
                <div className="LeftSide">
                  <Text24 text="발음"/>
                </div>
                  {word ? <div className="RightSide">
                    <Text32 text={pronounce} />
                    </div> : null}
              </div>
              <Stack direction="horizontal" className=" PronunciationGroup">
                <div className="col-12 col-lg-6 PronunciationGroup">
                  <div className="LeftSide">
                    <Text24 text="내 발음"/>
                  </div>
                    {word ? <div className="RightSide">
                      <Text32 text={pronounce} />
                      </div> : null}
                </div>
              </Stack>
            </Stack>
          </Container>
        </Modal.Body>

        {/* 마이크 */}
        <Modal.Footer className="ModalFooter">
          <RecordData />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default VocaModal;
