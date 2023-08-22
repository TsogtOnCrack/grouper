import { Slider } from "@mui/material";
import { useState } from "react";
import { Dropdown } from "../components/dropdown";

export const Person = ({
  data,
  handleChange,
  handleChangeTeam,
  teams,
  handleGengerChange,
  handleNameChange,
  active, 
}) => {
  const [sliderValue, setSliderValue] = useState(data.skill);
  const [pickerActive, setPickerActive] = useState(!active);


  return (
    data.skill && (
      <div
        onClick={() => {
          if (data.team === -1) {
            setPickerActive(true);
          }
        }}
        className={` p-2 rounded-lg my-1 flex h-fit w-[250px] text-white overflow-x-clip  border-r-8
      ${data.gender === "F" ? "border-red-500" : "border-blue-500"}
       ${data.team === -1 ? "bg-green-500 cursor-pointer" : "bg-black/60"}`}
      >
        {pickerActive && !active && (
          <div className="flex flex-row justify-around min-w-[230px] mr-4 h-fit items-center">
            {teams.list.length > 5 && (
              <div className="flex flex-row justify-around w-full">
                <p className="mt-1">New Team:</p>{" "}
                <Dropdown
                  handleClick={(targetTeam) => {
                    handleChangeTeam(targetTeam, data.name);
                    if (targetTeam !== "none") {
                      setPickerActive(false);
                    }
                  }}
                  dropDownList={teams.list}
                />
              </div>
            )}

            {teams.list.length <= 5 &&
              teams.list.map((el) => {
                return (
                  <div
                    onClick={() => {
                      handleChangeTeam(el.id, data.name);
                      setPickerActive(false);
                    }}
                    className=" cursor-pointer flex justify-center items-center text-black w-[45px] h-[45px] rounded-full bg-yellow-300"
                  >
                    {el.id}
                  </div>
                );
              })}
          </div>
        )}
        <div className="flex h-full flex-row items-center w-full  justify-between">
            {/* <input type="text" className="w-[65px] bg-transparent outline-none" value = {data.name} onChange={(e)=>{handleNameChange(e, data.name)}} /> */}
            {data.name}
            <div className="flex items-center">
              <div
                onClick={() => {
                  if(data.team !== -1){
                  handleGengerChange(data.gender, data.name);}
                }}
                className={`w-3 h-3 rounded-full cursor-pointer mr-4 ${
                  data.gender === "F" ? "bg-red-500" : "bg-blue-500"
                } ${data.team === -1 ? "!bg-gray-300" : ""}`}
              ></div>
              <div className="w-[80px] mt-2 mr-3">
                <Slider
                  disabled={data.team === -1 ? true : false}
                  value={sliderValue}
                  onChange={(event, newValue) => {
                    setSliderValue(newValue);
                    handleChange({ name: data.name, skill: newValue });
                  }}
                />
              </div>
              <p className="min-w-[35px]">{sliderValue}</p>
            </div>
          </div>
        
      </div>
    )
  );
};
