import React from "react";
import { useParams } from "react-router-dom";
import teamData from "../data/teamData.json";
import { Card, Text } from "@mantine/core";

function TeamDetails() {
  const { teamName } = useParams();

  const team = teamData.teams.find((t) => t.team_name === teamName);

  if (!team) return <h2>Team not found!</h2>;

  return (
    <div>
      <h1>{team.team_name} Players</h1>
      {team.players.map((player) => (
        <Card key={player.name} shadow="sm" padding="lg" radius="md" withBorder>
          <Text>Name: {player.name}</Text>
          <Text>Age: {player.age}</Text>
        </Card>
      ))}
    </div>
  );
}

export default TeamDetails;
