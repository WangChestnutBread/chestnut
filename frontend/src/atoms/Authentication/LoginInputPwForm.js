import React, {useState} from "react";
import LoginButton from "./LoginButton";
import "./Page.css";
function LoginInputPwForm(props){
    const [name, setName] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) =>{
        alert(`이름: ${name}`);
        event.preventDefault();
    };
    return(

        <form className="FormBorder LoginFormFont"  onSubmit={handleSubmit}>
            <input className="LoginFormBorder LoginFormFont" type="password" value={props.value} onChange={props.work} placeholder={props.content}/>
        </form>
    );
}
export default LoginInputPwForm;