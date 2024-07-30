import React from "react";
import { Routes, Route } from "react-router-dom";
import StudyList from "../templates/StudyList";
function StudyPage(){
    return(
        <Routes>
            <Route path="/study" element={<StudyList />}/>
        </Routes>
    );
}
export default StudyPage;