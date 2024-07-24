import HeaderIcon from "../atoms/HeaderIcon"
import "./IconGroup.css"
import { useNavigate } from "react-router-dom"

const IconGroup = ({leftIcons}) => {
    let navigate = useNavigate()
    return (
        <div> 
            <div className="leftIcons">
                {
                    leftIcons.map((icon, index)=>{
                        
                        return (
                            <HeaderIcon key={index} url={icon.url} onClick={(icon)=>{navigate(icon.navigateTo)}}/>
                            
                        )
                    })
                }
            </div>
        </div>
    )
}

export default IconGroup;