import React, {useState} from "react";
import "./Page.css";

function LoginInputForm(props){

    const [name, setName] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 폼 제출 동작을 막음
            if ( props.onSubmit ) props.onSubmit(); // success 함수 실행
        }
    };

    return(
        <form className="FormBorder LoginFormFont"
            onSubmit={(e) => {
                e.preventDefault(); // 폼이 제출될 때 폼 제출 & 새로고침 방지
                if ( props.onSubmit ) props.onSubmit(); // success 함수 실행
            }}
        >
            <input className="LoginFormBorder LoginFormFont" 
            type="text" 
            value={props.value} 
            onChange={props.work} 
            placeholder={props.content} 
            ref={props.inputRef}/>
        </form>
    );
}
export default LoginInputForm;