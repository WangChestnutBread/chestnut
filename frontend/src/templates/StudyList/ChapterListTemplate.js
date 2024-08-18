import "./ChapterListTemplate.css";
import "../NavbarExample.css";
import { useEffect, useState } from "react";
import NavbarExample from "../NavbarExample";
import Chapter1List from "../../organisms/ChapterList/Chapter1List";
import Chapter2List from "../../organisms/ChapterList/Chapter2List";
import Chapter3List from "../../organisms/ChapterList/Chapter3List";
import Chapter4List from "../../organisms/ChapterList/Chapter4List";
import Chapter5_6List from "../../organisms/ChapterList/Chapter5_6List";
import Chapter7List from "../../organisms/ChapterList/Chapter7List";

function ChapterListTemplate({ data, chapterId }) {
  let [content, setContent] = useState(null);
  useEffect(() => {
    setContent(data);
  }, []);

  return (
    <div className="ChapterListTemplate">
      {/* navbar */}
      <NavbarExample/>

      {/* 칠판 콘텐츠 전체 */}
      <div className="container">
        {content && chapterId == 1 ? (
          <Chapter1List content={content} chapterId={chapterId} />
        ) : content && chapterId == 2 ? (
          <Chapter2List content={content} chapterId={chapterId} />
        ) : content && chapterId == 3 ? (
          <Chapter3List content={content} chapterId={chapterId} />
        ) : content && chapterId == 4 ? (
          <Chapter4List content={content} chapterId={chapterId} />
        ) : content && (chapterId == 5 || chapterId == 6) ? (
          <Chapter5_6List content={content} chapterId={chapterId} />
        ) : content && chapterId == 7 ? (
          <Chapter7List content={content} chapterId={chapterId} />
        ) : (
          <p>로딩중입니다</p>
        )}
      </div>
    </div>
  );
}

export default ChapterListTemplate;
