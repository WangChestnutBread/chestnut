import './App.css';
import MainPage from './pages/MainPage';
import StartPage from "./templates/StartPage";
import { Routes, Route } from "react-router-dom";
import QNApage from './templates/Board/QnaTemplate';
import QNAWritePage from './templates/Board/QnaWriteTemplate';
import QnaDetailTemplate from './templates/Board/QnaDetailTemplate';
import QnaManagerDetail from './templates/Board/QnaManagerDetail';

function App() {
  return (
    <div className="App">
      {/* <QnaDetailTemplate /> */}
      {/* <QnaManagerDetail /> */}
      {/* <MainPage /> */}
      <QNApage />
      {/* <QNAWritePage /> */}
      {/* <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes> */}
    </div>
  );
}

export default App;