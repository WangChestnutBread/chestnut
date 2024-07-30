import React, {useState} from "react";
import InspectionButton from "../../atoms/Authentication/InspectionButton";
import LoginInputForm from "../../atoms/Authentication/LoginInputForm";
import IdLengthText from "../../atoms/Authentication/IdLengthText";
import "../../atoms/Authentication/Page.css";
function InspectionForm(props){
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) =>{
        alert(`이름: ${name}`);
        event.preventDefault();
    };
    // const change=()=>{
    //     if(name==""){
    //         setText((text)=>"빈칸을 채우세요.");
    //     }
    //     else{
    //         setText((text)=>"사용가능한 아이디 입니다.");
    //     }
    //     console.log(text)
    // }
    return(
        <div>
            <form className="FormBorder LoginFormFont" onSubmit={handleSubmit}>
                <input className="LoginFormBorder LoginFormFont" type="text" value={name} onChange={handleChangeName} placeholder={props.content}/>
                <InspectionButton name={props.name} work={props.work}/>
            </form>
            <IdLengthText text={props.text} />
        </div>
        
    );
}
export default InspectionForm;