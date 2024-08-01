import React from "react";
import { Routes, Route } from "react-router-dom";
import MyInfo from "../templates/Authentication/MyInfo";
import EditMyInfo from "../templates/Authentication/EditMyInfo";
import { Outlet } from "react-router-dom";
function Member() {
  return (
    <div>
      <h2>Member Area</h2>
      <Outlet />
    </div>
  );
}

export default Member;
