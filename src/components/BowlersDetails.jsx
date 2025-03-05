import React from "react";
import { Table } from "@mantine/core";

function BowlerDetails({ bowler }) {
    // Convert the bowler object into an array
    const bowlersArray = bowler ? Object.values(bowler) : [];

    const rows = bowlersArray.length > 0 ? (
        bowlersArray.map((bowler, index) => (
            <Table.Tr key={index}>
                <Table.Td style={{ color: "blue", fontWeight: 600 }}>{bowler?.bowlName || "N/A"}</Table.Td>
                <Table.Td>{bowler?.overs || 0}</Table.Td>
                <Table.Td>{bowler?.maidens || 0}</Table.Td>
                <Table.Td>{bowler?.runs || 0}</Table.Td>
                <Table.Td>{bowler?.wickets || 0}</Table.Td>
                <Table.Td>{bowler?.no_balls || 0}</Table.Td>
                <Table.Td>{bowler?.wides || 0}</Table.Td>
                <Table.Td>{bowler?.economy?.toFixed(2) || "0.00"}</Table.Td>
            </Table.Tr>
        ))
    ) : (
        <Table.Tr>
            <Table.Td colSpan={8} style={{ textAlign: "center" }}>
                No bowling data available
            </Table.Td>
        </Table.Tr>
    );

    return (
        <Table stickyHeader stickyHeaderOffset={60}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Bowler</Table.Th>
                    <Table.Th>O</Table.Th>
                    <Table.Th>M</Table.Th>
                    <Table.Th>R</Table.Th>
                    <Table.Th>W</Table.Th>
                    <Table.Th>NB</Table.Th>
                    <Table.Th>WD</Table.Th>
                    <Table.Th>ECO</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}

export default BowlerDetails;
