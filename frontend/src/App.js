import "./App.css";

import MainPage from "./pages/MainPage";
import StartPage from "./templates/StartTemplates";
import { Routes, Route } from "react-router-dom";
import QNApage from "./templates/Board/QnaTemplate";
import QNAWritePage from "./templates/Board/QnaWriteTemplate";
import QnaDetailTemplate from "./templates/Board/QnaDetailTemplate";
import QnaManagerDetail from "./templates/Board/QnaManagerDetail";
import AnnouncementDetail from "./templates/Board/AnnouncementDetail";
import AnnouncementWrite from "./templates/Board/AnnouncementWrite";
import ChestNutButton from "./organisms/ChestNutButton";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="board" element={<QNApage />}></Route>
        <Route path="qna" element={<QNApage />}></Route>
        <Route path="board/qna/detail/" element={<QnaDetailTemplate />}></Route>
        <Route path="board/qna/manager" element={<QnaManagerDetail />}></Route>
        <Route path="board/qna/write" element={<QNAWritePage />}></Route>
        <Route
          path="board/announcement/detail/"
          element={<AnnouncementDetail />}
        ></Route>
        <Route
          path="board/announcement/write"
          element={<AnnouncementWrite />}
        ></Route>
      </Routes>

      {/* <QnaDetailTemplate /> */}
      {/* <QnaManagerDetail /> */}
      {/* <MainPage /> */}
      {/* <QNApage /> */}
      {/* <QNAWritePage /> */}
    </div>
  );
}

export default App;
