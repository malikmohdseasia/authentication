import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const Login = lazy(() => import('./auth/Login'));
const SignUp = lazy(() => import('./auth/SignUp'));


const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

          </Routes>
        </Suspense>

      </BrowserRouter>
    </>
  )
}

export default App
