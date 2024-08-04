import { useEffect, useState } from "react";
import Chapter4Detail from "../../templates/StudyList/Chapter4Detail";
import NavbarExample from "../../templates/NavbarExample"
import baseApi from "../../api/fetchAPI";


function Ch4DetailPage() {
    let [data, setData] = useState(null);

    useEffect(()=>{
        baseApi({
            method: 'get',
            url: '/study/chapter/4'
        })
        .then((res)=> {
            setData(res.data.data)
        })
        .catch((err)=> {
            console.log(err)
        })
    }, [])
    

    return (
        <div>
            {
                data ? <Chapter4Detail data={data}/> : <p>로딩중입니다</p>
            }
        </div>
    )
}

export default Ch4DetailPage;