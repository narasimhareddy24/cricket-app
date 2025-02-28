import React from "react";
import "../styles/scorecard.css";

function BowlerDetails({ bowler }) {
    // Convert the bowler object into an array
    const bowlersArray = bowler ? Object.values(bowler) : [];

    return (
        <table className="bowler-container">
            <thead>
                <tr>
                    <th>Bowler</th>
                    <th>O</th>
                    <th>M</th>
                    <th>R</th>
                    <th>W</th>
                    <th>NB</th>
                    <th>WD</th>
                    <th>ECO</th>
                </tr>
            </thead>
            <tbody>
                {bowlersArray.length > 0 ? (
                    bowlersArray.map((bowler, index) => (
                        <tr key={index}>
                            <td>{bowler?.bowlName || "N/A"}</td>
                            <td>{bowler?.overs || 0}</td>
                            <td>{bowler?.maidens || 0}</td>
                            <td>{bowler?.runs || 0}</td>
                            <td>{bowler?.wickets || 0}</td>
                            <td>{bowler?.no_balls || 0}</td>
                            <td>{bowler?.wides || 0}</td>
                            <td>{bowler?.economy?.toFixed(2) || "0.00"}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8">No bowling data available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default BowlerDetails;