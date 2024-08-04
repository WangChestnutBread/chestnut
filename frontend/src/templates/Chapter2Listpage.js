import React,{useState} from "react";
import ChapterList from "../molecules/StudyList/ChapterList";
import axios from "axios";
import useAuthStore from "../stores/authStore";
function Chapter2Listpage(){
    const accessToken = useAuthStore((state) => (state.accessToken))
    const [data, setData]=useState([]);
    axios.get("https://i11d107.p.ssafy.io/chestnutApi/study/chapter/2",{
        headers: {
            access: accessToken
        },
    }).then(response=>{
        if(response.data.code==200){
           setData(response.data.data); 
        }
        else if(response.data.code==801){
            alert("유효하지 않은 토큰입니다.")
        }
        else if(response.data.code==710){
            alert("존재하지 않는 데이터입니다.")
        }
    })
    return(
        <ChapterList title={'CH2. 한 글자'} />
    );
}
export default Chapter2Listpage;