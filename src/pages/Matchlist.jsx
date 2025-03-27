import React, { useEffect, useState } from "react";
import { fetchMatches } from "../API/api";
import Matchcard from "../components/Matchcard";
import { Loader, Grid } from "@mantine/core";
import Navbar from "../components/Navbar";
import "../components/Navbar.css";

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seriesName, setSeriesName] = useState("");

  useEffect(() => {
    const getMatches = async () => {
      setLoading(true);
      try {
        const data = await fetchMatches();
        console.log("Fetched data:", data);

        if (data) {
          // Get all series from the API response
          const allSeries = data?.typeMatches?.flatMap((typeMatch) =>
            typeMatch?.seriesMatches?.map((series) => series?.seriesAdWrapper)
          ).filter(Boolean); // Remove any undefined/null entries

          console.log("All series:", allSeries);

          if (allSeries.length > 0) {
            // Select a random series
            const randomIndex = Math.floor(Math.random() * allSeries.length);
            const randomSeries = allSeries[randomIndex];
            setSeriesName(randomSeries.seriesName);

            console.log("Selected random series:", randomSeries);

            if (randomSeries?.matches?.length > 0) {
              setMatches(randomSeries.matches);
            } else {
              console.warn("No matches found in the selected series");
            }
          } else {
            console.warn("No series found in the API response");
          }
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    getMatches();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <Loader color="blue" size="lg" />
          </div>
        ) : matches.length > 0 ? (
          <>
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>{seriesName}</h2>
            <Grid>
              {matches.map((match, index) => (
                <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
                  <Matchcard matchdata={match} />
                </Grid.Col>
              ))}
            </Grid>
          </>
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default MatchList;