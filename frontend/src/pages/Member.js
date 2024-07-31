import React from "react";
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
