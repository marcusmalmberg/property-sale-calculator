import React from "react"

import ResultTable from "./ResultTable"

const AboutPage: any = (props: any) => {
  const tableData = [
    ["1", "A", "!"],
    ["1", "B", "!"],
    ["1", "C", "!"],
    ["1", "D", "!"],
    ["1", "E", "!"],
  ]

  return (
    <div className="about-container">
      <p>About me.</p>
      <ResultTable tableData={tableData} />
    </div>
  )
}

export default AboutPage
