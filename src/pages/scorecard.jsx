import React, { useEffect, useState } from "react";
import "../styles/scorecard.css";
import BatsmenDetails from "../components/Batsmendetails";
import BowlersDetails from "../components/BowlersDetails";

function Scorecard() {
    const [scorecard, setScorecard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScorecard = async () => {
            const url = `${import.meta.env.VITE_API_URL}/mcenter/v1/40381/hscard`;
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
                    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
                },
            };

            try {
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
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log(scorecard)
    return (
        <div className="scorecard-container">
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


            <div className="wickets-container">
                Fall of wickets:

            </div>
            <div>
                {scorecard?.scoreCard[0]?.wicketsData
                    ? Object.values(scorecard.scoreCard[0].wicketsData)
                        .map((wicket) => `${wicket.wktRuns}/${wicket.wktNbr}`)
                        .join(", ")
                    : "No wickets data available"}
            </div>

            <div className="head-container">
                {scorecard?.scoreCard?.length > 0 && (
                    <>
                        <div>{scorecard?.scoreCard[1]?.batTeamDetails?.batTeamName}</div>
                        <div>{scorecard?.scoreCard[1]?.scoreDetails?.runs}{"-"}{scorecard?.scoreCard[1]?.scoreDetails?.wickets}</div>
                    </>
                )}

            </div>

            <BatsmenDetails batsmen={scorecard?.scoreCard[1]?.batTeamDetails?.batsmenData} />
            <BowlersDetails bowler={scorecard?.scoreCard[0]?.bowlTeamDetails?.bowlersData} />



            <div className="wickets-container">
                Fall of wickets:

            </div>
            <div>
                {scorecard?.scoreCard[1]?.wicketsData
                    ? Object.values(scorecard.scoreCard[1].wicketsData)
                        .map((wicket) => `${wicket.wktRuns}/${wicket.wktNbr}`)
                        .join(", ")
                    : "No wickets data available for the second innings"}
            </div>

        </div>
    );
}

export default Scorecard;
