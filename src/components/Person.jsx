import { Slider } from "@mui/material";
import { useState } from "react";
import { Dropdown } from "../components/dropdown";

export const Person = ({ data, handleChange, handleChangeTeam, teams }) => {
  const [sliderValue, setSliderValue] = useState(data.skill);
  const [pickerActive, setPickerActive] = useState(false);

  return (
    <div
      onClick={() => {
        if (data.team === -1) {
          setPickerActive(true);
        }
      }}
      className={` p-2 rounded-lg my-1 flex h-fit w-[250px] text-white ${
        data.team === -1 ? "bg-green-500 cursor-pointer" : "bg-black/60"
      }`}
    >
      {pickerActive && (
        <div className="flex flex-row justify-around w-full h-fit items-center">
          {teams.list.length > 5 && (
            <div className="flex flex-row justify-around w-full">
              <p className="mt-1">New Team:</p>{" "}
              <Dropdown
                handleClick={(targetTeam) => {
                  handleChangeTeam(targetTeam, data.name);
                  setPickerActive(false);
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
      {!pickerActive && (
        <div className="flex h-full flex-row items-center w-full  justify-between">
          {data.name}
          <div className="flex items-center">
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
      )}
    </div>
  );
};
