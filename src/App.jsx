import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './paginas/Home'

function App() {
 

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<Home />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
