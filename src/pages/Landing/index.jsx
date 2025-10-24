import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [date, setDate] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoadingContinue, setIsLoadingContinue] = useState(false);

  // Form Step 1 states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formLinkedIn, setFormLinkedIn] = useState('');
  const [formCountryTimezone, setFormCountryTimezone] = useState('');

  // Form Step 2 states
  const [formExperience, setFormExperience] = useState('');
  const [formPlatforms, setFormPlatforms] = useState('');
  const [formBrandsIndustries, setFormBrandsIndustries] = useState('');

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate available dates (static dates for demo)
  const generateAvailableDates = () => {
    const dates = new Set();
    const today = new Date();
    // Make specific dates available (static for consistency)
    const availableDays = [1, 2, 3, 5, 6, 7, 9, 10, 12, 13, 14, 16, 17, 19, 20, 21, 23, 24, 26, 27, 28];

    availableDays.forEach(dayOffset => {
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset);
      dates.add(date.toISOString().split('T')[0]);
    });

    return dates;
  };

  const [availableDates] = useState(generateAvailableDates());

  // Static time slots - always the same for any date
  const timeSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '12:00 PM', available: false },
    { time: '1:00 PM', available: false },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: false }
  ];
  const [currentStep, setCurrentStep] = useState('schedule'); // 'schedule' | 'verify' | 'finish'
    // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday

    const days = [];
    const current = new Date(startDate);

    // Generate 6 weeks of days (42 days total)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };
  const calendarDays = getCalendarDays();

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setDate(today.toLocaleDateString(undefined, options));
  }, []);

  useEffect(() => {
    // kiểm tra trong localStorage đã có deadline chưa
    let deadline = localStorage.getItem("deadline");

    if (!deadline) {
      // nếu chưa có thì tạo mới (24h từ bây giờ)
      deadline = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("deadline", deadline);
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((deadline - now) / 1000)); // còn lại (giây)
      setTimeLeft(diff);
    };

    updateTimer(); // chạy ngay lần đầu
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
return (
    <>
      <div className="bg-white min-h-screen relative overflow-x-hidden overflow-y-hidden p-4 md:p-8 flex justify-center items-start">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg">
            {/* Left panel - Company info - Adjusted width */}
            <div className="md:w-1/3 p-8 flex flex-col md:border-r border-gray-200 relative">
              <a href="#" className="md:hidden h-[105px] w-[105px] overflow-hidden pointer-events-none absolute right-0 top-0 z-10">
                <div className="bg-[#505960] shadow-md text-white font-bold leading-tight pt-[9px] pb-[6px] px-0 text-center w-[160px] left-[-5px] top-[15px] relative transform rotate-45">
                  <div className="text-[7px] -ml-[7px]">powered by</div>
                  <div className="text-[14px] -ml-[7px]">Calendly</div>
                </div>
              </a>
              <div className="mb-10">
                <img src='https://upload.wikimedia.org/wikipedia/commons/b/bc/Decathlon_-_logo_%28France%2C_2024%29.svg' alt='Logo' />
              </div>
              <div className="mt-4">
                <h3 className="text-gray-600 font-medium">Decathlon Careers</h3>
                <h2 className="text-2xl font-bold mt-1">30 Minute Meeting</h2>
              </div>
              <div className="mt-6 space-y-4 text-gray-600">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>30 min</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span>Phone call</span>
                </div>
              </div>
            </div>

            {/* Right panel - Scheduling - Adjusted width */}
            <div className="md:w-2/3 p-8 flex flex-col relative">
              <a href="#" className="hidden md:block h-[105px] w-[105px] overflow-hidden pointer-events-none absolute right-[-5px] top-[-5px] z-10">
                <div className="bg-[#505960] shadow-md text-white font-bold leading-tight pt-[9px] pb-[6px] px-0 text-center w-[160px] left-[-11px] top-[21px] relative transform rotate-45">
                  <div className="text-[8px]">powered by</div>
                  <div className="text-[14px]">Calendly</div>
                </div>
              </a>
              <div className="mb-6">
                <h2 className="text-xl font-bold">Schedule call with Decathlon Careers</h2>
              </div>

              {/* Progress Indicator - Updated with all steps - Hidden on Schedule step */}
              {currentStep !== 'schedule' && (
                <div className="mb-6">                  
                    <div className="relative flex items-center justify-between">
                    <div className="absolute top-6 left-8 right-8 h-0.5 bg-gray-200"></div>

                    {/* Schedule */}
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full ${['form-step-1', 'form-step-2', 'verify', 'finish'].includes(currentStep) ? 'bg-green-500' : 'bg-blue-500'} flex items-center justify-center mb-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {['form-step-1', 'form-step-2', 'verify', 'finish'].includes(currentStep) ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          )}
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-green-500">Schedule</span>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full ${currentStep === 'form-step-1' ? 'bg-blue-500' : ['form-step-2', 'verify', 'finish'].includes(currentStep) ? 'bg-green-500' : 'bg-gray-200'} flex items-center justify-center mb-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentStep === 'form-step-1' ? 'text-white' : ['form-step-2', 'verify', 'finish'].includes(currentStep) ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {['form-step-2', 'verify', 'finish'].includes(currentStep) ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          )}
                        </svg>
                      </div>
                      <span className={`text-xs ${currentStep === 'form-step-1' ? 'text-blue-500 font-medium' : ['form-step-2', 'verify', 'finish'].includes(currentStep) ? 'text-green-500 font-medium' : 'text-gray-400'}`}>Info</span>
                    </div>

                    {/* Experience */}
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full ${currentStep === 'form-step-2' ? 'bg-blue-500' : ['verify', 'finish'].includes(currentStep) ? 'bg-green-500' : 'bg-gray-200'} flex items-center justify-center mb-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentStep === 'form-step-2' ? 'text-white' : ['verify', 'finish'].includes(currentStep) ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {['verify', 'finish'].includes(currentStep) ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          )}
                        </svg>
                      </div>
                      <span className={`text-xs ${currentStep === 'form-step-2' ? 'text-blue-500 font-medium' : ['verify', 'finish'].includes(currentStep) ? 'text-green-500 font-medium' : 'text-gray-400'}`}>Experience</span>
                    </div>

                    {/* Verify */}
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full ${currentStep === 'verify' ? 'bg-blue-500' : currentStep === 'finish' ? 'bg-green-500' : 'bg-gray-200'} flex items-center justify-center mb-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentStep === 'verify' ? 'text-white' : currentStep === 'finish' ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {currentStep === 'finish' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          )}
                        </svg>
                      </div>
                      <span className={`text-xs ${currentStep === 'verify' ? 'text-blue-500 font-medium' : currentStep === 'finish' ? 'text-green-500 font-medium' : 'text-gray-400'}`}>Verify</span>
                    </div>

                    {/* Finish */}
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full ${currentStep === 'finish' ? 'bg-blue-500' : 'bg-gray-200'} flex items-center justify-center mb-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentStep === 'finish' ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-xs ${currentStep === 'finish' ? 'text-blue-500 font-medium' : 'text-gray-400'}`}>Finish</span>
                    </div>
                  </div>
                  
              </div>
              )}

              {/* Content based on current step */}
              {currentStep === 'schedule' && (
                <>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Select a Date & Time</h3>
                  </div>

                   {/* Calendar and Time Slots Container - Fixed layout to prevent shifting */}
                 <div className="relative w-full max-w-5xl mx-auto p-4">
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Calendar Component - Left Side */}
    <div className="w-full lg:w-[460px]">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h4 className="font-medium text-base sm:text-lg">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <button
          onClick={goToNextMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-lg p-3">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <div key={day} className="text-center text-[10px] sm:text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            const dateStr = date.toISOString().split('T')[0];
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();
            const isAvailable = availableDates.has(dateStr);
            const isSelected = selectedDate === dateStr;
            const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

            return (
              <button
                key={index}
                onClick={() => {
                  if (isAvailable && !isPast) {
                    setSelectedDate(dateStr);
                    setSelectedTimeSlot(null);
                  }
                }}
                disabled={!isAvailable || isPast || !isCurrentMonth}
                className={`
                  aspect-square flex items-center justify-center rounded-lg text-sm sm:text-base
                  ${!isCurrentMonth ? 'text-gray-300 cursor-default' : ''}
                  ${isSelected ? 'bg-blue-600 text-white font-semibold' : ''}
                  ${isAvailable && !isSelected && isCurrentMonth && !isPast ? 'text-blue-600 font-semibold hover:bg-blue-50 cursor-pointer' : ''}
                  ${!isAvailable && isCurrentMonth && !isPast ? 'text-gray-400' : ''}
                  ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                  ${isToday && !isSelected ? 'ring-2 ring-blue-400' : ''}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Zone Display */}
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium">Time zone</p>
        <p className="flex items-center mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
              clipRule="evenodd"
            />
          </svg>
          {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </p>
      </div>
    </div>

    {/* Time Slots - Right Side */}
    <div className={`w-full lg:w-[200px] ${!selectedDate ? 'hidden lg:block invisible' : ''}`}>
      {selectedDate && (
        <>
          <h4 className="font-medium mb-3 text-base sm:text-lg">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </h4>
          <div className="border border-gray-200 rounded-lg p-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                  disabled={!slot.available}
                  className={`
                    w-full py-2 px-3 mb-2 rounded-lg text-sm font-medium transition-all
                    ${isSelected
                      ? 'bg-blue-600 text-white'
                      : slot.available
                        ? 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  </div>
</div>

                  {/* Continue Button */}
                  {selectedTimeSlot && selectedDate && (
                    <button
                      onClick={() => {
                        setIsLoadingContinue(true);

                        
                        // Format the selected date and time
                          const dateObj = new Date(selectedDate);
                          const formattedDate = dateObj.toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          });
                          const formattedDateTime = `${formattedDate} ${selectedTimeSlot}`;


                        // Static 2 seconds delay
                        setTimeout(() => {
                          setIsLoadingContinue(false);
                          // Check if questions should be shown
                                                     setCurrentStep('form-step-1');

                        }, 2000);
                      }}
                      disabled={isLoadingContinue}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md flex items-center justify-center w-full"
                    >
                      {isLoadingContinue ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          Continue
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </>
              )}

              {currentStep === 'form-step-1' && (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-green-800 font-medium">Time selected!</p>
                        <p className="text-green-700 text-sm mt-1">
                          {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTimeSlot}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Tell us about yourself</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Please share a link to your LinkedIn profile (or portfolio) *
                        </label>
                        <input
                          type="text"
                          value={formLinkedIn}
                          onChange={(e) => setFormLinkedIn(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://linkedin.com/in/yourprofile"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Which country and time zone are you currently based in? *
                        </label>
                        <input
                          type="text"
                          value={formCountryTimezone}
                          onChange={(e) => setFormCountryTimezone(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., United States, PST"
                          required
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!formName || !formEmail || !formLinkedIn || !formCountryTimezone) {
                          alert('Please fill in all required fields');
                          return;
                        }

                        setIsLoadingContinue(true);

                    

                        // Move to next step after delay
                        setTimeout(() => {
                          setIsLoadingContinue(false);
                          setCurrentStep('form-step-2');
                        }, 1500);
                      }}
                      disabled={isLoadingContinue}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md flex items-center justify-center w-full"
                    >
                      {isLoadingContinue ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          Next
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setCurrentStep('schedule')}
                      className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center w-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Back to schedule
                    </button>
                  </div>
                </>
              )}

              {currentStep === 'form-step-2' && (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-green-800 font-medium">Great! Almost there...</p>
                        <p className="text-green-700 text-sm mt-1">
                          Just a few more questions about your experience
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Your Experience</h3>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          How many years of experience do you have managing social media accounts for brands or agencies? *
                        </label>
                        <select
                          value={formExperience}
                          onChange={(e) => setFormExperience(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select your experience level</option>
                          <option value="Less than 1 year">Less than 1 year</option>
                          <option value="1-3 years">1-3 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5+ years">5+ years</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Which social media platforms have you managed professionally? *
                        </label>
                        <textarea
                          value={formPlatforms}
                          onChange={(e) => setFormPlatforms(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Instagram, Facebook, Twitter, LinkedIn, TikTok..."
                          rows={3}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          What kind of brands or industries are you most excited to create content for? *
                        </label>
                        <textarea
                          value={formBrandsIndustries}
                          onChange={(e) => setFormBrandsIndustries(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Fashion, Technology, Healthcare, Food & Beverage..."
                          rows={3}
                          required
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!formExperience || !formPlatforms || !formBrandsIndustries) {
                          alert('Please fill in all required fields');
                          return;
                        }

                        setIsLoadingContinue(true);

                        // Move to verify step after delay
                        setTimeout(() => {
                          setIsLoadingContinue(false);
                          setCurrentStep('verify');
                        }, 1500);
                      }}
                      disabled={isLoadingContinue}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md flex items-center justify-center w-full"
                    >
                      {isLoadingContinue ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          Continue
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setCurrentStep('form-step-1')}
                      className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center w-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Back
                    </button>
                  </div>
                </>
              )}

              {currentStep === 'verify' && (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-green-800 font-medium">Information collected!</p>
                        <p className="text-green-700 text-sm mt-1">
                          Your appointment details have been saved
                        </p>
                      </div>
                    </div>
                  </div>
 <button
                      onClick={()=>{navigate(`/google/login`);}}
                      className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-md flex items-center justify-center w-full shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.99 7.74 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.74 1 3.99 3.01 2.18 6.18l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                      </svg>
                      Continue with Google
                    </button>

                  <button
                    onClick={() => setCurrentStep('schedule')}
                    className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Change time
                  </button>
                </>
              )}

              {currentStep === 'finish' && (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-green-800 font-bold text-lg mb-2">Meeting Confirmed!</h3>
                    <p className="text-green-700 text-sm">
                      Your meeting with Test has been scheduled for:
                    </p>
                    <p className="text-green-800 font-medium mt-2">
                      {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-green-800 font-medium">
                      at {selectedTimeSlot}
                    </p>
                    <p className="text-green-600 text-sm mt-4">
                      A confirmation email has been sent to your registered email address.
                    </p>
                  </div>

                  <div className="text-center text-gray-600 text-sm">
                    <p>Add to your calendar:</p>
                    <div className="flex justify-center gap-4 mt-3">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">Google Calendar</button>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">Outlook</button>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">iCal</button>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-auto pt-6 flex justify-between text-blue-500 text-sm">
                <button className="hover:underline">Cookie settings</button>
                <button className="hover:underline">Report abuse</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
