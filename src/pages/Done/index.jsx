import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Done() {
  const [date, setDate] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoadingContinue, setIsLoadingContinue] = useState(false);

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
  const [currentStep, setCurrentStep] = useState('finish'); // 'schedule' | 'verify' | 'finish'
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
    // Removed Fragment (<>) as modal is gone, direct div is fine
    <div className="bg-white min-h-screen relative overflow-x-hidden overflow-y-hidden p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg">
          <div className="md:w-full p-8 flex flex-col relative">
            {/* "Powered by Calendly" label - Desktop version */}
            <a href="#" className="hidden md:block h-[105px] w-[105px] overflow-hidden pointer-events-none absolute right-[-5px] top-[-5px] z-10">
              <div className="bg-[#505960] shadow-md text-white font-bold leading-tight pt-[9px] pb-[6px] px-0 text-center w-[160px] left-[-11px] top-[21px] relative transform rotate-45">
                <div className="text-[8px]">powered by</div>
                <div className="text-[14px]">Calendly</div>
              </div>
            </a>

            {/* Title */}
            <div className="mb-8">
              <h2 className="text-xl font-bold">Schedule call with Decathlon Careers</h2>
            </div>

            {/* Progress tracker - Updated Styles */}
            <div className="mb-8">
              <div className="relative flex items-center justify-between">
                {/* Progress line - Needs adjustment if want line to be blue too */}
                <div className="absolute top-6 left-16 right-16 h-0.5 bg-blue-500"></div> {/* Changed line to blue */}

                {/* Verify - Completed */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-blue-500 text-sm font-medium">Verify</span>
                </div>

                {/* Schedule - Completed */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {/* Changed text color to blue */}
                  <span className="text-blue-500 text-sm font-medium">Schedule</span>
                </div>

                {/* Finish - Completed */}
                <div className="flex flex-col items-center z-10">
                  {/* Changed background to blue */}
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                    {/* Changed icon color to white */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                   {/* Changed text color to blue */}
                  <span className="text-blue-500 text-sm font-medium">Finish</span>
                </div>
              </div>
            </div>

            {/* Success message */}
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 text-center">
                <div className="flex justify-center items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">You are scheduled!</h3>
                <p className="text-sm text-gray-700">
                    Your call with Decathlon Careers is confirmed.
                    <br />
                    A calendar invitation has been sent to your email address. You will be notified via email of any changes.
                </p>
            </div>

            {/* Removed Facebook and Google Buttons */}

            {/* Footer options */}
            <div className="mt-auto pt-6 flex justify-between text-blue-500 text-sm">
              <button className="hover:underline">Cookie settings</button>
              <button className="hover:underline">Report abuse</button>
            </div>
          </div>
        </div>
      </div>

      {/* Removed Modal Rendering */}
    </div>
  );
}

export default Done;
