import SignUPPage from "../templates/Authentication/SignUpTemplates";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../templates/Authentication/LoginPage";
import FindId from "../templates/Authentication/FindId";
import FindPw from "../templates/Authentication/FindPw";
function Member() {
  return (
       <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUPPage />} />
        <Route path="/member/find-id" element={<FindId />} />
        <Route path="/member/password" element={<FindPw />} />
      </Routes>
   
  );
}

export default Member;
