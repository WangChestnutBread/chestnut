import { Button, Modal } from "react-bootstrap";
import "./WelcomeModal.css";
import Text20 from "./Text20";
import Text24 from "./Text24";

function WelcomeModal({ onClose, handleStartTutorial }) {
  return (
    <Modal className="modal WelcomeModal" show onHide={onClose} centered>
      {/* <Modal.Header closeButton className="WelcomeModalHeader"></Modal.Header> */}
      <Modal.Header className="WelcomeModalHeader"></Modal.Header>
      <Modal.Body className="WelcomeModalBody">
        <img src="./image/Squirrel.png" width="40px" />
        <Text24 text={"'왕밤빵'에 오신 것을 환영합니다!"} />
        <Text20
          text={
            "저희 서비스를 선택해주셔서 감사합니다. \n 당신의 발음 향상을 위해 왕밤빵은 늘 함께하겠습니다:)"
          }
        />
      </Modal.Body>
      <Modal.Footer className="WelcomeModalFooter">
        <p className="RedDot">*붉은 점을 누르면 튜토리얼이 진행됩니다</p>
        <Button className="WelcomeModalButton" onClick={handleStartTutorial}>
          튜토리얼 시작하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WelcomeModal;
