import { useEffect, useState } from "react";
import ChapterListTemplate from "../templates/StudyList/ChapterListTemplate";
import baseApi from "../api/fetchAPI";
import { useParams } from "react-router-dom";
import Loading from "../organisms/Loading";

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
        <Loading/>
      )}
    </div>
  );
}

export default ChapterListPage;
