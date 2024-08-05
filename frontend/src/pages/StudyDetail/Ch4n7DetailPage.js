import { useEffect, useState } from "react";
import Chapter4n7Detail from "../../templates/StudyList/Chapter4n7Detail";
import baseApi from "../../api/fetchAPI";
import { useParams } from "react-router-dom";

function Ch4n7DetailPage() {
  let [data, setData] = useState(null);

  let { chapterId } = useParams();

  console.log(chapterId);
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
        <Chapter4n7Detail data={data} chapterId={chapterId} />
      ) : (
        <p>로딩중입니다</p>
      )}
    </div>
  );
}

export default Ch4n7DetailPage;
