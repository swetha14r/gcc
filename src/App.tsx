import "./App.css";
import LandDetails from "./LandDetails";
import ResultScreen from "./ResultScreen";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandDetails />} />
          <Route path="/result" element={<ResultScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
