import React from "react";
import { useParams } from "react-router-dom";
import teamData from "../data/teamData.json";
import { Table } from "@mantine/core";

function PlayerDetails() {
  const { teamName } = useParams();

  const team = teamData.teams.find((t) => t.team_name === teamName);

  if (!team) {
    return <h2>Team not found!</h2>;
  }

  const rows = team.players.map((player, index) => (
    <Table.Tr key={player.name}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{player.name}</Table.Td>
      <Table.Td>{player.age}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="container">
      <h1>{team.team_name} Players</h1>
      <Table striped highlightOnHover border={1} withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>S.NO</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Age</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        
      </Table>
    </div>
  );
}

export default PlayerDetails;
