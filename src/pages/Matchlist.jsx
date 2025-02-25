import { Grid } from "@mantine/core";
import MatchCard from "../components/Matchcard.jsx";
import data from '../data/MatchDetails.json'
function Matchlist() {

  function filterSeriesByName(data, seriesName) {
    return data.typeMatches.flatMap(typeMatch =>
      typeMatch.seriesMatches
        .map(series => series?.seriesAdWrapper)
        .filter(seriesAdWrapper => seriesAdWrapper?.seriesName === seriesName)
    );
  }
  const matches = (filterSeriesByName(data, "ICC Champions Trophy, 2025"))[0]?.matches
  console.log(matches[0]?.matches)
  return (

    <Grid>
      {matches.map((match, index) => (
        <Grid.Col key={index} span={4}>
          <MatchCard matchdata={match} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default Matchlist;
