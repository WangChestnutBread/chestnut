import './App.css';
import MainPage from './pages/MainPage';
import StartPage from "./templates/StartPage";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <MainPage /> */}
      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
    </div>
  );
}

export default App;