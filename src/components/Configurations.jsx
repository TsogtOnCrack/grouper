import { SegmentedControl, TextInput, Title, Card, Slider, Button } from "@mantine/core";
import { useEffect, useState } from "react";

import { useToggle } from "@mantine/hooks";

export const Configurations = ({
  handleTeamCountChange,
  userData,
  handleChange,
  active,
  setActive,
  handleReset,
  groupType,
  setTitle,
  title
}) => {

  console.log("========>>>>>>>",title)
  const [value, setValue] = useState();

  const [sliderValue, setSliderValue] = useState(
    userData ? userData.length : 4
  );

  useEffect(() => {
    handleChange(value);
  }, [value]);
  return (
    <Card
      withBorder
      radius={"md"}
      className=" shadow-md h-fit min-h-[325px] computer:min-h-[170px] computer:h-[170px] flex flex-col w-[345px] computer:w-full justify-between computer:py-6 py-10"
    >
      <div className="flex flex-row computer:justify-between computer:mb-0 mb-6 justify-center">
        <Title order={2} className=" hidden computer:block">
          Configurations for
        </Title>

        {title && <div className="flex text-black text-[24px] font-bold items-center">: <input type="text" className=" ml-1 w-fit min-w-[200px] outline-none font-bold text-black text-[24px] placeholder:font-bold placeholder:text-black placeholder:text-[24px]" placeholder={title} onChange={(e)=>{
          setTitle(e.target.value)
        }} /></div>}


      </div>
      <div className="flex flex-col items-center computer:flex-row justify-between">
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
            <Slider
              min={0}
              max={userData.length}
              onChange={setSliderValue}
              value={sliderValue}
              label={null}
              className="w-[60%]"
              color="dark"
            />
            <Button
              onClick={() => {
                handleTeamCountChange(sliderValue);
              }}
              className="uppercase"
              compact
              type="primary"
              color="dark"
            >
              Set
            </Button>
          </div>
        </div>

        <div className="h-full w-full  justify-between computer:w-fit flex mt-6 computer:mt-0 computer:justify-center items-center">
          {groupType !== "NOTINITIALIZEDYET" && (
            <SegmentedControl
              className="h-fit"
              value={groupType}
              onChange={setValue}
              data={[
                { label: "Tsogt", value: "Tsogt" },
                { label: "Greedy", value: "Greedy" },
                { label: "Gender", value: "Gender" },
              ]}
            />
          )}

          <div className="h-full w-fit flex justify-center computer:ml-8 items-center">
            <Button
              type="primary "
              compact
              className="uppercase"
              color={active ? "dark" : "gray"}
              onClick={() => {
                if (active) {
                  setActive(false);
                } else {
                  setActive(true);
                }
              }}
            >
              group
            </Button>
          </div>
        </div>
        <div className="h-full w-fit flex justify-center items-center mt-6 computer:mt-0">
          <Button
            onClick={() => {
              handleReset();
            }}
            type="primary"
            compact
            color="red"
            className="uppercase"
          >
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};
