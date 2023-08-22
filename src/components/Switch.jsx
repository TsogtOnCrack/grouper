import { useEffect, useState } from "react";

export const Switch = ({ handleChange, initialValue }) => {
  const [switchState, setSwitchState] = useState(initialValue);

  useEffect(() => {
    handleChange(switchState);
  }, [switchState]);

  return (
    <div className="flex flex-row items-center justify-between w-[90px] border-[2px] border-black rounded-md px-2 py-1 cursor-pointer">
      <div
        className="z-20"
        onClick={() => {
          setSwitchState("Tsogt");
        }}
      >
        Ts
      </div>
      <div
        className="z-20"
        onClick={() => {
          setSwitchState("Greedy");
        }}
      >
        Gr
      </div>
      <div
        className="z-20"
        onClick={() => {
          setSwitchState("Gender");
        }}
      >
        Ge
      </div>
      <div
        className={`w-[25px] h-[22px] bg-blue-500 rounded-md absolute duration-300 ${
          switchState === "Tsogt" ? "-ml-[4px]" : switchState == "Greedy"? " ml-[21px]" : "ml-[48px]"
        }`}
      ></div>
    </div>
  );
};
