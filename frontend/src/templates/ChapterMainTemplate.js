import "./ChapterMainTemplate.css";
import ChapterCard from "../atoms/ChapterCard";
import "./NavbarExample.css";
import StudyBackButton from "../molecules/StudyBackButton";
import ChestNutButton from "../organisms/ChestNutButton";
import Text32 from "../atoms/Text32";
import { Row, Col } from "react-bootstrap";

function ChapterMainTemplate({listdata}) {

  return (
    <div>
      {/* navbar */}
        <div className="NavbarExample">
          <div className="NavbarButton">
            <div className="LeftButton">
              <StudyBackButton />
              <ChestNutButton />
            </div>
          </div>
        </div>
      
      {/* 챕터 카드 목록 */}
      <div className="container">
        {/* 제목 */}
        <div className="titleBox">
          <Text32 text={"무엇을 학습할까?"}/>
        </div>

        {/* 카드 목록 */}
        <Row xs={2} md={3} lg={4} className="g-4 ChapterCardList">
          {listdata.map((item, i) => (
            <Col key={i}>
             <ChapterCard content={item}/>
            </Col>
          ))}
        </Row>

        
      </div>
    </div>
  );
}

export default ChapterMainTemplate;


