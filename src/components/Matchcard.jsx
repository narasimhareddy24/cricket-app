import { Card, Text, Badge, Group, Image } from '@mantine/core';
import "./Matchcard.css";
import indiaImage from '../assets/india.webp';
import banImg from '../assets/bangladesh.webp';

function Matchcard({ matchdata }) {
  console.log(matchdata, 'in matchcard component')

  return (
    <Card shadow="sm" padding="xs" radius="md" withBorder className="match-card">
      <div className='series-container' >
        <div>{matchdata?.matchInfo?.seriesName} {" "}{matchdata?.matchInfo?.matchDesc}</div>
        <div><Badge>{matchdata?.matchInfo?.matchFormat}</Badge></div>
      </div>

      <div >

        <div className='match-container'>
          <div className='image-container'>
            <Image

              height={15} src={indiaImage} alt=" " />
          </div>
          <div className='team-container' >{matchdata?.matchInfo?.team1?.teamName}</div>
          <div className='score-container'>{matchdata?.matchScore?.team1Score?.inngs1?.runs}{"-"}{matchdata?.matchScore?.team1Score?.inngs1?.wickets}{"("}{matchdata?.matchScore?.team1Score?.inngs1?.overs}{")"}</div>
        </div>

        <div className='match-container'>
          <div className='image-container'>
            <Image
              height={15} src={banImg} alt=" " />
          </div>
          <div className='team-container'>{matchdata?.matchInfo?.team2?.teamName}</div>
          <div className='score-container'>{matchdata?.matchScore?.team2Score?.inngs1?.runs}{"-"}{matchdata?.matchScore?.team2Score?.inngs1?.wickets}{"("}{matchdata?.matchScore?.team2Score?.inngs1?.overs}{")"}</div>
        </div>
      </div>
      <div className='status-container'>
        {matchdata?.matchInfo?.status}
      </div>

    </Card>
  );
}
export default Matchcard;

