import "./ChapterCard.css";
import { Button, Card, ProgressBar } from "react-bootstrap";
import Text24 from "../../atoms/Text24";
import { useNavigate } from "react-router-dom";
import Text20 from "../../atoms/Text20";

function ChapterCard({ content }) {
  let navigate = useNavigate();

  const calcProgress = Math.ceil(content.chapterStudyCount / content.totalStudies * 100);

  
  return (
    <Card className="ChapterCard">
      <Card.Header className="ChapterCardHeader">{`Ch${content.chapterId}. ${content.chapterName}`}</Card.Header>
      
      <Card.Img
        className="ChapterCardImg"
        src={`/image/Chapter${content.chapterId}.png`}
      />
      <div className="ChapterProgressBar">
        <div className="ChapterProgressText">
          <Text20 text={`${calcProgress}%`}/>
          <Text20 text={`${content.chapterStudyCount}/${content.totalStudies}`} />
        </div>
        <ProgressBar now={calcProgress} animated/>
      </div>
      
      <Card.Body className="ChapterCardBody">

        <Button
          className="ChapterButton"
          onClick={() => {
            navigate(`/chapter/${content.chapterId}`);
          }}
        >
          <img src="/icons/Play.svg" alt="ChapterButton" />
          <Text24 text="발음하러 가기" />
        </Button>
      </Card.Body>
    </Card>
  );
}
export default ChapterCard;
