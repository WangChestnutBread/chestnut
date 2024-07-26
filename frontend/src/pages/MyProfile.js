import React from "react";
import { Routes, Route } from "react-router-dom";
import MyInfo from "../templates/Authentication/MyInfo";
function Member() {
  return (
    <Routes>
      <Route path="/myprofile" element={<MyInfo />} />
    </Routes>
  );
}

export default Member;
