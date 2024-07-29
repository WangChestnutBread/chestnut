import "./MainProfile.css"
import Text20 from "../../atoms/Text20";
import MainProfileTextBox from "../../molecules/Main/MainProfileTextBox";


function MainProfile() {
    return (
        <div className="MainProfile">
            <div className="ProfileImage">
                <img src="/image/ProfileExample.png" height="200px"/>
                <Text20 text="Lv2. 맑은 눈을 가진 밤송"/>
            </div>
            <MainProfileTextBox/>
            <div>
                <img src="/image/Leaf.png"/>
            </div>
        </div>
    )
}

export default MainProfile;