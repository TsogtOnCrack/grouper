import { Slider } from "@mui/material";
import { useState } from "react";

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
      className={` p-2 rounded-lg my-1 flex h-[54px] w-[250px] text-white ${
        data.team === -1 ? "bg-green-500" : "bg-black/60"
      }`}
    >
      {pickerActive && <div className="flex flex-row justify-around w-full h-full items-center">

        {teams.list && teams.list.map((el)=>{
          return <div onClick = {()=>{
            handleChangeTeam(el.id, data.name)
            setPickerActive(false)
            console.log(pickerActive)

          }} className=" cursor-pointer flex justify-center items-center text-black w-[45px] h-[45px] rounded-full bg-yellow-300">{el.id}</div>
        })}
        
        </div>}
      {!pickerActive && <div className="flex h-full flex-row items-center w-full  justify-between">
        {data.name}
        <div className="flex items-center">
          <div className="w-[80px] mt-2 mr-3">
            <Slider
              value={sliderValue}
              onChange={(event, newValue) => {
                setSliderValue(newValue);
                handleChange({ name: data.name, skill: newValue });
              }}
            />
          </div>
          <p className="min-w-[35px]">{sliderValue}</p>
        </div>
      </div>}
    </div>
  );
};
