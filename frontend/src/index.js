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
import StudyList from  "./templates/StudyList/ChapterListTemplate"
import MainPage from "./pages/MainPage";
import Chapter1Detail from "./templates/StudyList/Chapter1Detail";
import Chapter2Detail from "./templates/StudyList/Chapter2Detail";
import Chapter3Detail from './templates/StudyList/Chapter3Detail';
import Chapter5Detail from './templates/StudyList/Chapter5Detail';
import Chapter6Detail from './templates/StudyList/Chapter6Detail';
import Ai from "./pages/Ai";
import AnnouncementManagerWrite from "./templates/Board/AnnouncementManagerWrite";
import OpenChat from "./pages/OpenChat";
import VocabularyListPage from "./pages/VocabularyListPage";
import Ranking from "./pages/Ranking";
import ChapterListPage from "./pages/ChapterListPage";
import ProtectedRoute from "./templates/Authentication/ProtectedRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <StartTemplates />
  },
  {
    path: "/board/qna/:id",
    element: <ProtectedRoute><QNApage /></ProtectedRoute>
  },
  {
    path: "/board/announcement/:id",
    element: <ProtectedRoute><QNApage /></ProtectedRoute>
  },
  {
    path: "/board/qna/detail/:id",
    element: <ProtectedRoute><QnaDetailTemplate /></ProtectedRoute>
  },
  {
    path: "/board/qna/manager/:id",
    element: <ProtectedRoute><QnaManagerDetail /></ProtectedRoute>
  },
  {
    path: "/board/qna/write",
    element: <ProtectedRoute><QNAWritePage /></ProtectedRoute>
  },
  {
    path: "/board/announcement/detail/:id",
    element: <ProtectedRoute><AnnouncementDetail /></ProtectedRoute>
  },
  {
    path: "/board/announcement/manager/write",
    element: <ProtectedRoute><AnnouncementManagerWrite /></ProtectedRoute>
  },
  {
    path: "/board/announcement/write",
    element: <ProtectedRoute><AnnouncementWrite /></ProtectedRoute>
  },
  {
    path: "/study/detail1/:chapterId/:studyId",
    element: <ProtectedRoute><Chapter1Detail /></ProtectedRoute>
  },
  {
    path: "/study/detail2/:chapterId/:studyId",
    element: <ProtectedRoute><Chapter2Detail /></ProtectedRoute>
  },
  {
    path: "/study/detail3/:chapterId/:studyId",
    element: <ProtectedRoute><Chapter3Detail /></ProtectedRoute>
  },
  {
    path: "/study/detail5/:chapterId/:studyId",
    element: <ProtectedRoute><Chapter5Detail /></ProtectedRoute>
  },
  {
    path: "/study/detail6/:chapterId/:studyId",
    element: <ProtectedRoute><Chapter6Detail /></ProtectedRoute>
  },
  {
    path: "/ai",
    element: <ProtectedRoute><Ai /></ProtectedRoute>
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
    element: <ProtectedRoute><MyProfile /></ProtectedRoute>,
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
    element: <ProtectedRoute><StudyList /></ProtectedRoute>
  },
  {
    path: "/ranking",
    element: <ProtectedRoute><Ranking /></ProtectedRoute>
  },
  {
    path: "/myVocabulary",
    element: <ProtectedRoute><VocabularyListPage /></ProtectedRoute>
  },
  {
    path: "/chapter/:chapterId",
    element: <ProtectedRoute><ChapterListPage /></ProtectedRoute>
  },
  {
    path: "/main",
    element: <ProtectedRoute><MainPage /></ProtectedRoute>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
