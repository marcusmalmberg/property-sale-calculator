import React from "react"

import { Helmet } from "react-helmet"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Calculator from '../components/Calculator'

const mdTheme = createTheme();

const Index: any = (props: any) => {
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

export default Index
