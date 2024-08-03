import React,{useState} from "react";
import NavBar from "../organisms/NavBar";
import "./StudyList.css"
import ChapterMenu from "../atoms/ChapterMenu";
import {useNavigate} from "react-router-dom";
import "./NavbarExample.css"
import StudyBackButton from "../molecules/StudyBackButton"
import ChestNutButton from "../organisms/ChestNutButton"
import useAuthStore from "../stores/authStore";
import axios from "axios";

function StudyList(){
    const navigate=useNavigate();
    const [data, setdata]=useState();
    const setAccessToken = useAuthStore((state) => (state.setAccessToken));
    axios.get("https://i11d107.p.ssafy.io/chestnutApi/study/chapter",{
        headers:{
            access: setAccessToken
        }
    }).then(response=>{
        if(response.data.code==200){
            setdata(response.data.data);
        }
        else if(response.data.code==801){
            alert("유효하지 않은 토큰입니다.");
        }
        else if(response.data.code==710){
            alert("DB에 없는 정보입니다.");
        }
        else if(response.data.code==299){
            alert("알 수 없는 오류입니다.");
        }
        console.log(response);
    }).catch(error=>{
        console.log(error);
    })
    const chapter1=()=>{
        navigate("/chapter1");
    };
    const chapter2=()=>{
        navigate("/chapter2");
    };
    const chapter3=()=>{
        navigate("/chapter3");
    };
    const chapter4=()=>{
        navigate("/chapter4");
    };
    const chapter5=()=>{
        navigate("/chapter5");
    };
    const chapter6=()=>{
        navigate("/chapter6");
    };
    return(
        <div> 
            <div>
                <div className="NavbarExample">
                    <div className="NavbarButton">
                        <div className="LeftButton">
                            <StudyBackButton/>
                            <ChestNutButton/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="titleBox">
                    <div className="textBox">
                        <div className="titleFont">무엇을 학습할까??</div>
                    </div>
                    <div className="img-con">
                        <img className="imgsqueez" src="/image/squeez.png" />
                    </div>
                </div>
                <div className="chapterlist">
                    <div className="chapterTotalBox">
                        <div className="chapterinnerbox">
                            <div className="group-box">
                                <div className="cardgroup">
                                    <div className="cardlist">
                                        <ChapterMenu title={`CH${data[0].chapterId}. ${data[0].chapterName}`} work={chapter1}/>
                                    </div>
                                    <div className="cardlist">
                                        <ChapterMenu title={`CH${data[1].chapterId}. ${data[1].chapterName}`} work={chapter2}/>
                                    </div>
                                    <div className="cardlist">
                                        <ChapterMenu title={`CH${data[2].chapterId}. ${data[2].chapterName}`} work={chapter3}/>
                                    </div>
                                    <div className="cardlist">
                                        <ChapterMenu title={`CH${data[3].chapterId}. ${data[3].chapterName}`} work={chapter4}/>
                                    </div>
                                </div>
                            </div>
                            <div className="cardgroup-sec">
                                <div className="group-box">
                                    <div className="cardlist">
                                        <ChapterMenu title={`CH${data[4].chapterId}. ${data[4].chapterName}`} work={chapter5}/>
                                    </div>
                                    <div className="cardlist">
                                        <ChapterMenu title={`CH${data[5].chapterId}. ${data[5].chapterName}`} work={chapter6}/>
                                    </div>
                                    <div className="cardlist">
                                        <ChapterMenu title={`CH${data[6].chapterId}. ${data[6].chapterName}`}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}
export default StudyList;