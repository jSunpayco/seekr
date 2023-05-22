import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/login'
import Jobs from './pages/Jobs/jobs';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes> 
    </Router>
    </>
  )
}

export default App
