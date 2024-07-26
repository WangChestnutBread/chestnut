import React, {useState} from "react";
import LoginButton from "../atoms/LoginButton";
import "./Page.css";
function LoginInputForm(props){
    const [name, setName] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) =>{
        alert(`이름: ${name}`);
        event.preventDefault();
    };
    return(
        <form onSubmit={handleSubmit}>
            <input className="LoginFormBorder LoginFormFont" type="text" value={name} onChange={handleChangeName} placeholder={props.content}/>
        </form>
    );
}
export default LoginInputForm;