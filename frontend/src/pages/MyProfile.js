import React from "react";
import { Routes, Route } from "react-router-dom";
import MyInfo from "../templates/Authentication/MyInfo";
import EditMyInfo from "../templates/Authentication/EditMyInfo";
import { Outlet } from "react-router-dom";
function Member() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Member;
