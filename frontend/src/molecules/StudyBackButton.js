import { useNavigate } from "react-router-dom";
import "./StudyBackButton.css"

const StudyBackButton = ()=> {
    let navigate = useNavigate()
    return (
        <div className="StudyBackButton">
            <img src="/icons/BackButton.svg" width="100%"  onClick={()=>navigate(-1)} />
        </div>
    )
}

export default StudyBackButton;