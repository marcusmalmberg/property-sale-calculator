import React from "react"

import * as styles from "./ResultTable.module.scss"

const ResultTable : React.FC = ({ tableData }: any): any => {

  const headerRow = ["A", "B", "C"]
  return (
    <table>
      <thead>
        <tr>
          {headerRow.map((header, i) =>
            <th key={i}>{header}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {tableData?.map((row: any[], i: number) => {
          return <tr key={i}>
            {row.map((column: any, j: number) => {
              return <td key={j}>{column}</td>
            })}
          </tr>
        })}
      </tbody>
    </table>
  )
}

export default ResultTable
