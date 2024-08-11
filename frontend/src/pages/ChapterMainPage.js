import { useEffect, useState } from "react";
import baseApi from "../api/fetchAPI";
import ChapterMainTemplate from "../templates/ChapterMainTemplate";

function ChapterMainPage() {
    let [listdata, setListData] = useState(null);
  
    useEffect(() => {
      // if (!accessToken) {
      //   // accessToken이 없으면 로그인 페이지로 이동 또는 다른 처리
      //   navigate('/login'); // 예시: 로그인 페이지로 이동
      //   return;
      // }
      baseApi({
        method: "get",
        url: "/study/chapter",
      }) 
      .then((response) => {
        setListData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

    return(
        <div>
           {
            listdata ? <ChapterMainTemplate listdata={listdata}/> : <div>로딩중</div>
           }
        </div>
    );
}
export default ChapterMainPage;