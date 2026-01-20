import { lazy, Suspense } from "react";
// import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
// import { Store } from "./store/authStore";
import ProtectedRoute from "./auth/ProtectedRoute";
import LoginRoute from "./auth/LoginRoute";

const Login = lazy(() => import('./auth/Login'));
const SignUp = lazy(() => import('./auth/SignUp'));
const Products = lazy(()=>import('./Products'));


const App = () => {
  return (
    <>
    {/* <Provider store={Store}> */}
      <BrowserRouter>
        <ToastContainer />
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginRoute><Login /></LoginRoute>} />
            <Route path="/signup" element={<LoginRoute><SignUp /></LoginRoute>} />
            <Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>} />

          </Routes>
        </Suspense>

      </BrowserRouter>
      {/* </Provider> */}
    </>
  )
}

export default App
