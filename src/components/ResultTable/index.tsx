import React from "react"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ResultTable: React.FC = ({ headerRow, tableData }: any): any => {

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headerRow.map((header, i) =>
            <TableCell key={i}>{header}</TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData?.map((row: any[], i: number) => {
          return <TableRow key={i}>
            {row.map((column: any, j: number) => {
              return <TableCell key={j}>{column}</TableCell>
            })}
          </TableRow>
        })}
      </TableBody>
    </Table>
  )
}

export default ResultTable
