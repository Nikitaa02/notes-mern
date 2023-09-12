import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './routes/Home/home.jsx'
import About from './routes/About/about.jsx'
import AddNote from './routes/Home/add-note.jsx'
import UpdateNote from './routes/Home/note.jsx'

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/add-note" element={<AddNote/>} />
        <Route path="/note/:id" element={<UpdateNote/>} />
        <Route path='/about' element={<About/>} />
      </Routes>

     </Router>
    </>
  )
}

export default App
