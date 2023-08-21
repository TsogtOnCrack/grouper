import logo from "./logo.svg";
import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { Person } from "./components/Person";
import { Team } from "./components/Team";
import { Switch } from "./components/Switch";
import { NumberInput } from "./components/NumberInput";
import { tsogtAlgorithm } from "./utils/tsogtAlgorith";
import { greedyAlgorithm } from "./utils/greedyAlgorithm";
import { Error } from "./components/Error";

const DATA = [
  { name: "Tsogt", skill: 42, team: -1 },
  { name: "Tsogt2", skill: 69, team: -1 },
  { name: "Tsogt3", skill: 42, team: -1 },
  { name: "Tsogt4", skill: 42, team: -1 },
  { name: "Tsogt5", skill: 69, team: -1 },
  { name: "Tsogt6", skill: 69, team: -1 },
];
const INITIAL_TEAM_COUNT = 4;

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

    window.location.reload(false);
  };
  const makeEmptyTeam = (groupCount) => {
    let arr = [];
    for (let i = 0; i < groupCount; i++) {
      arr.push({ id: i + 1, members: [] });
    }
    return arr;
  };
  const applyAlgorithmToTeams = (type, count, list, override = false) => {
    if(override){
      return
    }
    if (!groupActive) {
      return;
    }

    let groupedList = [];
    if (type === "Greedy") {
      groupedList = greedyAlgorithm(count, list);
    }
    if (type === "Tsogt") {
      groupedList = tsogtAlgorithm(count, list);
    }

    const newTeamDataList = [...teamData.list];
    const newUserData = [...userData]

    groupedList.map((el, i) => {
      newTeamDataList[i] = { id: i + 1, members: el };

      //update the users
      el.map((e)=>{
        const target = newUserData.find((a)=> a.name == e)
        target.team = i+1
      })
    });

    if (groupActive){
      setUserData(newUserData)
    }
    

    setTeamData({
      count: teamData.count,
      list: newTeamDataList,
    });
  };

  useEffect(() => {
    // initializeData()
    setUserData(JSON.parse(localStorage.getItem("DATA")));
    setTeamData(JSON.parse(localStorage.getItem("TEAM_DATA")));
    setGroupActive(JSON.parse(localStorage.getItem("GROUP_ACTIVE")));
    setGroupType(localStorage.getItem("GROUP_TYPE"));
  }, []);

  useEffect(() => {
    if (userData[0] !== undefined) {
      localStorage.setItem("DATA", JSON.stringify(userData));
    } else {
      console.log("ERROR: empty data");
    }

    if (teamData.list) {
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
    if (Number(response) > userData.length) {
      setError(
        `Too many teams! You don't have enough people to go into your teams. The maximum ammount of teams you can have is: ${userData.length}`
      );
      setTeamData({
        count: userData.length,
        list: makeEmptyTeam(userData.length),
      });
      return;
    }

    if (Number(response < 0)) {
      setError(
        "Too little teams! You don't have enough teams for your people. The minimum ammount of teams you can have is: 0"
      );
      setTeamData({ count: 0, list: makeEmptyTeam(0) });
      return;
    }

    setTeamData({
      count: response,
      list: makeEmptyTeam(response),
    });
  };
  const handleTeamSwitch = (teamId, personId) => {
    setGroupActive(false);

    const newTeamArangement = [...teamData.list];

    for (let i = 1; i < newTeamArangement.length + 1; i++) {
      if (teamId === i) {
        newTeamArangement[i-1].members.push(personId);
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

  return (
    <div className="flex flex-col w-screen h-screen bg-slate-100 overflow-clip">
      {error && (
        <Error
          handleSubmit={() => {
            setError();
          }}
        >
          {error}
        </Error>
      )}
      <div className="flex flex-row justify-center mt-12">
        <div className="flex flex-col ">
          <div className="flex flex-row h-[30px] w-[420px] items-center justify-between mx-12 px-12">
            <div className="flex flex-row">
              Group:
              <div
                onClick={() => {
                  if (groupActive) {
                    setGroupActive(false);
                  } else {
                    setGroupActive(true);
                  }
                }}
                className={` duration-300 cursor-pointer rounded-md mr-8 px-2 py-1 flex items-center justify-center  mx-2 text-[14px] ${
                  groupActive
                    ? " bg-green-500 hover:bg-green-400"
                    : "bg-red-500 hover:bg-red-400"
                }`}
              >
                {groupActive ? "Active" : "NotActive"}
              </div>
            </div>
            <div className="flex flex-row items-center">
              {groupType !== "NOTINITIALIZEDYET" && (
                <Switch
                  initialValue={groupType}
                  handleChange={handleSwitchChange}
                />
              )}

              <p className="ml-3 min-w-[70px]">{groupType}</p>
            </div>
          </div>

          <div className="flex flex-col border-[2px] border-black w-fit p-12 m-12 rounded-lg h-[75vh] overflow-y-scroll">
            {userData.map((el, i) => {
              return (
                <Person
                  teams={teamData}
                  data={el}
                  handleChange={handleSliderChange}
                  handleChangeTeam={handleTeamSwitch}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          <div className=" h-[30px] flex flex-row justify-between w-[800px] mx-12 px-12">
            <div className="flex flex-row items">
              <NumberInput
                initialValue={teamData.count}
                handleSubmit={handleSet}
              />
              <p className="h-full flex items-center justify-center ml-4 border-b-2 border-black min-w-[20px]">
                {teamData.count}
              </p>
            </div>
            <button
              className="text-[14px] bg-red-500 hover:bg-red-600 duration-300  py-1 px-2 text-white rounded-md"
              onClick={() => {
                initializeData();
              }}
            >
              RESET
            </button>
          </div>

          <div className=" w-[800px] h-[75vh] p-12 m-12 rounded-lg border-[2px] border-black flex flex-wrap overflow-y-scroll">
            {teamData.list &&
              teamData.list.map((el, i) => {
                return (
                  <Team
                    userData={userData}
                    data={el}
                    handleDelete={handleKickFromTeam}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
