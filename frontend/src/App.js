import './App.css';
import MainPage from './pages/MainPage';
import StartPage from "./templates/StartTemplates";
import { Routes, Route } from "react-router-dom";
import QNApage from './templates/QNAPage';
function App() {
  return (
    <div className="App">
      {/* <MainPage /> */}
      {/* <QNApage /> */}
      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
    </div>
  );
}

export default App;