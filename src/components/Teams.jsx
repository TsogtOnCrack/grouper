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

export const Teams = ({teamData, userData, kickFromTeam}) =>{

    return <div className="w-fit"> <Card className="mt-5 bg-transparent w-fit">
    <Title order={2}>Teams</Title>
  </Card>
  <div className="w-fit flex flex-wrap flex-row justify-center computer:justify-start">
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
                {el.members.reduce((sum, el) =>(sum =sum + Number(userData.find((a) => a.name === el) ? userData.find((a) => a.name === el).skill : 0) ),0)}
              </Title>
            </div>
            <div className="flex flex-col">
              {el.members &&
                el.members.map((member) => {
                  const targetPerson = userData.find(
                    (a) => a.name === member
                  );
                  return (
                    targetPerson && <div className="flex flex-row w-full justify-between my-1">
                      <Title order={5} className=" font-normal">
                        {member}
                      </Title>
                      <div>
                        <Badge
                          onClick={() => {
                            kickFromTeam(member);
                          }}
                          className=" cursor-pointer"
                          variant={"dot"}
                          color={
                            targetPerson.gender && targetPerson.gender == "F" ? "red" : "blue"
                          }
                        >
                          {targetPerson.skill && targetPerson.skill}
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
}