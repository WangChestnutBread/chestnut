import React, {useState} from "react";
import "../../atoms/Authentication/Page.css";
import InspectionButton from "../../atoms/Authentication/InspectionButton";
function InspectionFormNoRed(props){
    const [name, setName] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) =>{
        alert(`이름: ${name}`);
        event.preventDefault();
    };
    return(
        <form className="FormBorder LoginFormFont" onSubmit={handleSubmit}>
            <input className="LoginFormBorder LoginFormFont" type="text" value={name} onChange={handleChangeName} placeholder={props.content}/>
            <InspectionButton name={props.name}/>
        </form>
        
    );
}
export default InspectionFormNoRed;