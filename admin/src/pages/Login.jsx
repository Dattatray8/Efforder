import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessge] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessge] = useState("");
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { getAdminData } = useContext(userDataContext);

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
          serverUrl + "/api/auth/adminlogin",
          { email, password },
          { withCredentials: true }
        )
        .then(async (e) => {
          navigation("/");
          getAdminData();
          toast.success("Logined Successfully!");
          console.log(e);
        });
    } catch (error) {
      if (error.response.status == 400) {
        setEmailErrorMessge(error.response.data.message);
      } else if (email == "") {
        setEmailErrorMessge("Email is required");
      } else {
        setEmailErrorMessge("");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#e6f0fe] mt-20">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back, Admin
            </h1>
            <p className="text-gray-600">
              Sign in to manage products, orders, and users in your dashboard.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
