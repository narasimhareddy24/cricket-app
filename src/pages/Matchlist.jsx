import React, { useEffect, useState } from "react";
import {fetchMatches} from "../API/api";
import Matchcard from "../components/Matchcard";
import { Loader, Grid } from "@mantine/core";
import Navbar from "../components/Navbar";
import "../components/Navbar.css";
const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMatches = async () => {
      setLoading(true);
      try {
        const data = await fetchMatches();
        console.log("Fetched data:", data);

        if (data) {
          const targetSeries = filterSeriesByName(data, "ICC Champions Trophy, 2025");
          console.log("Filtered series:", targetSeries);

          if (targetSeries.length > 0) {
            const seriesMatches = targetSeries[0]?.matches;
            console.log("Series matches:", seriesMatches);

            if (seriesMatches?.length > 0) {
              setMatches(seriesMatches);
            } else {
              console.warn("No matches found in the series");
            }
          } else {
            console.warn("Target series not found");
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

  function filterSeriesByName(data, seriesName) {
    return (
      data?.typeMatches?.flatMap((typeMatch) =>
        typeMatch?.seriesMatches?.flatMap((series) =>
          series?.seriesAdWrapper?.seriesName === seriesName
            ? [series.seriesAdWrapper]
            : []
        )
      ) ?? []
    );
  }

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
          <Grid>
  {matches.map((match, index) => (
    <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
      <Matchcard matchdata={match} />
    </Grid.Col>
  ))}
</Grid>
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default MatchList;