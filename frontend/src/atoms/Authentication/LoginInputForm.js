import React, {useState} from "react";
import LoginButton from "./LoginButton";
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
        <form className="FormBorder LoginFormFont">
            <input className="LoginFormBorder LoginFormFont" type="text" value={props.name} onChange={props.work} placeholder={props.content}/>
        </form>
    );
}
export default LoginInputForm;