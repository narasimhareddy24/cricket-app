import React from "react";
import { useParams } from "react-router-dom";
import teamData from "../data/teamData.json";
import { Table, Tabs } from "@mantine/core";
import "../styles/playerDetails.css";

function PlayerDetails() {
  const { teamName } = useParams();
  const team = teamData.teams.find((t) => t.team_name === teamName);

  if (!team) {
    return <h2>Team not found!</h2>;
  }

  // Players Table
  const playerRows = team.players.map((player, index) => (
    <Table.Tr key={player.name}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{player.name}</Table.Td>
      <Table.Td>{player.age}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="container">
      <h1>{team.team_name} Players</h1>

      {/* Tabs Component */}
      <Tabs defaultValue="players">
        <Tabs.List>
          <Tabs.Tab value="players">Players</Tabs.Tab>
          <Tabs.Tab value="match-info">Match Info</Tabs.Tab>
          <Tabs.Tab value="scorecard">Scorecard</Tabs.Tab>
        </Tabs.List>

        {/* Players Tab */}
        <Tabs.Panel value="players">
          <Table striped highlightOnHover border={1} withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>S.NO</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Age</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{playerRows}</Table.Tbody>
          </Table>
        </Tabs.Panel>

        {/* Match Info Tab */}
        <Tabs.Panel value="match-info">
          <h2>Upcoming Matches</h2>
          {/* Fetch and display match info here */}
        </Tabs.Panel>

        {/* Scorecard Tab */}
        <Tabs.Panel value="scorecard">
          <h2>Scorecard</h2>
          {/* Fetch and display scorecard details here */}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default PlayerDetails;
