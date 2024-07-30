import React from "react";
import { Routes, Route } from "react-router-dom";
import MyInfo from "../templates/Authentication/MyInfo";
import EditMyInfo from "../templates/Authentication/EditMyInfo";
function Member() {
  return (
    <Routes>
      <Route path="/myprofile" element={<MyInfo />} />
      <Route path="/myprofile/edit" element={<EditMyInfo />} />
    </Routes>
  );
}

export default Member;
