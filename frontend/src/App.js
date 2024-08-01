import './App.css';
import Camera from './organisms/StudyList/CameraOrganism';
import Pronunciations from './organisms/StudyList/Pronunciations';
import Record from './organisms/StudyList/Record';
import MouseTongue from './organisms/StudyList/MouseTongue';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/main" element={<MainPage />}/>
        <Route path='board' element={<QNApage/>}></Route>
        <Route path='qna' element={<QNApage/>}></Route>
        <Route path='board/qna/detail/' element={<QnaDetailTemplate/>}></Route>
        <Route path='board/qna/manager' element={<QnaManagerDetail/>}></Route>
        <Route path='board/qna/write' element={<QNAWritePage/>}></Route>
        <Route path='board/announcement/detail/' element={<AnnouncementDetail/>}></Route>
        <Route path='board/announcement/write' element={<AnnouncementWrite/>}></Route>
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
