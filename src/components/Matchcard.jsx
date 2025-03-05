import { Card, Badge, Image } from '@mantine/core';
import "./Matchcard.css";
import indImage from '../assets/india.webp';
import banImg from '../assets/bangladesh.webp';
import ausImg from '../assets/australia.webp';
import engImg from '../assets/england.webp';
import afgImg from '../assets/afghanistan.webp';
import nzImg from '../assets/new-zealand.webp';
import pakImg from '../assets/pakistan.webp';
import saImg from '../assets/south-africa.webp';
import { useNavigate } from 'react-router-dom';

const getTeamLogo = (teamName) => {
  const teamLogos = {
    india: indImage,
    bangladesh: banImg,
    australia: ausImg,
    england: engImg,
    pakistan: pakImg,
    afghanistan: afgImg,
    newzealand: nzImg,
    southafrica: saImg
  };

  if (!teamName) return null;
  const normalizedTeamName = teamName.toLowerCase().replace(/\s+/g, "");
  return teamLogos[normalizedTeamName] || null;
};

function Matchcard({ matchdata }) {
  const navigate = useNavigate();

  if (!matchdata?.matchInfo) {
    return <div>No match data available</div>;
  }

  const { matchId, seriesName, matchDesc, matchFormat, status, team1, team2 } = matchdata.matchInfo;
  const team1Score = matchdata?.matchScore?.team1Score?.inngs1 || {};
  const team2Score = matchdata?.matchScore?.team2Score?.inngs1 || {};

  console.log("Rendering Matchcard with matchId:", matchId);

  const handleClick = (id) => {
    console.log("Navigating to matchId:", id);
    navigate(`/scorecard/${id}`);
  };

  return (
    <Card shadow="sm" padding="xs" radius="md" withBorder className="match-card" onClick={() => handleClick(matchId)}>
      <div className='series-container'>
        <div>{seriesName} {matchDesc}</div>
        <div><Badge>{matchFormat}</Badge></div>
      </div>

      <div className='match-container'>
        <div className='image-container'>
          <Image height={14} src={getTeamLogo(team1?.teamName)} alt={team1?.teamName} />
        </div>
        <div className='team-container'>{team1?.teamName}</div>
        <div className='score-container'>
          {team1Score?.runs ?? "--"} - {team1Score?.wickets ?? "--"} ({team1Score?.overs ?? "--"})
        </div>
      </div>

      <div className='match-container'>
        <div className='image-container'>
          <Image height={14} src={getTeamLogo(team2?.teamName)} alt={team2?.teamName} />
        </div>
        <div className='team-container'>{team2?.teamName}</div>
        <div className='score-container'>
          {team2Score?.runs ?? "--"} - {team2Score?.wickets ?? "--"} ({team2Score?.overs ?? "--"})
        </div>
      </div>

      <div className='status-container'>
        {status || "Match status unavailable"}
      </div>
    </Card>
  );
}

export default Matchcard;
