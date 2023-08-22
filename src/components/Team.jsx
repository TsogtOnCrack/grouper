import { useState } from "react";

export const Team = ({ data, userData, handleDelete }) => {

  return (
    <div className="bg-black/80 min-w-[150px] min-h-[120px] h-fit m-2 text-white p-3 rounded-lg ">
      <div>
        {data.id} :{" "}
        {data.members.reduce((sum, el) => sum = sum + Number(userData.find((a)=> a.name === el).skill), 0)}
      </div>
      {data.members.map((e) => {
        const targetPerson = userData.find((a) => a.name === e);
        return (
          <div className={`flex w-full justify-between border-l-2 my-2 pl-1 ${targetPerson.gender === "F" ? " border-red-500 " : "border-blue-500 "}`}>
            <h1>{e}</h1>
            <p>{targetPerson.skill}</p>
            <p onClick = {()=>{
              handleDelete(e)
            }} className="text-red-600 cursor-pointer">x</p>
          </div>
        );
      })}
    </div>
  );
};
