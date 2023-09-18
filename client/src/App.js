import React from 'react'
import { BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import logo from "./assets/logo.svg"
import "./App.css"
import { Home,CreatePost } from './pages/index'

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/" id="logo">
          <img src={logo} alt="logo"/>
        </Link>
        <Link to="/create-Post" id="create"><div>Create</div></Link>
      </header>
      <Routes>  
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/create-Post" element={<CreatePost></CreatePost>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App