import React, { useEffect, useState } from "react";
import "../styles/scorecard.css";
import BatsmenDetails from "../components/Batsmendetails";
import BowlersDetails from "../components/BowlersDetails";
import { useParams } from 'react-router-dom';
import { Tabs, Grid, Table } from "@mantine/core";


function Scorecard() {
    const [scorecard, setScorecard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { matchId } = useParams();

    useEffect(() => {
        const fetchScorecard = async () => {
            const url = `${import.meta.env.VITE_API_URL}/mcenter/v1/${matchId}/hscard`;
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
                    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
                },
            };

            try {
                console.log("Fetching scorecard for matchId:", matchId)
                console.log("Fetching from:", url);
                const response = await fetch(url, options);

                console.log("Response Status:", response.status);
                console.log("Response Headers:", response.headers);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const scorecarddata = await response.json();
                console.log("Raw Response Data:", scorecarddata);

                setScorecard(scorecarddata);

            } catch (error) {
                console.error("Error fetching scorecard:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScorecard();
    }, [matchId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log(scorecard)
    return (

        <div className="scorecard-container">

            <Tabs radius="lg" defaultValue="match-info">
                <Tabs.List>
                    <Tabs.Tab value="match-info">Match Info</Tabs.Tab>
                    <Tabs.Tab value="scorecard">Scorecard</Tabs.Tab>
                </Tabs.List>


                <Tabs.Panel value="match-info">
                <Grid gutter="lg" className="match-info-panel">
  <Grid.Col span={{ base: 12, sm: 12, md: 12 }} className="info-row">
    <Grid>
      <Grid.Col span={{ base: 12, sm: 4, md: 4 }}>
        <div className="match-label">Match</div>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8, md: 8 }}>
        <div className="match-details">
          {scorecard?.scoreCard[0]?.batTeamDetails?.batTeamShortName} vs
          {scorecard?.scoreCard[0]?.bowlTeamDetails?.bowlTeamShortName},
          {scorecard?.matchHeader?.matchDescription},
          {scorecard?.matchHeader?.seriesDesc}
        </div>
      </Grid.Col>
    </Grid>
  </Grid.Col>

  <Grid.Col span={{ base: 12, sm: 12, md: 12 }} className="info-row">
    <Grid>
      <Grid.Col span={{ base: 12, sm: 4, md: 4 }}>
        <div className="toss-label">Toss</div>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8, md: 8 }}>
        <div className="toss-details">
          {scorecard?.matchHeader?.tossResults?.tossWinnerName} won the toss.
        </div>
      </Grid.Col>
    </Grid>
  </Grid.Col>
</Grid>
                </Tabs.Panel>

                <Tabs.Panel value="scorecard">
                    <div className="status-container">{scorecard?.matchHeader?.status}</div>
                    <div className="head-container">
                        {scorecard?.scoreCard?.length > 0 && (
                            <>
                                <div>{scorecard?.scoreCard[0]?.batTeamDetails?.batTeamName}</div>
                                <div>{scorecard?.scoreCard[0]?.scoreDetails?.runs}{"-"}{scorecard?.scoreCard[0]?.scoreDetails?.wickets}</div>
                            </>
                        )}
                    </div>

                    <BatsmenDetails batsmen={scorecard?.scoreCard[0]?.batTeamDetails?.batsmenData} />
                    <BowlersDetails bowler={scorecard?.scoreCard[0]?.bowlTeamDetails?.bowlersData} />
                    <div>
                        <div className="wickets-container">
                            <strong> Fall of wickets </strong> </div>
                        <div style={{
                            display: "flex",
                            alignitems: "start",
                            justifycontent: "flex-start"
                        }}>
                          {scorecard?.scoreCard[0]?.wicketsData
                                ? Object.values(scorecard.scoreCard[0].wicketsData)
                                    .map((wicket) => `${wicket.wktRuns}/${wicket.wktNbr}`)
                                    .join(", ")
                                : "No wickets data available for the first innings"}
                        </div>

                    </div>
                    <div className="head-container">
                        {scorecard?.scoreCard?.length > 1 && (
                            <>
                                <div>{scorecard?.scoreCard[1]?.batTeamDetails?.batTeamName}</div>
                                <div>{scorecard?.scoreCard[1]?.scoreDetails?.runs}{"-"}{scorecard?.scoreCard[1]?.scoreDetails?.wickets}</div>
                            </>
                        )}
                    </div>

                    <BatsmenDetails batsmen={scorecard?.scoreCard[1]?.batTeamDetails?.batsmenData} />
                    <BowlersDetails bowler={scorecard?.scoreCard[1]?.bowlTeamDetails?.bowlersData} />

                    <div className="wickets-container">
                        <strong>Fall of wickets:</strong></div>
                    <div style={{
                        display: "flex",
                        alignitems: "start",
                        justifycontent: "flex-start"
                    }}>   {scorecard?.scoreCard[1]?.wicketsData
                        ? Object.values(scorecard.scoreCard[1].wicketsData)
                            .map((wicket) => `${wicket.wktRuns}/${wicket.wktNbr}`)
                            .join(", ")
                        : "No wickets data available for the first innings"}
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}

export default Scorecard;


{/* <div className="match-container">
                        <div>Match </div>
                        <div>
                            {scorecard?.matchHeader?.matchDescription},
                            {scorecard?.scoreCard[0]?.batTeamDetails?.batTeamShortName} vs {scorecard?.scoreCard[0]?.bowlTeamDetails?.bowlTeamShortName},
                            {scorecard?.matchHeader?.seriesDesc}
                        </div>
                    </div>

                    <div className="toss-container">
                        <div>Toss </div>
                        <div>{scorecard?.matchHeader?.tossResults?.tossWinnerName} won the toss</div>
                    </div> */}
