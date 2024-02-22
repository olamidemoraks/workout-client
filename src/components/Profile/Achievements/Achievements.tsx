import React from "react";

const Achievements = () => {
  return (
    <div className="grid grid-cols-5 w-full md:px-10 px-3 ">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div key={index}>{index}</div>
        ))}
    </div>
  );
};

export default Achievements;
