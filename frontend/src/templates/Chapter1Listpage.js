import React,{useState} from "react";
import ChapterList from "../molecules/StudyList/ChapterList";
import Text24 from "../atoms/Text24";
import useAuthStore from "../stores/authStore";
import axios from "axios";
function Chapter1Listpage(){
    const accessToken = useAuthStore((state) => (state.accessToken))
    const [data, setdata] =useState([]);
    axios.get("https://i11d107.p.ssafy.io/chestnutApi/study/chapter/1",{
        headers:{
            access: accessToken
        },
    }).then(response=>{
        if(response.data.code==200){
            setdata(response.data.data);
            
        }
    })
    .catch(error=>{
        console.log(error);
    });
    return(
        <div>
            <ChapterList title={'CH1. 자음 / 모음'} word={data} content={"r"}/>
            {
                data.map(function(i){
                    <div>
                        
                        console.log(i.word)
                    </div>
                })
            }
        </div>

    );
}
export default Chapter1Listpage;