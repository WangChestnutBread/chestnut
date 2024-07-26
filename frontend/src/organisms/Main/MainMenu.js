import IconWithText from "../../molecules/Main/IconWithText"
import "./MainMenu.css"

const MainMenu = ({menu}) => {
    return (
        <div className="MainMenu">
            {
                menu.map((menu , index) => {
                    return (
                        <IconWithText key={index} text={menu}/>         
                    )                              
                })
            }
        </div>
    )
}

export default MainMenu;