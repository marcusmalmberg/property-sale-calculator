import React from "react"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


const ResultTable: React.FC = ({ headerRow, tableData }: any): any => {
  const transposedTableData = tableData && tableData[0].map((_: any, colIndex: number) => tableData.map((row: any[]) => row[colIndex]));

  return (
    <Table>
      <TableBody>
        {transposedTableData.map((row: any[], i: number) => (
          <TableRow key={i}>
            <TableCell variant="head">{headerRow[i]}</TableCell>
            {row.map((col, j: number) => (
              <TableCell key={j}>{col}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ResultTable
