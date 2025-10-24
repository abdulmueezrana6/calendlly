// GoogleLoadingBar.jsx
import React, { useState, useEffect } from "react";

const GoogleLoadingBar = () => {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let interval;

    // tăng width ngẫu nhiên
    if (width < 90) {
      interval = setInterval(() => {
        setWidth((prev) => {
          const diff = Math.random() * 10; // giống Google
          return Math.min(prev + diff, 90);
        });
      }, 200);
    }

    // Khi trang load xong (giả lập)
    window.addEventListener("load", () => {
      setWidth(100);
      setTimeout(() => setVisible(false), 500);
    });

    return () => clearInterval(interval);
  }, [width]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${width}%`,
        height: "3px",
        backgroundColor: "#1a73e8",
        zIndex: 9999,
        transition: "width 0.2s ease, opacity 0.5s ease",
      }}
    ></div>
  );
};

export default GoogleLoadingBar;
