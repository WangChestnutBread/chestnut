import React, {useState} from "react";
import IdLengthText from "../../atoms/Authentication/IdLengthText";
import "../../atoms/Authentication/Page.css";

function SignUpPwInput(props){
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const handleChangeName = (event) => {
    setName(event.target.value);
    };

    const handleSubmit = (event) =>{
        alert(`이름: ${name}`);
        event.preventDefault();
    };

    const inspection = ()=>{
        if(name==""){
            setText((text)=>"빈칸을 입력하세요");
        }
        else{
            setText((text)=>"");
        }
    };
    return(
        <div>
        <form className="FormBorder LoginFormFont" onSubmit={handleSubmit}>
            <input className="LoginFormBorder LoginFormFont" type="password" value={props.value} onChange={props.work} placeholder={props.content}/>
        </form>
        <IdLengthText text={props.text} />
    </div>
    );
}
export default SignUpPwInput;