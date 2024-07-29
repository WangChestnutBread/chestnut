import IconGroup from "../molecules/IconGroup"
import "./Header.css"

const Header = ({leftIcons}) => {
    return (     
        <div className="header">   
            <IconGroup leftIcons={leftIcons}/>
       </div>
    )
}

export default Header;