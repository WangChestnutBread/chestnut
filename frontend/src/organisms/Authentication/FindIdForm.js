import React, {useState} from "react";
import InspectionButton from "../../atoms/Authentication/InspectionButton";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
function FindIdForm(props){
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
            <LoginIdPwFont title={props.title} />
            <form className="FormBorder LoginFormFont" onSubmit={handleSubmit}>
                <input className="LoginFormBorder LoginFormFont" type="text" value={name} onChange={handleChangeName} placeholder={props.content}/>
                <InspectionButton name={props.name}/>
            </form>
        </div>
        
    );
}
export default FindIdForm;