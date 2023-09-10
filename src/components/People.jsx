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
  TextInput,
  NumberInput,
} from "@mantine/core";
import { useState } from "react";

export const People = ({
  userData,
  teamData,
  handleChange,
  handleGenderChange,
  handleTeamChange,
  addUser,
  deleteUser,
}) => {
  const arr = [];
  if (teamData.list) {
    teamData.list.map((team) => {
      arr.push(String(team.id));
    });
  }

  const [value, setValue] = useState(1);
  const [addActive, setAddActive] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [skill, setSkill] = useState(0);
  const [error, setError] = useState();
  const [genderError, setGenderError] = useState();
  const [skillError, setSkillError] = useState();

  return (
    <Card
      withBorder
      radius={"md"}
      className="w-[350px] h-[60vh] computer:h-[95vh] shadow-md overflow-y-scroll"
    >
      <div className="w-full flex flex-row justify-between items-center mt-2 px-2 mb-8 ">
        <Title order={2}>People</Title>

        <div className="flex flex-row items-center">
          <Title order={2} className="mr-4">
            :{userData.length}
          </Title>
          <Button
            onClick={() => {
              setAddActive(true);
            }}
            type="primary"
            color="dark"
          >
            Add
          </Button>
        </div>
      </div>

      {addActive && (
        <Card withBorder radius={"md"} className=" shadow-md mb-2 ">
          <Title order={5}>Create a new person</Title>
          <Title order={5} className=" font-light text-gray-500">
            Configure and set their tributes
          </Title>

          <TextInput
            label="Name"
            className="mt-4"
            radius={"md"}
            placeholder="enter person name"
            onChange={(e) => {
              setError(false);
              setName(e.currentTarget.value);
            }}
            error={error ? error : false}
          />
          <Select
            error={genderError ? genderError : false}
            data={["Male", "Female"]}
            placeholder="Select"
            label="Gender"
            className="mt-2"
            onChange={(value) => {
              setGenderError(false);

              if (value == "Male") {
                setGender("M");
              } else {
                setGender("F");
              }
            }}
          />
          <NumberInput
            error={skillError ? skillError : false}
            label="Skill"
            className="mt-2"
            radius={"md"}
            placeholder="Skill point"
            hideControls
            onChange={(value) => {
              setSkillError(false);

              setSkill(value);
            }}
          />

          <div className="w-full flex justify-between mt-6">
            <Button
              variant="outline"
              color="dark"
              compact
              onClick={() => {
                setAddActive(false);
              }}
            >
              cancel
            </Button>
            <Button
              color="dark"
              type="primary"
              compact
              onClick={() => {
                var canContinue = true;
                const samePerson = userData.find(
                  (person) => person.name === name
                );
                setError(false);
                setSkillError(false);
                setGenderError(false);
                if (samePerson) {
                  setError("Name already in use");
                  canContinue = false;
                }
                if (name == "") {
                  setError("Missing name");
                  canContinue = false;
                }
                if (skill == 0) {
                  setSkillError("Missing skill");
                  canContinue = false;
                }
                if (skill > 100) {
                  setSkillError("Skill can't be above 100");
                  canContinue = false;
                }
                if (skill < 0) {
                  setSkillError("Skill can't be below 0");
                  canContinue = false;
                }
                if (!gender) {
                  setGenderError("Pick a gender");
                  canContinue = false;
                }
                if (canContinue) {
                  addUser(name, skill, gender);
                  setAddActive(false);
                }
              }}
            >
              {" "}
              Add
            </Button>
          </div>
        </Card>
      )}

      <Grid className="mt-8">
        {userData[0] &&
          userData.map((el) => {
            return (
              <Grid.Col className=" my-2 flex flex-col" span={12}>
                {el.team !== -1 && (
                  <Card withBorder radius={"md"} className=" shadow-md">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center max-w-[60%]">
                        <Title order={4} className=" font-medium truncate">
                          {el.name}
                        </Title>
                        <div
                          className="w-5 h-5 bg-[#E66358] ml-2 cursor-pointer text-white flex justify-center items-center hover:bg-[#DC5346] rounded-full"
                          onClick={() => {
                            deleteUser(el.name);
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.0962 1.70709L9.38908 0L5.54808 3.841L1.70712 3.05176e-05L1.52588e-05 1.70712L3.84099 5.5481L0 9.38907L1.70711 11.0962L5.5481 7.25519L9.3891 11.0962L11.0962 9.3891L7.25519 5.5481L11.0962 1.70709Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-row items-center w-[53%] justify-between text-ellipsis">
                        {/* <Button
                          compact
                          color="red"
                          type="primary"
                          className="mr-2"
                        >
                          delete
                        </Button> */}

                        <Badge
                          color={el.gender == "F" ? "red" : "blue"}
                          className="uppercase cursor-pointer"
                          variant="dot"
                          onClick={() => {
                            handleGenderChange(el.gender, el.name);
                          }}
                        >
                          {el.gender == "F" ? "Fmale" : "Male"}
                        </Badge>
                      </div>
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
                        handleTeamChange(Number(newTeam), el.name);
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
