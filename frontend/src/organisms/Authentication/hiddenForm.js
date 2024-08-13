import React,{useState}from "react";
import InspectionForm from "../../molecules/Authentication/InspectionForm";
import "./hiddenForm.css";
import "../../atoms/Authentication/Page.css";
function HiddenForm(props){
    const [state, setchange]=useState("hiddenForm");
    const start=()=>{
        if(state=="hiddenForm"){
            setchange((state)=>"hiddenForm.show");
        }
        else{
            setchange((state)=>"hiddenForm");
        }
    };
    console.log(state)
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
                    <InspectionForm content={'인증번호'} name={'확인'} value={props.value1} text={props.text1} work={props.work1} input={props.input1}/>
                </div>
            </div>
        </div>
       
        
    );
}
export default HiddenForm;