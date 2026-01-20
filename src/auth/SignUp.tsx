import { Link, useNavigate } from "react-router-dom";
import { EmailIcon, FBIcon, googleIcon, KeyIcon } from "../assets/Icons";
import IMG1 from "../assets/signup.jpg";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { signupUser } from "../store/authSlice";
// import { toast } from "react-toastify";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  const signup = useAuthStore((state: any) => state.signup);

  // const dispatch = useDispatch();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateEmail = (value: any) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email format";
    return "";
  };

  const validatePassword = (value: any) => {
    if (!value.trim()) return "Password is required";
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!passRegex.test(value))
      return "Password must be min 6 chars, 1 letter & 1 number";
    return "";
  };

  const validateRepeatPassword = (value: any) => {
    if (!value.trim()) return "Please repeat password";
    if (value !== password) return "Passwords do not match";
    return "";
  };

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);

    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
      repeatPassword: repeatPassword
        ? validateRepeatPassword(repeatPassword)
        : "",
    }));
  };


  const handleRepeatPasswordChange = (e: any) => {
    const value = e.target.value;
    setRepeatPassword(value);
    setErrors((prev) => ({
      ...prev,
      repeatPassword: validateRepeatPassword(value),
    }));
  };

  const isFormValid =
    !errors.email &&
    !errors.password &&
    !errors.repeatPassword &&
    email &&
    password &&
    repeatPassword;

  const signupHandle = async () => {
    if (!isFormValid) return;
    await signup(email, password);

    // dispatch(
    //   signupUser({
    //     email,
    //     password,
    //     repeatPassword,
    //   })
    // );
    navigate('/')

  };

  return (
    <div className="h-screen overflow-hidden overflow-y-hidden">
      <div className="mt-15 lg:mt-0 flex flex-col  lg:flex-row-reverse">
        <div className="w-full lg:w-[50%] flex items-center justify-center ">
          <div className="">
            <h1 className="font-semibold text-[30px] text-[#171725] font-poppins mb-10 lg:text-start text-center">Sign Up</h1>

            <div>
              <div className="border border-[#E0E2E9] w-[90%] mx-auto lg:w-100.75 flex items-center px-3.5 py-3.5 h-11.25 rounded-lg">
                {EmailIcon}
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full outline-none px-2 font-poppins"
                  placeholder="Your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

              <div className="mt-4 border border-[#E0E2E9] w-[90%] mx-auto lg:w-100.75 flex items-center px-3.5 py-3.5 h-11.25 rounded-lg">
                {KeyIcon}

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full outline-none px-2 font-poppins"
                  placeholder="Password"
                />

                <span
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

              <div className="mt-4 border border-[#E0E2E9] w-[90%] mx-auto lg:w-100.75 flex items-center px-3.5 py-3.5 h-11.25 rounded-lg">
                {KeyIcon}

                <input
                  type={showRepeatPassword ? "text" : "password"}
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  className="w-full outline-none px-2 font-poppins"
                  placeholder="Repeat Password"
                />

                <span
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowRepeatPassword((prev) => !prev)}
                >
                  {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.repeatPassword && <p className="text-red-500 text-xs mt-1">{errors.repeatPassword}</p>}
            </div>

            <div className="w-[90%] lg:w-full mx-auto">

              <button
                disabled={!isFormValid}
                onClick={signupHandle}
                className={` w-full bg-[#0062FF]  px-3 h-11.25 text-white cursor-pointer font-poppins font-semibold rounded-md mt-6 text-[15px] ${!isFormValid ? "bg-gray-400 cursor-not-allowed" : ""
                  }`}
              >
                Sign Up
              </button>
            </div>

            <div className="flex items-center justify-between mt-[42.5px]">
              <hr className="text-[#E4E6EC] w-[45%]" />
              <h1 className="font-poppins text-[14px] text-[#969AB8]">or</h1>
              <hr className="text-[#E4E6EC] w-[45%]" />
            </div>

            <div className="flex items-center justify-center gap-5 mt-5">
              <div className="cursor-pointer w-[40%]  lg:w-47.5 h-11.25 border border-[#E0E2E9] rounded-md flex items-center justify-center gap-3.75">
                {googleIcon}
                <h1 className="font-poppins font-semibold text-[14px]">Google</h1>
              </div>
              <div className="cursor-pointer w-[40%] lg:w-47.5 h-11.25 border border-[#E0E2E9] rounded-md flex items-center justify-center gap-3.75">
                {FBIcon}
                <h1 className="font-poppins font-semibold text-[14px]">Facebook</h1>
              </div>
            </div>

            <h1 className="mt-10 font-poppins text-[15px] text-[#969AB8] text-center lg:text-start">
              Already have an account?
              <span className="text-[15px] font-poppins font-semibold text-[#0062FF] cursor-pointer">
                {" "}
                <Link to="/">Log In</Link>
              </span>
            </h1>
          </div>
        </div>

        <div className="w-[60%] h-screen lg:flex justify-end relative hidden">
          <div className="absolute pt-18 px-24.25">
            <h1 className="font-poppins leading-11 text-[26px] text-[#3A424A]">
              The only way to <span className="text-[#3062D4] font-semibold"> do great work </span> is to{" "}
              <span className="text-[#3062D4] font-semibold">love what you do.</span>
            </h1>
              <h1 className="text-end text-[24px] font-poppins font-medium text-[#3A424A]"> - Steve Jobs </h1>
          </div>

          <img src={IMG1} alt="" className="object-center h-screen w-full" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
