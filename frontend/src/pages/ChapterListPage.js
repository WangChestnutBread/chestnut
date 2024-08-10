import { useEffect, useState } from "react";
import ChapterListTemplate from "../templates/StudyList/ChapterListTemplate";
import baseApi from "../api/fetchAPI";
import { useParams } from "react-router-dom";

function ChapterListPage() {
  let [data, setData] = useState(null);

  let { chapterId } = useParams();

  // console.log(chapterId);
  useEffect(() => {
    baseApi({
      method: "get",
      url: `/study/chapter/${chapterId}`,
    })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {data ? (
        <ChapterListTemplate data={data} chapterId={chapterId} />
      ) : (
        <p>로딩중입니다</p>
      )}
    </div>
  );
}

export default ChapterListPage;
