import styled from "styled-components";
import { useState, useEffect } from "react";
import InspectionForm from "./InspectionForm";



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

function VerificationCodeForm(props) {
    //변수 
    const [timer, setTimer] = useState(300);
    const {verificationSent, setVerificationSent, sentCode, isAuth} = props;

    //함수
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


    return (
        <TimeWrapper>
            {timer > 0 && sentCode && !isAuth && (
                <Timer>{formatTime()}</Timer>
            )}
            <InspectionForm content={'인증번호'} name={'확인'} text={props.text} work={props.work} value={props.value} input={props.input} />
        </TimeWrapper>
    );
}
export default VerificationCodeForm;