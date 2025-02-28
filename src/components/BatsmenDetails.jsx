import React from "react";
import "../styles/scorecard.css";

function BatsmenDetails({ batsmen }) {
    const batsmenArray = batsmen ? Object.values(batsmen) : [];

    return (
        <table className="bbody-container">
            <thead>
                <tr>
                    <th>Batter</th>
                    <th>R</th>
                    <th>B</th>
                    <th>4s</th>
                    <th>6s</th>
                    <th>SR</th>
                </tr>
            </thead>
            <tbody>
                {batsmenArray.length > 0 ? (
                    batsmenArray.map((batsman, index) => (
                        <tr key={index}>
                            <td>{batsman?.batName || "N/A"}</td>
                            <td>{batsman?.runs || 0}</td>
                            <td>{batsman?.balls || 0}</td>
                            <td>{batsman?.fours || 0}</td>
                            <td>{batsman?.sixes || 0}</td>
                            <td>{batsman?.strikeRate?.toFixed(2) || "0.00"}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No batting data available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default BatsmenDetails;