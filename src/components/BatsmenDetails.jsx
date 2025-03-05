import React from "react";
import { Table } from "@mantine/core";

function BatsmenDetails({ batsmen }) {
    const batsmenArray = batsmen ? Object.values(batsmen) : [];

    const rows = batsmenArray.length > 0 ? (
        batsmenArray.map((batsman, index) => (
            <Table.Tr key={index}>
                <Table.Td style={{ color: "blue", fontWeight: 600 }}>
                    {batsman?.batName || "N/A"}
                </Table.Td>
                <Table.Td>{batsman?.outDesc || "Not Out"}</Table.Td>
                <Table.Td>{batsman?.runs || 0}</Table.Td>
                <Table.Td>{batsman?.balls || 0}</Table.Td>
                <Table.Td>{batsman?.fours || 0}</Table.Td>
                <Table.Td>{batsman?.sixes || 0}</Table.Td>
                <Table.Td>{batsman?.strikeRate?.toFixed(2) || "0.00"}</Table.Td>
            </Table.Tr>

        ))
    ) : (
        <Table.Tr>
            <Table.Td colSpan="6" style={{ textAlign: "center" }}>
                No batting data available
            </Table.Td>
        </Table.Tr>
    );

    return (
        <Table stickyHeader stickyHeaderOffset={60}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Batter</Table.Th>
                    <Table.Th> </Table.Th>
                    <Table.Th>R</Table.Th>
                    <Table.Th>B</Table.Th>
                    <Table.Th>4s</Table.Th>
                    <Table.Th>6s</Table.Th>
                    <Table.Th>SR</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}

export default BatsmenDetails;
