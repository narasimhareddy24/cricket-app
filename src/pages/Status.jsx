import { useState, useEffect } from "react";
import { fetchStats } from "../API/api.js";
import "../styles/Status.css";

function Status({ type, format }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setStats(null);

      try {
        const data = await fetchStats(format, type);
        setStats(data || {});
      } catch (error) {
        console.error("Error fetching stats:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [format, type]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : stats?.rank?.length ? (
        <table className="stats-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Player</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {stats.rank.map((player) => (
              <tr key={player.id} className="player-row">
                <td>{player.rank}</td>
                <td>{player.name}</td>
                <td>{player.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Status;