import { useNavigate } from "react-router-dom";


function StudyBackButton() {
    let navigate = useNavigate()
    return (
        <div>
            <img src="/icons/BackButton.svg" width="50px" onClick={()=>{navigate(-1)}}/>
        </div>
    )
}

export default StudyBackButton;