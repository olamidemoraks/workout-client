import React from "react";

type CustomLoaderProps = {
  amount: number;
  height: string;
  weight: string;
};

const CustomLoader: React.FC<CustomLoaderProps> = ({
  amount,
  height,
  weight,
}) => {
  return (
    <>
      {Array(amount)
        .fill(0)
        .map((_, idx) => (
          <div
            className={`${weight} ${height} rounded-md bg-zinc-900 animate-pulse`}
            key={idx}
          ></div>
        ))}
    </>
  );
};
export default CustomLoader;
