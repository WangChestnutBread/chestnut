import "./Chapter4Detail.css"
import BlackBoardWithTab from "../../organisms/BlackBoardWithTab";
import { useState } from "react";

function Chapter4Detail() {
    let tabTitleList = ['교체', '축약']

    return (
        <div>
            <div>
                <BlackBoardWithTab tabTitleList={tabTitleList}/>
            </div>

        </div>
    )
}

export default Chapter4Detail;