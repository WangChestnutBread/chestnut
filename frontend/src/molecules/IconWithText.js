import Text20 from "../atoms/Text20"
import "./IconWithText.css"

const IconWithText = ({ text }) => {
    return (
        <div className="IconWithText">
            <img src="/icons/ChestNut.svg" className="ChestNut"/>
            <div className="TextStyle">
                <Text20 text={text} />
            </div>
        </div>
    )
}


export default IconWithText;

