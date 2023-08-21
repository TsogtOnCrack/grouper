import { useState } from "react";

export const NumberInput = ({ initialValue, handleSubmit }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  return (
    <div className="flex flex-row">
      <input
        className="px-2 rounded-md w-[60px]"
        type="number"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleSubmit(inputValue);
        }}
        className="text-[14px] bg-green-500 rounded-md mx-1 px-2 hover:bg-green-400 duration-300"
      >
        SET
      </button>
    </div>
  );
};
