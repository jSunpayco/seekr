import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/login'

function App() {

  return (
    <div>
      <Router>
      <div id='main'>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes> 
      </div>
    </Router>
    </div>
  )
}

export default App
