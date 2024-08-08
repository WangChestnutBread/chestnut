import VocabularyListTemplate from "../templates/VocabularyListTemplate";
import baseApi from "../api/fetchAPI"

function VocabularyListPage() {
    // baseApi({
    //     method: 'get',
    //     url: '/vocabulary',
    //     params :{
    //         chapter:'0',
    //         page:'0',
    //         size:'10'
    //     }
    // }).then((res)=>{
    //     console.log(res.data.data)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })

    return(
        <div>
            <VocabularyListTemplate/>
        </div>
    )
}

export default VocabularyListPage;