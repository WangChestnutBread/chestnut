import "./ChapterMainTemplate.css";
import ChapterCard from "../organisms/ChapterCard";
import "./NavbarExample.css";
import Text32 from "../atoms/Text32";
import { Row, Col, ProgressBar } from "react-bootstrap";
import NavbarExample from "./NavbarExample";

function ChapterMainTemplate({ listdata }) {
  return (
    <div>
      <NavbarExample/>

      {/* 챕터 카드 목록 */}
      <div className="container">
        {/* 제목 */}
        <div className="titleBox">
          <Text32 text={"무엇을 학습할까?"} />
        </div>

        {/* 카드 목록 */}
        <Row xs={2} md={3} lg={4} className="g-4 ChapterCardList">
          {listdata.map((item, i) => (
            <Col key={i}>
              <ChapterCard content={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default ChapterMainTemplate;
