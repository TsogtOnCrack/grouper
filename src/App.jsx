// import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { Person } from "./components/Person";
import { Team } from "./components/Team";
import { Switch } from "./components/Switch";
import { NumberInput } from "./components/NumberInput";
import { tsogtAlgorithm } from "./utils/tsogtAlgorith";
import { greedyAlgorithm } from "./utils/greedyAlgorithm";
import { greedyWithGender } from "./utils/greedyWithGender";
import logo from "./logo.svg";
import { Error } from "./components/Error";
import {
  Card,
  Button,
  Text,
  Title,
  Group,
  Grid,
  Badge,
  Slider,
} from "@mantine/core";
import { People } from "./components/People";
import { Configurations } from "./components/Configurations";
import { useHover } from "@mantine/hooks";

//
//
//

const DATA = [
  { name: "Tsogt", skill: 42, team: -1, gender: "F" },
  { name: "Tsogt2", skill: 69, team: -1, gender: "M" },
  { name: "Tsogt3", skill: 42, team: -1, gender: "F" },
  { name: "Tsogt4", skill: 42, team: -1, gender: "F" },
  
];
const INITIAL_TEAM_COUNT = 4;

const INITIAL_TITLE = "Grouper";

//
//
//

function App() {
  const [userData, setUserData] = useState([]);
  const [teamData, setTeamData] = useState({});
  const [groupType, setGroupType] = useState("NOTINITIALIZEDYET");
  const [groupActive, setGroupActive] = useState("NOTINITIALIZEDYET");
  const [error, setError] = useState();

  const initializeData = () => {
    localStorage.clear();

    localStorage.setItem("DATA", JSON.stringify([...DATA]));
    setUserData([...DATA]);

    const newTeamData = makeEmptyTeam(INITIAL_TEAM_COUNT);
    localStorage.setItem(
      "TEAM_DATA",
      JSON.stringify({ count: INITIAL_TEAM_COUNT, list: [...newTeamData] })
    );
    setTeamData({ count: INITIAL_TEAM_COUNT, list: [...newTeamData] });
    localStorage.setItem("GROUP_ACTIVE", JSON.stringify(false));
    localStorage.setItem("GROUP_TYPE", "Tsogt");

    localStorage.setItem("TITLE", INITIAL_TITLE);

    window.location.reload(false);
  };
  const makeEmptyTeam = (groupCount) => {
    let arr = [];
    for (let i = 0; i < groupCount; i++) {
      arr.push({ id: i + 1, members: [] });
    }
    return arr;
  };
  const clearTeamStatus = (c) => {
    const newPeople = [...userData];
    newPeople.map((person) => {
      person.team = -1;
    });
    setUserData(newPeople);

    setTeamData({
      count: c,
      list: makeEmptyTeam(c),
    });
  };
  const applyAlgorithmToTeams = (type, count, list, override = false) => {
    if (override) {
      return;
    }
    if (!groupActive) {
      return;
    }

    let groupedList = [];
    if (type === "Greedy") {
      groupedList = greedyAlgorithm(count, list);
    }
    if (type === "Gender") {
      groupedList = greedyWithGender(count, list);
    }
    if (type === "Tsogt") {
      groupedList = tsogtAlgorithm(count, list);
    }

    const newTeamDataList = [...teamData.list];
    const newUserData = [...userData];

    groupedList.map((el, i) => {
      newTeamDataList[i] = { id: i + 1, members: el };

      //update the users
      el.map((e) => {
        const target = newUserData.find((a) => a.name == e);
        target.team = i + 1;
      });
    });

    setTeamData({
      count: teamData.count,
      list: newTeamDataList,
    });
  };
  const addUser = (users, newUser) =>{
    const newUsers = [...users]
    newUsers.push(newUser)
    return newUsers
  }

  useEffect(() => {
    if (!localStorage.getItem("DATA")) {
      initializeData();
    }
    // initializeData();
    setUserData(JSON.parse(localStorage.getItem("DATA")));
    setTeamData(JSON.parse(localStorage.getItem("TEAM_DATA")));
    setGroupActive(JSON.parse(localStorage.getItem("GROUP_ACTIVE")));
    setGroupType(localStorage.getItem("GROUP_TYPE"));
    document.title = localStorage.getItem("TITLE");
  }, []);

  useEffect(() => {
    if (userData[0] !== undefined) {
      localStorage.setItem("DATA", JSON.stringify(userData));
    } else {
      console.log("ERROR: empty data");
    }

    if (teamData.list && groupActive) {
      applyAlgorithmToTeams(groupType, teamData.count, userData);
    }
  }, [userData]);
  useEffect(() => {
    if (teamData.list) {
      localStorage.setItem("TEAM_DATA", JSON.stringify(teamData));
    } else {
      console.log("ERROR: No teamdata");
    }
  }, [teamData]);
  useEffect(() => {
    if (teamData.list) {
      applyAlgorithmToTeams(groupType, teamData.count, userData);
    } else {
      console.log("ERROR: No teamdata");
    }
  }, [teamData.count]);
  useEffect(() => {
    if (groupType !== "NOTINITIALIZEDYET") {
      localStorage.setItem("GROUP_TYPE", groupType);
    }
    if (teamData.list) {
      applyAlgorithmToTeams(groupType, teamData.count, userData);
    }
  }, [groupType]);
  useEffect(() => {
    if (groupActive !== "NOTINITIALIZEDYET") {
      localStorage.setItem("GROUP_ACTIVE", JSON.stringify(groupActive));
    }
    if (teamData.list) {
      applyAlgorithmToTeams(groupType, teamData.count, userData);
    }
  }, [groupActive]);

  const handleSliderChange = (response) => {
    const nextData = [...userData];
    const targetPerson = nextData.find((a) => a.name === response.name);
    targetPerson.skill = response.skill;
    setUserData(nextData);
  };
  const handleSwitchChange = (response) => {
    setGroupType(response);
  };
  const handleSet = (response) => {
    if (response === 0) {
      setTeamData({
        count: 1,
        list: makeEmptyTeam(1),
      });
      return;
    }
    if (response === teamData.count) {
      return;
    }

    setTeamData({
      count: response,
      list: makeEmptyTeam(response),
    });

    if (!groupActive) {
      clearTeamStatus(response);
    }
  };
  const handleTeamSwitch = (teamId, personId) => {
    if (teamId === "none") {
      return;
    }
    setGroupActive(false);

    const newTeamArangement = [...teamData.list];

    for (let i = 1; i < newTeamArangement.length + 1; i++) {
      if (teamId === i) {
        newTeamArangement[i - 1].members.push(personId);
      }
    }

    setTeamData({
      count: teamData.count,
      list: newTeamArangement,
    });

    const newUserData = [...userData];
    const target = newUserData.find((a) => a.name === personId);
    target.team = teamId;

    setUserData(newUserData);
  };
  const handleKickFromTeam = (id) => {
    setGroupActive(false);

    console.log(id);
    const newTeamArangement = [...teamData.list];
    for (let i = 0; i < newTeamArangement.length; i++) {
      for (let j = 0; j < newTeamArangement[i].members.length; j++) {
        if (newTeamArangement[i].members[j] === id) {
          newTeamArangement[i].members.splice(j, 1);
        }
      }
    }

    setTeamData({
      count: teamData.count,
      list: newTeamArangement,
    });

    const newChangedUserData = [...userData];
    const target = newChangedUserData.find((a) => a.name === id);
    target.team = -1;

    setUserData(newChangedUserData);
  };
  const handleUpdateToGender = (currentGender, personId) => {
    const newPersonData = [...userData];
    const targetPerson = newPersonData.find((a) => a.name === personId);

    if (currentGender == "F") {
      targetPerson.gender = "M";
    }
    if (currentGender == "M") {
      targetPerson.gender = "F";
    }

    console.log(
      "Just set",
      personId,
      "from",
      currentGender,
      "to",
      targetPerson.gender
    );

    setUserData(newPersonData);
  };
  const handleUpdateToName = (event, personId) => {
    const newPersonData = [...userData];
    const targetPerson = newPersonData.find((a) => a.name === personId);

    targetPerson.name = event.target.value;
    setUserData(newPersonData);
  };
  const { hovered, ref } = useHover();

  return (
    <div className="flex flex-row w-screen h-screen justify-center ">
      <div className="w-full h-fit max-w-[1175px] flex flex-row justify-between pt-5">
        <People
          userData={userData}
          handleChange={handleSliderChange}
          handleGenderChange={handleUpdateToGender}
          teamData = {teamData}
          handleTeamChange = {handleTeamSwitch}
          addUser = {(response)=>{
            setUserData(addUser(userData, response))
          }}
        />

        <div className="flex flex-col w-[65%]">
          <Configurations
            handleChange={handleSwitchChange}
            userData={userData}
            handleTeamCountChange={handleSet}
            active={groupActive}
            setActive={setGroupActive}
            handleReset = {initializeData}
            groupType = {groupType}
          />
          <Card className="mt-5">
            <Title order={2}>Teams</Title>
          </Card>
          <div className="w-full flex flex-wrap">
            {teamData.list &&
              teamData.list.map((el) => {
                return (
                  <Card
                    withBorder
                    radius={"md"}
                    className=" shadow-md w-[240px] min-h-[240px] mr-3 mb-3"
                  >
                    <div className="flex flex-row justify-between mb-3">
                      <Title order={4}>Team #{el.id}</Title>
                      <Title order={4}>
                        :
                        {el.members.reduce(
                          (sum, el) =>
                            (sum =
                              sum +
                              Number(
                                userData.find((a) => a.name === el).skill
                              )),
                          0
                        )}
                      </Title>
                    </div>
                    <div className="flex flex-col">
                      {el.members &&
                        el.members.map((member) => {
                          const targetPerson = userData.find(
                            (a) => a.name === member
                          );
                          return (
                            <div className="flex flex-row w-full justify-between my-1">
                              <Title order={5} className=" font-normal">
                                {member}
                              </Title>
                              <div>
                                <Badge
                                  onClick={()=>{handleKickFromTeam(member)}}
                                  className=" cursor-pointer"
                                  variant={"dot"}
                                  color={
                                    targetPerson.gender == "F" ? "red" : "blue"
                                  }
                                >
                                  {targetPerson.skill}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
