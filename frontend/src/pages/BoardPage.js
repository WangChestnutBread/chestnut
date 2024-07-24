import BoardTemplate from "../templates/BoardTemplate"
import HeaderIconsData from "./HeaderIconsData"

const BoardPage = () => {
    
    return (
        <BoardTemplate 
        leftIcons={HeaderIconsData.leftIcons}
        
        />        
    )
}

export default BoardPage;