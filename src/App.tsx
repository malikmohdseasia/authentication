import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./auth/Login"
import SignUp from "./auth/SignUp"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>

      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
