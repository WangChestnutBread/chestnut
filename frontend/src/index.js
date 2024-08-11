import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./Reset.css";
import "./index.css";
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
import MainPage from "./pages/MainPage";
import RankingTemplate from "./templates/RankingTemplate";
import Chapter1Detail from "./templates/StudyList/Chapter1Detail"
import Chapter2Detail from "./templates/StudyList/Chapter2Detail";
import Chapter3Detail from './templates/StudyList/Chapter3Detail';
import Chapter5Detail from './templates/StudyList/Chapter5Detail';
import Chapter6Detail from './templates/StudyList/Chapter6Detail';
import Ai from "./pages/Ai"


import AnnouncementManagerWrite from "./templates/Board/AnnouncementManagerWrite";

import OpenChat from "./pages/OpenChat";

import VocabularyListPage from "./pages/VocabularyListPage"
import Ranking from "./pages/Ranking";
import ChapterListPage from "./pages/ChapterListPage";
import ChapterMainPage from "./pages/ChapterMainPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <StartTemplates />
  },
  {
    path: "/board/qna/:id",
    element: <QNApage />
  },
  {
    path: "/board/announcement/:id",
    element: <QNApage />
  },
  {
    path: "/board/qna/detail/:id",
    element: <QnaDetailTemplate />
  },
  {
    path: "/board/qna/manager/:id",
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
    path: "/board/announcement/manager/write",
    element: <AnnouncementManagerWrite />
  },
  {
    path: "/board/announcement/write",
    element: <AnnouncementWrite />
  },
  {
    path: "/study/detail1/:chapterId/:studyId",
    element: <Chapter1Detail />
  },
  {
    path: "/study/detail2/:chapterId/:studyId",
    element: <Chapter2Detail />
  },
  {
    path: "/study/detail3/:chapterId/:studyId",
    element: <Chapter3Detail />
  },
  {
    path: "/study/detail5/:chapterId/:studyId",
    element: <Chapter5Detail />
  },
  {
    path: "/study/detail6/:chapterId/:studyId",
    element: <Chapter6Detail />
  },
  {
    path: "/ai",
    element: <Ai />
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
    element: <ChapterMainPage />
  },
  {
    path: "/ranking",
    element: <Ranking/>
  },
  {
    path: "/myVocabulary",
    element: <VocabularyListPage/>
  },
  {
    path: "/chapter/:chapterId",
    element: <ChapterListPage/>
  },
  {
    path: "/main",
    element: <MainPage/>,
  },
  {
    path: "/abc",
    element: <RankingTemplate />
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
