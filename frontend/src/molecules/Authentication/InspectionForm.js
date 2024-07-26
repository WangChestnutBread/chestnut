import React, {useState} from "react";
import InspectionButton from "../../atoms/Authentication/InspectionButton";
import LoginInputForm from "../../atoms/Authentication/LoginInputForm";
import IdLengthText from "../../atoms/Authentication/IdLengthText";
import "../../atoms/Authentication/Page.css";
function InspectionForm(props){
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
                <InspectionButton name={props.name}/>
            </form>
            <IdLengthText text={props.text} />
        </div>
        
    );
}
export default InspectionForm;