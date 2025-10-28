import React, { useEffect, useState } from "react";

// ThreeCircles component
// - Shows 3 circular cards with numbers
// - Two numbers are random (1..100 by default)
// - One number is fixed by user input
// - Props: initialFixed (number) optional, min/max for random

export default function ThreeCircles({ initialFixed = 42, min = 1, max = 100 }) {
  const [fixed, setFixed] = useState(initialFixed);
  const [randoms, setRandoms] = useState([0, 0]);

  // helper: random integer between min and max inclusive
  const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  // generate two random numbers
  const genRandoms = () => {
    const r1 = randInt(min, max);
    let r2 = randInt(min, max);
    let tries = 0;
    while (r2 === r1 && tries < 6) {
      r2 = randInt(min, max);
      tries += 1;
    }
    setRandoms([r1, r2]);
  };

  useEffect(() => {
    genRandoms();
  }, []);

const Circle = ({ value, title }) => {
  return (
    <div
      className="flex flex-col items-center justify-center
                 w-16 h-16 md:w-20 md:h-20
                 rounded-full bg-white ring-1 ring-gray-200
                 shadow-sm hover:shadow-lg hover:scale-105
                 transition-transform transition-shadow duration-300 ease-in-out"
      role="group"
      aria-label={title}
    >
      {title && (
        <div className="text-[10px] md:text-xs font-medium text-gray-500">{title}</div>
      )}
      <div className="mt-1 font-semibold text-lg md:text-xl lg:text-2xl text-blue-700">
        {value}
      </div>
    </div>
  );
};



  return (
  <div className="p-4 max-w-4xl mx-auto">
  <div className="flex justify-center gap-4 md:gap-6">
    <Circle value={randoms[0]} color="blue" />
    <Circle value={fixed} color="red" />
    <Circle value={randoms[1]} color="green" />
  </div>
</div>

  );
}
