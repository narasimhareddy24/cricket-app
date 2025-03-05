import React from "react";
import { useState } from "react";
import { Autocomplete, Button } from "@mantine/core";
import "./homestyles.css";
import teamdata from "../data/teamData.json";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import teamData from "../data/teamData.json";
import fetchMatches from "../API/api.js";

function Home() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);
  // console.log(teamdata.teams[0].team_name);
  // console.log(teamdata.teams[1].team_name);
  // console.log(teamdata);
  // console.log(teamdata.venue)
  // console.log(teamdata.umpire[1].name)
  console.log(teamdata.venue)
  console.log(teamdata.teams)
  function getTeamnames() {
    let teamName = []
    teamdata.teams.forEach((team, _index) => {
      // console.log(team.team_name,"insidefunction");
      teamName.push(team.team_name);
    });
    // console.log(teamName,"outsideloop");
    return teamName

  }

  function getUmpirenames() {
    let umpirenames = []
    teamdata.umpire.forEach((umpire, _index) => {
      umpirenames.push(umpire.name);
    });
    console.log(umpirenames)
    return umpirenames


  }
  function getPlayerdetails(team_name) {
    const playerdetails = teamdata.teams.filter((team) => team.team_name === team_name);
    console.log(playerdetails)

    return playerdetails[0].players


  }
  function getPlayersage(playersdetails) {
    const playersage = playersdetails.filter((player) => player.age > 30);
    console.log(playersage)
    return playersage
  }

  const playersdetails = getPlayerdetails("India");
  console.log(playersdetails)

  const playerdetailsbyage = getPlayersage(playersdetails);
  console.log(playerdetailsbyage)





  const teamName = getTeamnames();
  console.log(teamName)
  const umpirenames = getUmpirenames();
  console.log(umpirenames)


  function getVenuedetails() {
    const venuedetails = teamdata.venue;

    console.log(venuedetails)
    return venuedetails


  }
  async function handlefetch() {
    const data = await fetchMatches();
    console.log("Fetched Matches:", data);
  }


  const handlePlayerDetails = () => {
    if (value.trim() !== "") {
      navigate(`/playerDetails/${value}`);
    } else {
      alert("Please select a team!");
    }
  };

  return (

    <div className="home-container">
      <Modal opened={opened} onClose={close} title="Match" centered>
        <div> {getTeamnames()[0]} vs {getTeamnames()[1]}</div>
        <div>{getUmpirenames()[0]} and {getUmpirenames()[1]}</div>
        <div>{getVenuedetails()}</div>

      </Modal>
      <Autocomplete
        label="Your favorite team"
        placeholder="Pick your favourite team"
        data={teamData.teams.map((team) => team.team_name)}
        clearable={true}
        value={value} onChange={setValue}
      />
      <Button className="submit-button" variant="filled" onClick={handlePlayerDetails}>
        Submit
      </Button>
      <Button className="submit-button" variant="filled"
        onClick={open}>View details</Button>

      <Button className="submit-button" variant="filled" onClick={handlefetch}>
        Fetch Matches
      </Button>
    </div>
  );

}

export default Home;