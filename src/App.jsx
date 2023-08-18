import logo from "./logo.svg";
import { Slider } from "@mui/material";
import { useState } from "react";

const DATA = [
  { name: "Tsogt", skill: 42 },
  { name: "Tsogt2", skill: 69 },
  { name: "Tsogt3", skill: 42 },
  { name: "Tsogt4", skill: 42 },
  { name: "Tsogt5", skill: 69 },
  { name: "Tsogt6", skill: 69 },
];

function App() {

  const[data, setData] = useState([...DATA])

  return (
    <div className="flex flex-col w-screen h-screen bg-slate-100">
      <div className="flex flex-col border-[2px] border-black w-fit p-12 m-12 rounded-lg">
        {data.map((el, i) => {
          return (
            <div className="my-3 min-w-[240px] flex flex-row justify-between">
              {" "}
              <p>{el.name}</p>{" "}
            <div className="w-[80px]">
                <Slider onChange={(event, newValue)=>{
                  setData([...data, data[i] = {"name":el.name , "skill": newValue}])
                }} min={0} max={100} />{" "}
                </div>
              {el.skill}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
