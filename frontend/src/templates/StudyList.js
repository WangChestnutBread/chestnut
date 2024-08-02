import React from "react";
import NavBar from "../organisms/NavBar";
import "./StudyList.css"
import ChapterMenu from "../atoms/ChapterMenu";
import {useNavigate} from "react-router-dom";
function StudyList(){
    const navigate=useNavigate();
    const chapter1=()=>{
        navigate("/chapter1");
    };
    const chapter2=()=>{
        navigate("/chapter2");
    };
    const chapter3=()=>{
        navigate("/chapter3");
    };
    const chapter5=()=>{
        navigate("/chapter5");
    };
    const chapter6=()=>{
        navigate("/chapter6");
    };
    return(
        <div> 
            <NavBar />
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
                                        <ChapterMenu title={'CH1. 자음 /모음'} work={chapter1}/>
                                    </div>
                                    <div className="cardlist">
                                        <ChapterMenu title={'CH2. 한 글자'} work={chapter2}/>
                                    </div>
                                    <div className="cardlist">
                                        <ChapterMenu title={'CH3. 받침글자'} work={chapter3}/>
                                    </div>
                                    <div className="cardlist">
                                        <ChapterMenu title={'CH4. 음운변동'}/>
                                    </div>
                                </div>
                            </div>
                            <div className="cardgroup-sec">
                                <div className="group-box">
                                    <div className="cardlist">
                                        <ChapterMenu title={'CH5. 단어'} work={chapter5}/>
                                    </div>
                                    <div className="cardlist">
                                        <ChapterMenu title={'CH6. 문장'} work={chapter6}/>
                                    </div>
                                    <div className="cardlist">
                                        <ChapterMenu title={'CH7.'}/>
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