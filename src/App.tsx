import './App.css'
import LandDetails from './LandDetails'
import ResultScreen from './ResultScreen'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/gcc' element={<LandDetails />} />
          <Route path='/gcc/result' element={<ResultScreen />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
