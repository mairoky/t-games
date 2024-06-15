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
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import AddGame from "./pages/AddGame"
import UpdateGame from "./pages/UpdateGame"
import GamePage from "./pages/GamePage"
import ScrollToTop from './components/ScrollToTop'
import { Toaster } from 'react-hot-toast';

function App() {
  
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Toaster />
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />}/> 
      <Route path="/sign-up" element={<SignUp />}/>
      <Route path="/about" element={<About />} />
      <Route path="/all-games" element={<Games />} />
      <Route path="/game/:gameSlug" element={<GamePage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<OnlyAdminPrivateRoute />}>
        <Route path="/add-game" element={<AddGame />} />
        <Route path='/update-game/:gameId' element={<UpdateGame />} />
      </Route>
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App
