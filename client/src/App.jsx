import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Games from "./pages/Games"
import Dashboard from "./pages/Dashboard"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"
import FooterCom from "./components/FooterCom"
import PrivateRoute from './components/PrivateRoute'

function App() {
  
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />}/> 
      <Route path="/sign-up" element={<SignUp />}/>
      <Route path="/about" element={<About />} />
      <Route path="/all-games" element={<Games />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App
