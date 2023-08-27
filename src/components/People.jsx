import {
  Card,
  Button,
  Text,
  Title,
  Group,
  Grid,
  Badge,
  Slider,
  Select,
} from "@mantine/core";
import { useState } from "react";

export const People = ({
  userData,
  teamData,
  handleChange,
  handleGenderChange,
  handleTeamChange,
  addUser,
}) => {
  const arr = [];
  if (teamData.list) {
    teamData.list.map((team) => {
      arr.push(String(team.id));
    });
  }

  const [value, setValue] = useState(1);

  return (
    <Card
      withBorder
      radius={"md"}
      className="w-[350px] h-[95vh] shadow-md overflow-y-scroll"
    >
      <div className="w-full flex flex-row justify-between items-center mt-2 px-2">
        <Title order={2}>People</Title>

        <div className="flex flex-row items-center">
          <Title order={2} className="mr-4">
            :{userData.length}
          </Title>
          <Button onClick={()=>{
            addUser({name: "Tsogtaaa", skill: 23, team: -1, gender: "F"})
          }} type="primary" color="dark">
            Add
          </Button>
        </div>
      </div>

      <Grid className="mt-8">
        {userData[0] &&
          userData.map((el) => {
            return (
              <Grid.Col className=" my-2 flex flex-col" span={12}>
                {el.team !== -1 && (
                  <Card withBorder radius={"md"} className=" shadow-md">
                    <div className="flex flex-row justify-between items-center">
                      <Title order={4} className=" font-medium">
                        {el.name}
                      </Title>
                      {/* 







                 */}
                      <Badge
                        color={el.gender == "F" ? "red" : "blue"}
                        className="uppercase cursor-pointer"
                        variant="dot"
                        onClick={() => {
                          handleGenderChange(el.gender, el.name);
                        }}
                      >
                        {el.gender == "F" ? "Fmail" : "Male"}
                      </Badge>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <Slider
                        label={null}
                        className="w-[50%]"
                        color="dark"
                        value={el.skill}
                        onChange={(newValue) => {
                          handleChange({ name: el.name, skill: newValue });
                        }}
                      />
                      <Title order={3} className=" font-extralight">
                        :{el.skill}
                      </Title>
                    </div>
                  </Card>
                )}

                {el.team === -1 && teamData.list && (
                  <Card className="bg-[#25262B] h-fit overflow-visible">
                    <Select
                      className=" text-white"
                      value={value}
                      onChange={(newTeam) => {
                        setValue(newTeam);
                        handleTeamChange(Number(newTeam), el.name)
                      }}
                      data={[...arr]}
                    />
                  </Card>
                )}
              </Grid.Col>
            );
          })}
      </Grid>
    </Card>
  );
};
