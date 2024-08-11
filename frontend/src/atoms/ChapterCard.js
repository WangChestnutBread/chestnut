import "./ChapterCard.css";
import { Button, Card } from "react-bootstrap";
import Text24 from "./Text24";
import { useNavigate } from "react-router-dom";

function ChapterCard({content}) {
  
  let navigate = useNavigate();
  return (
    <Card className="ChapterCard">
      <Card.Header className="ChapterCardHeader">{`Ch${content.chapterId}. ${content.chapterName}`}</Card.Header>
      <Card.Img className="ChapterCardImg" src={`/image/Chapter${content.chapterId}.png`} />
      <Card.Body className="ChapterCardBody">
        <Button className="ChapterButton" onClick={()=>{navigate(`/chapter/${content.chapterId}`)}}>
          <img src="/icons/Play.svg" alt="ChapterButton"/>
          <Text24 text="발음하러 가기"/>
        </Button>
      </Card.Body>
    </Card>
  );
}
export default ChapterCard;
