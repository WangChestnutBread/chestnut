import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./Reset.css";
import "./index.css";
import App from "./App";
import QNApage from "./templates/Board/QnaTemplate";
import QNAWritePage from "./templates/Board/QnaWriteTemplate";
import QnaDetailTemplate from "./templates/Board/QnaDetailTemplate";
import QnaManagerDetail from "./templates/Board/QnaManagerDetail";
import AnnouncementDetail from "./templates/Board/AnnouncementDetail";
import AnnouncementWrite from "./templates/Board/AnnouncementWrite";
import StartTemplates from "./templates/StartTemplates";
import reportWebVitals from "./reportWebVitals";
import Member from "./pages/Member";
import MyProfile from "./pages/MyProfile";
import LoginPage from "./templates/Authentication/LoginPage";
import SignUPPage from "./templates/Authentication/SignUpTemplates";
import FindId from "./templates/Authentication/FindId";
import FindPw from "./templates/Authentication/FindPw";
import EditMyInfo from "./templates/Authentication/EditMyInfo";
import MyInfo from "./templates/Authentication/MyInfo";
import ChapterList from "./molecules/StudyList/ChapterList";
import StudyList from "./templates/StudyList";
import ChapterMenu from "./atoms/ChapterMenu";
import MainPage from "./pages/MainPage";
import Chapter1Listpage from "./templates/Chapter1Listpage";
import Chapter2Listpage from "./templates/Chapter2Listpage";
import Chapter3Listpage from "./templates/Chapter3Listpage";
import Chapter5Listpage from "./templates/Chapter5Listpage";
import Chapter6Listpage from "./templates/Chapter6Listpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartTemplates />
  },
  {
    path: "/board/qna",
    element: <QNApage />
  },
  {
    path: "/board/announcement",
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
  {
    path: "/member",
    element: <Member />,
    children: [
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "signup",
        element: <SignUPPage />
      },
      {
        path: "find-id",
        element: <FindId />
      },
      {
        path: "password",
        element: <FindPw />
      }
    ]
  },
  {
    path: "/myprofile",
    element: <MyProfile />,
    children: [
      {
        path: "myinfo",
        element: <MyInfo />
      },
      {
        path: "edit",
        element: <EditMyInfo />,
      }
    ]
  },
  {
    path: "/study",
    element: <StudyList />
  },
  {
    path: "/chapter1",
    element: <Chapter1Listpage />
  },
  {
    path: "/chapter2",
    element: <Chapter2Listpage />
  },
  {
    path: "/chapter3",
    element: <Chapter3Listpage />
  },
  {
    path: "/chapter5",
    element: <Chapter5Listpage />
  },
  {
    path: "/chapter6",
    element: <Chapter6Listpage />
  },
  {
    path: "/main",
    element: <MainPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
