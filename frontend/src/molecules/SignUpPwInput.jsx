import React, {useState} from "react";
import IdLengthText from "../atoms/IdLengthText";
import "../atoms/Page.css";

function SignUpPwInput(props){
    const [name, setName] = useState("");

    const handleChangeName = (event) => {
    setName(event.target.value);
    };

    const handleSubmit = (event) =>{
        alert(`이름: ${name}`);
        event.preventDefault();
    };
    return(
        <div>
        <form className="FormBorder LoginFormFont" onSubmit={handleSubmit}>
            <input className="LoginFormBorder LoginFormFont" type="text" value={name} onChange={handleChangeName} placeholder={props.content}/>
        </form>
        <IdLengthText text={props.text} />
    </div>
    );
}
export default SignUpPwInput;