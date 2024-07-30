import React from "react";
import ReactDOM from "react-dom/client";
import "./Reset.css";
import "./index.css";
import App from "./App";
import QNApage from "./templates/Board/QnaTemplate";
import QNAWritePage from "./templates/Board/QnaWriteTemplate";
import QnaDetailTemplate from "./templates/Board/QnaDetailTemplate";
import QnaManagerDetail from "./templates/Board/QnaManagerDetail";
import AnnouncementDetail from "./templates/Board/AnnouncementDetail";
import AnnouncementWrite from "./templates/Board/AnnouncementWrite";

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Member from "./pages/Member";
import MyProfile from "./pages/MyProfile";

const router = createBrowserRouter([
  {
    path: "/board",
    element: <QNApage />
  },
  {
    path: "/qna",
    element: <QNApage />
  },
  {
    path: "/board/qna/detail/:id",
    element: <QnaDetailTemplate />
  },
  {
    path: "/board/qna/manager",
    element: <QnaManagerDetail />
  },
  {
    path: "/board/qna/write",
    element: <QNAWritePage />
  },
  {
    path: "/board/announcement/detail/:id",
    element: <AnnouncementDetail />
  },
  {
    path: "/board/announcement/write/",
    element: <AnnouncementWrite />
  },

])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
      {/* <App />
      <Member />
      <MyProfile />
      <StudyPage /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
