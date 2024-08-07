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
import ChapterListpage from "./pages/StudyDetail/ChapterListpage";
import StudyList from "./templates/StudyList";
import ChapterMenu from "./atoms/ChapterMenu";
import MainPage from "./pages/MainPage";
import RankingTemplate from "./templates/RankingTemplate";
import Chapter1Detail from "./templates/StudyList/Chapter1Detail"
import Chapter2Detail from "./templates/StudyList/Chapter2Detail";
import Chapter3Detail from './templates/StudyList/Chapter3Detail';
import Chapter5Detail from './templates/StudyList/Chapter5Detail';
import Chapter6Detail from './templates/StudyList/Chapter6Detail';
import Ch4n7DetailPage from "./pages/StudyDetail/Ch4n7DetailPage";

import AnnouncementManagerWrite from "./templates/Board/AnnouncementManagerWrite";
import VocabularyListPage from "./pages/VocabularyListPage"


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
    path: "/board/announcement/manager/write",
    element: <AnnouncementManagerWrite />
  },
  {
    path: "/board/announcement/write",
    element: <AnnouncementWrite />
  },
  {
    path: "/study/detail1/:studyId/:word",
    element: <Chapter1Detail />
  },
  {
    path: "/study/detail2/:studyId/:word",
    element: <Chapter2Detail />
  },
  {
    path: "/study/detail3/:studyId/:word",
    element: <Chapter3Detail />
  },
  {
    path: "/study/detail5/:studyId/:word",
    element: <Chapter5Detail />
  },
  {
    path: "/study/detail6/:studyId/:word",
    element: <Chapter6Detail />
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

  // {
  //   path: "/chapter/:chapterId",
  //   element: <Chapter1Listpage />
  // },
  // {
  //   path: "/chapter/:chapterId",
  //   element: <Chapter2Listpage />
  // },
  // {
  //   path: "/chapter/:chapterId",
  //   element: <Chapter3Listpage />
  // },
  // {
  //   path: "/chapter/:chapterId",
  //   element: <Ch4n7DetailPage/>
  // },
  // {
  //   path: "/chapter/:chapterId",
  //   element: <Chapter5Listpage />
  // },
  // {
  //   path: "/chapter/:chapterId",
  //   element: <Chapter6Listpage />
  // },

  {
    path: "/chapter/:chapterId",
    element: <Ch4n7DetailPage/>
  },

  {
    path: "/chapter/:chapterId",
    element: <Ch4n7DetailPage />
  },
  {
    path: "/chapter/:listId",
    element: <ChapterListpage />
  },
  {
    path: "/main",
    element: <MainPage/>
  },
  {
    path: "/abc",
    element: <RankingTemplate />
  },
  {
    path: "/myVocabulary",
    element: <VocabularyListPage/>
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
