import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ChapterList from "../molecules/StudyList/ChapterList";
import Text24 from "../atoms/Text24";
import useAuthStore from "../stores/authStore";
import axios from "axios";
import "./Chapter1Listpage.css"
function Word({number}){
    return(
        <span className="chapter1Font">
            <Link to={`/study/detail1/${number.studyId}/${number.word}`}>{number.word}</Link>
        </span>
    );
};

function Chapter1Listpage(){
    const accessToken = useAuthStore((state) => (state.accessToken))
    const [data, setData] =useState([]);
    const [word1, setWord1]=useState([]);
    const [word2, setWord2]=useState([]);
    useEffect(() => {
        axios
          .get("https://i11d107.p.ssafy.io/chestnutApi/study/chapter/1", {
            headers: {
              access: accessToken,
            },
          })
          .then((response) => {
            if (response.data.code == 200) {
              setData(response.data.data);
            }
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [accessToken]);
    console.log(data);
    useEffect(() => {
        const newWord1 = [];
        const newWord2 = [];
    
        data.forEach((number) => {
          if (number.categoryContent == "자음") {
            newWord1.push(number);
          } else if (number.categoryContent == "모음") {
            newWord2.push(number);
          }
        });
    
        setWord1(newWord1);
        setWord2(newWord2);
      }, [data]);
    
    console.log(word1);
    console.log(word2);
    return(
        <div>
            <div className="chapter1Board">
                <div>
                    <ChapterList title={'CH1. 자음 / 모음'}  content={"r"}/> 
                    <div className="chapter1">
                        <div className="chapter1subTitle">자음</div>
                        <div>
                            {
                                word1.map((number, idx)=>(<Word number={number} key={idx} />))
                            }
                        </div>
                        <div className="chapter1subTitle">모음</div>
                            {
                                
                                word2.map((number, idx)=>(<Word number={number} key={idx} />))
                            }
                    </div>
                </div>
               
            </div>
        </div>
    );
}
export default Chapter1Listpage;