// import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { Person } from "./components/Person";
import { Team } from "./components/Team";
import { Switch } from "./components/Switch";
import { Teams } from "./components/Teams";
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
  // { name: "Person1", skill: 42, team: -1, gender: "F" },
  // { name: "Person2", skill: 69, team: -1, gender: "M" },
  // { name: "Person3", skill: 42, team: -1, gender: "F" },
  // { name: "Person4", skill: 42, team: -1, gender: "F" },
];
const INITIAL_TEAM_COUNT = 1;

const INITIAL_TITLE = "PROJECT NAME";

//
//
//

function App() {
  const [userData, setUserData] = useState([]);
  const [teamData, setTeamData] = useState({});
  const [groupType, setGroupType] = useState("NOTINITIALIZEDYET");
  const [groupActive, setGroupActive] = useState("NOTINITIALIZEDYET");
  const [title, setTitle] = useState()

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

  useEffect(() => {
    if (!localStorage.getItem("DATA")) {
      initializeData();
    }

    setUserData(JSON.parse(localStorage.getItem("DATA")));
    setTeamData(JSON.parse(localStorage.getItem("TEAM_DATA")));
    setGroupActive(JSON.parse(localStorage.getItem("GROUP_ACTIVE")));
    setGroupType(localStorage.getItem("GROUP_TYPE"));
    setTitle(localStorage.getItem("TITLE"))
  }, []);

  useEffect(()=>{
    if(title){
      localStorage.setItem("TITLE", title)
    }
    
    window.document.title = title
  },[title])

  useEffect(() => {
    console.log("got here", userData);
    if (userData[0] !== undefined) {
      localStorage.setItem("DATA", JSON.stringify(userData));
    } else {
      console.log("ERROR: empty data");
    }

    if (userData[0]) {
      localStorage.setItem("DATA", JSON.stringify(userData));
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
  const handleAddUser = (n, s, g) => {
    var newUserData = [...userData];
    newUserData = [{ name: n, skill: s, team: -1, gender: g }, ...newUserData];
    setUserData(newUserData);
  };
  const handleDeleteUser = (n) => {
    const newUserData = [...userData];
    const targetPerson = newUserData.find((person) => person.name == n);
    const index = newUserData.indexOf(targetPerson);
    newUserData.splice(index, 1);
    console.log(newUserData);
    setUserData([...newUserData]);
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
  const handleTitleChange = (newTitle) =>{

    setTitle(newTitle)
  
  }


  const { hovered, ref } = useHover();

  return (
    <div className="flex flex-row w-screen h-screen justify-center ">
      <div className=" computer:hidden tablet:items-start items-center flex flex-col tablet:flex-row h-fit pt-12 min-h-screen pb-5 justify-center px-4">
        <div className="flex flex-col items-center">
          <Configurations
            handleChange={handleSwitchChange}
            userData={userData}
            handleTeamCountChange={handleSet}
            active={groupActive}
            setActive={setGroupActive}
            handleReset={initializeData}
            groupType={groupType}
            setTitle = {handleTitleChange}
            title={title}
          />
          <div className="mt-4 h-full">
            <People
              userData={userData}
              handleChange={handleSliderChange}
              handleGenderChange={handleUpdateToGender}
              teamData={teamData}
              handleTeamChange={handleTeamSwitch}
              addUser={handleAddUser}
              deleteUser={handleDeleteUser}
            />
          </div>
        </div>
        <div className="tablet:ml-6">
          <Teams
            userData={userData}
            teamData={teamData}
            kickFromTeam={handleKickFromTeam}
          />
        </div>
      </div>

      <div className="computer:flex hidden w-full h-fit max-w-[1175px] flex-col computer:flex-row justify-between pt-5">
        <People
          userData={userData}
          handleChange={handleSliderChange}
          handleGenderChange={handleUpdateToGender}
          teamData={teamData}
          handleTeamChange={handleTeamSwitch}
          addUser={handleAddUser}
          deleteUser={handleDeleteUser}
        />

        <div className=" visibleflex flex-col w-[65%]">
          <Configurations
            handleChange={handleSwitchChange}
            userData={userData}
            handleTeamCountChange={handleSet}
            active={groupActive}
            setActive={setGroupActive}
            handleReset={initializeData}
            groupType={groupType}
            title={title}
            setTitle = {handleTitleChange}
          />
          <Teams
            userData={userData}
            teamData={teamData}
            kickFromTeam={handleKickFromTeam}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
