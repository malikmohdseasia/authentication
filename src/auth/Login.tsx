import { Link } from "react-router-dom";
import { EmailIcon, FBIcon, googleIcon, KeyIcon } from "../assets/Icons";
import IMG1 from "../assets/login.jpg";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });



  const validateEmail = (value:any) => {
    if (!value.trim()) return 'Email is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email format';

    return '';
  };

  const validatePassword = (value:any) => {
    if (!value.trim()) return 'Password is required';

    if (value.length < 6) return 'Password must be at least 6 characters';

    return '';
  };

  const handleEmailChange = (e:any) => {
    const value = e.target.value;
    setEmail(value);

    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value),
    }));
  };

  const handlePasswordChange = (e:any) => {
    const value = e.target.value;
    setPassword(value);

    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
    }));
  };

  const isFormValid =
    !errors.email &&
    !errors.password &&
    email &&
    password;



  const login = useAuthStore((state:any) => state.login);

  const loginHandle = async () => {

    await login(email, password);
    console.log('success!')
  }

  return (
    <div className="h-screen overflow-hidden overflow-y-hidden">
      <div className="flex flex-col lg:flex-row ">
        <div className="w-full lg:w-[50%] flex items-center justify-center mt-15">

          <div className="">
            <h1 className="font-semibold text-[30px] text-[#171725] font-poppins mb-10 text-center lg:text-start">Log In</h1>

            <div>
              <div className="border border-[#E0E2E9] w-[90%] mx-auto lg:w-100.75 flex items-center px-3.5 py-3.5 h-11.25 rounded-lg">
                {EmailIcon}
                <input type="email" name="" 
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full outline-none px-2 placeholder:text:-[#969AB8] font-poppins" placeholder="Your email" />

              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}

              <div className="mt-4 border border-[#E0E2E9]  w-[90%] mx-auto lg:w-100.75 flex items-center px-3.5 py-3.5 h-11.25 rounded-lg ">
                {KeyIcon}
                <input type="password" name="" 
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full outline-none px-2 placeholder:text:-[#969AB8] font-poppins" placeholder="Password" />

              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="w-[90%] mx-auto lg:w-100.75">

              <button className={`w-full px-3 h-11.25 text-[#FFFFFF] cursor-pointer font-poppins font-semibold rounded-md mt-6 text-[15px]
                ${isFormValid
                  ? 'bg-[#0062FF] cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'}
              `}
                disabled={!isFormValid}
                onClick={loginHandle}
              >Log In</button>
            </div>
            <div>

              <h1 className="mt-4 pr-10 lg:pr-0 text-end text-[#0062FF] font-semibold font-poppins cursor-pointer ">Forgot password?</h1>
            </div>

            <div className="flex items-center justify-between">
              <hr className="text-[#E4E6EC] w-[45%]" />

              <h1 className="font-poppins text-[14px] text-[#969AB8]">or</h1>

              <hr className="text-[#E4E6EC] w-[45%]" />
            </div>

            <div className="flex items-center gap-5 mt-5">
              <div className="cursor-pointer  w-47.5 h-11.25 border border-[#E0E2E9] rounded-md flex items-center justify-center gap-3.75
          ">
                {googleIcon}
                <h1 className="font-poppins font-semibold text-[14px]">Google</h1>
              </div>

              <div className="w-47.5 h-11.25 border border-[#E0E2E9] rounded-md flex items-center justify-center gap-3.75
       cursor-pointer   ">
                {FBIcon}
                <h1 className="font-poppins font-semibold text-[14px]">Facebook</h1>
              </div>
            </div>

            <h1 className="mt-10 font-poppins text-[15px] text-[#969AB8] text-center lg:text-start">Don’t have an account? <span

              className="text-[15px]
        font-poppins font-semibold text-[#0062FF] cursor-pointer
        "><Link to={'/signup'}>Sign Up</Link></span></h1>
          </div>
        </div>

        <div className="w-[60%] h-screen lg:flex justify-end relative hidden">
          <div className="absolute pt-31.25 px-24.25">
            <h1 className="font-poppins leading-11 text-[26px] text-[#3A424A]">The future belongs to those who <span className="text-[#3062D4] font-semibold">believe</span>  in the <span className="text-[#3062D4] font-semibold">beauty of their dreams.</span>
              </h1>
              <h1 className="text-end text-[24px] font-poppins font-medium"> - Eleanor Roosevelt
            </h1>

          </div>

          <img src={IMG1} alt="" className="object-center h-screen " />
        </div>

      </div>
    </div>
  )
}

export default Login
