import "./App.css";
import LandDetails from "./LandDetails";
import ResultScreen from "./ResultScreen";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Router>
        <Routes>
          <Route path="/" element={<LandDetails />} />
          <Route path="/result" element={<ResultScreen />} />
        </Routes>
      </Router>
      </BrowserRouter>
    </>
  );
}

export default App;
