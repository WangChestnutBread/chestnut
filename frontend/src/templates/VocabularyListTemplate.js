import "./VocabularyListTemplate.css";
import VocabularyList from "../organisms/VocabularyList";
import "./NavbarExample.css";
import NavbarExample from "./NavbarExample";
import Pagenation from "../atoms/Pagenation";
import { useEffect, useState } from "react";
import baseApi from "../api/fetchAPI";

function VocabularyListTemplate() {
  let [chapterTitle, setChapterTitle] = useState(null);
  let [currentVocaItem, setCurrentVocaItem] = useState(null);

  const getChapterTitle = () => {
    baseApi({
      method: "get",
      url: "/study/chapter",
    })
      .then((res) => {
        setChapterTitle(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVocabulary = (chapter, page) => {
    // console.log(chapter, page);
    baseApi({
      method: "get",
      url: "/vocabulary",
      params: {
        chapter: `${chapter}`,
        page: `${page-1}`,
        size: "5",
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setCurrentVocaItem(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Promise.all([getChapterTitle(), getVocabulary(0, 1)]).then(() => {
      console.log("호출");
    });
  }, []);

  return (
    <div className="VocabularyListTemplate">
      <NavbarExample/>

      {/* 단어장 칠판 */}
      {chapterTitle && currentVocaItem ? (
        <VocabularyList
          chapterTitle={chapterTitle}
          getVocabulary={getVocabulary}
          currentVocaItem={currentVocaItem}
        />
      ) : (
        <p>로딩중...</p>
      )}
    </div>
  );
}

export default VocabularyListTemplate;
