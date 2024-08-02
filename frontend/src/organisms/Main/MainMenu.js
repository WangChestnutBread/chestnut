import IconWithText from "../../molecules/Main/IconWithText"
import "./MainMenu.css"

function MainMenu({menu}) {
    return (
        <div className="MainMenu">
            {
                menu.map((menu, index) => {
                    return (
                        <IconWithText key={index} text={menu.name} path={menu.path}/>         
                    )                              
                })
            }
        </div>
    )
}

export default MainMenu;