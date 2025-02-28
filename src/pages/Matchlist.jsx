import React, { useEffect, useState } from "react";
import fetchMatches from "../API/api";
import Matchcard from "../components/Matchcard";
import { Loader, Grid } from "@mantine/core";

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMatches = async () => {
      setLoading(true);
      const data = await fetchMatches();

      if (data) {
        const filteredMatches = filterSeriesByName(data, "ICC Champions Trophy, 2025")[0]?.matches;
        if (filteredMatches) {
          setMatches(filteredMatches);
        }
      }
      setLoading(false);
    };

    getMatches();
  }, []);


  function filterSeriesByName(data, seriesName) {
    return data?.typeMatches?.flatMap((typeMatch) =>
      typeMatch?.seriesMatches
        ?.map((series) => series?.seriesAdWrapper)
        ?.filter((seriesAdWrapper) => seriesAdWrapper?.seriesName === seriesName)
    );
  }

  return (
    <div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Loader color="blue" size="lg" />
        </div>
      ) : matches.length > 0 ? (
        <Grid>
          {matches.map((match, index) => (
            <Grid.Col key={index} span={4}>
              <Matchcard matchdata={match} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default MatchList;
