import React from "react";
import { Outlet } from "react-router-dom";

function Member() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Member;
