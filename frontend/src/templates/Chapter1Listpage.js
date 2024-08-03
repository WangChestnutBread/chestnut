import React from "react";
import ChapterList from "../molecules/StudyList/ChapterList";
import useAuthStore from "../stores/authStore";
import axios from "axios";
function Chapter1Listpage(){
    const setAccessToken = useAuthStore((state) => (state.setAccessToken))
    
    return(
        <ChapterList title={'CH1. 자음 / 모음'} />
    );
}
export default Chapter1Listpage;