import React,{useState, useEffect}from "react";
import InspectionForm from "../../molecules/Authentication/InspectionForm";
import "./hiddenForm.css";
import "../../atoms/Authentication/Page.css";
import styled from "styled-components";

const TimeWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const Timer = styled.div`
    position: absolute;
    right: 120px;
    top: 50%;
    transform: translate(0, -50%);
    color: #6B3906;
    font-weight: bold;
`;

function HiddenForm(props){
    const [state, setchange]=useState("hiddenForm");
    const [timer, setTimer] = useState(300);
    const {verificationSent, setVerificationSent, sentCode, isAuth} = props;

    const start=()=>{
        if(state=="hiddenForm"){
            setchange((state)=>"hiddenForm.show");
        }
        else{
            setchange((state)=>"hiddenForm");
        }
    };

    // 타이머 함수
    const formatTime = () => {
        const minutes = Math.floor(timer/60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    useEffect(() => {
        let interval;
        if (sentCode) {
            setTimer(300);
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        setVerificationSent(false);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };

    }, [verificationSent, setVerificationSent]);


    return(
        <div>
            <div style={{display:"flex", alignItems: "center"}}>
                <div className="emailbox LoginFormFont" style={{paddingLeft:10}}>
                    {props.name} 
                </div> 
                <button className="InspectionButton" onClick={start}>
                    <div className="InspectionButtonFont">{'변경'}</div>
                </button> 
            </div>
            <div className={state}>
                <div style={{marginTop: 20 ,marginBottom: 20}}>
                    <InspectionForm content={'이메일'} name={'인증'} value={props.value} work={props.work} input={props.input} text={props.text}/>
                </div>
                <div >
                    <TimeWrapper>
                        {timer > 0 && sentCode && !isAuth && (
                            <Timer>{formatTime()}</Timer>
                        )}
                        <InspectionForm content={'인증번호'} name={'확인'} value={props.value1} text={props.text1} work={props.work1} input={props.input1}/>
                    </TimeWrapper>
                    
                </div>
            </div>
        </div>
       
        
    );
    
}
export default HiddenForm;