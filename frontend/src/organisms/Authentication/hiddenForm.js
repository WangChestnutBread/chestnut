import React,{useState}from "react";
import InspectionFormNoRed from "../../molecules/Authentication/InspectionForm.noVerRed";
import "./hiddenForm.css";
import "../../atoms/Authentication/Page.css";
import InspectionButton from "../../atoms/Authentication/InspectionButton";
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
            <div>
                <div className="emailbox LoginFormFont">
                    {props.name} 
                </div> 
                <button className="InspectionButton" onClick={start}>
                    <div className="InspectionButtonFont">{'변경'}</div>
                </button> 
            </div>
            <div className={state}>
                <div style={{marginTop: 20 ,marginBottom: 20}}>
                    <InspectionFormNoRed content={'이메일'} name={'인증'}/>
                </div>
                <div >
                    <InspectionFormNoRed content={'인증번호'} name={'확인'} />
                </div>
            </div>
        </div>
       
        
    );
}
export default HiddenForm;