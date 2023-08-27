import { SegmentedControl, Title, Card, Slider, Button } from "@mantine/core";
import { useEffect, useState } from "react";

import { useToggle } from '@mantine/hooks';

export const Configurations = ({handleTeamCountChange, userData, handleChange, active, setActive, handleReset, groupType}) => {
  const [value, setValue] = useState();


  const [sliderValue, setSliderValue] = useState(userData ? userData.length : 4)

  useEffect(()=>{
    handleChange(value)
  },[value])
  return (
    <Card
      withBorder
      radius={"md"}
      className=" shadow-md w-full h-[170px] flex flex-col justify-between"
    >
      <div className="flex flex-row justify-between">
        <Title order={2}>Configurations for</Title>
        <Title order={2} className=" uppercase">
          :Project Name
        </Title>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between w-[210px]">
            <Title order={4} className=" font-light">
              Number of teams
            </Title>
            <Title
              order={4}
              className=" font-extralight border-b-2 border-black "
            >
                :{sliderValue}
            </Title>
          </div>
          <div className="flex flex-row justify-between items-center mt-2">
            <Slider min={0}
        max={userData.length} onChange={setSliderValue} value={sliderValue} label={null} className="w-[60%]" color="dark" />
            <Button onClick={()=>{
                handleTeamCountChange(sliderValue)
            }} className="uppercase" compact type="primary" color="dark">
              Set
            </Button>
          </div>
        </div>

        <div className="h-full w-fit flex justify-center items-center">
          {groupType !== "NOTINITIALIZEDYET" && <SegmentedControl
            className="h-fit"
            value={groupType}
            onChange={setValue}
            data={[
              { label: "Tsogt", value: "Tsogt" },
              { label: "Greedy", value: "Greedy" },
              { label: "Gener", value: "Gender" },
            ]}
          />}
        </div>

        <div className="h-full w-fit flex justify-center items-center">
        <Button type="primary " compact className="uppercase" color={active ? "dark": "gray"} onClick={()=>{
            if(active){
                setActive(false)
            }else{
                setActive(true)
            }
        }}>
            group
    </Button>
        </div>
        <div className="h-full w-fit flex justify-center items-center">
        <Button onClick={ () =>{
            handleReset()
        }} type="primary" compact color = "red" className="uppercase">
            Reset
    </Button>
        </div>
      </div>
    </Card>
  );
};
