import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase.js";
import { userDataContext } from "../context/UserContext.jsx";
import { ProductDataContext } from "../context/ProductContext.jsx";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessge] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessge] = useState("");
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const { getCart } = useContext(ProductDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "") {
      setEmailErrorMessge("Email is required");
    }
    if (password == "") {
      setPasswordErrorMessge("Password is required");
    }
    try {
      await axios
        .post(
          serverUrl + "/api/auth/login",
          { email, password },
          { withCredentials: true }
        )
        .then(async (e) => {
          navigation("/");
          console.log(e);
          await getCurrentUser();
          await getCart();
        });
      navigation("/");
    } catch (error) {
      if (error.response.status == 404) {
        setEmailErrorMessge(error.response.data.message);
      } else if (email == "") {
        setEmailErrorMessge("Email is required");
      } else {
        setEmailErrorMessge("");
      }
      if (error.response.status == 401) {
        setPasswordErrorMessge(error.response.data.message);
      } else if (password == "") {
        setEmailErrorMessge("Email is required");
      } else {
        setPasswordErrorMessge("");
      }
      console.log(error.response.status);
      console.log(error.response.data.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      let name = res.user.displayName;
      let email = res.user.email;
      await axios
        .post(
          serverUrl + "/api/auth/googleLogin",
          { name, email },
          { withCredentials: true }
        )
        .then(async (e) => {
          navigation("/");
          console.log(e);
          await getCurrentUser();
          await getCart();
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#e6f0fe] mt-20">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue your shopping journey
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Google Signup Button */}
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center cursor-pointer space-x-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285f4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34a853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#fbbc05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#ea4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  or sign in with email
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
                {emailErrorMessage && (
                  <p className="text-red-500 px-2 text-sm">
                    {emailErrorMessage}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                {showPassword ? (
                  <EyeOff
                    className={`absolute right-3 cursor-pointer top-[50%] `}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className={`absolute right-3 cursor-pointer top-[55%]`}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
                {passwordErrorMessage && (
                  <p className="text-red-500 px-2 text-sm">
                    {passwordErrorMessage}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 cursor-pointer text-white py-3 px-4 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium transition-all duration-200 mt-6"
              >
                Sign in
              </button>
              <p className="text-sm text-center mt-4">
                Don’t have an account?{" "}
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => {
                    navigation("/signup");
                  }}
                >
                  Sign up
                </span>
              </p>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
