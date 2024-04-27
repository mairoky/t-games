import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Games from "./pages/Games"
import Dashboard from "./pages/Dashboard"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<LogIn />}/> 
      <Route path="/sign-up" element={<SignUp />}/>
      <Route path="/about" element={<About />} />
      <Route path="/all-games" element={<Games />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
