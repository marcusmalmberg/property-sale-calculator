import React from "react"

import { Helmet } from "react-helmet"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import CssBaseline from '@mui/material/CssBaseline'

import Calculator from './Calculator'
import Title from './Title'
import ResultTable from "./ResultTable"
import ResultTableVertical from "./ResultTableVertical"

const mdTheme = createTheme();


const AboutPage: any = (props: any) => {
  const headerRow = [
    "Foo",
    "Bar",
    "Baz",
  ]
  const tableData = [
    ["1", "A", "!"],
    ["1", "B", "!"],
    ["1", "C", "!"],
    ["1", "D", "!"],
    ["1", "E", "!"],
  ]

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <Calculator/>
    </ThemeProvider>
  )
}

export default AboutPage
