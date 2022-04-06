import React, { useState, useReducer } from "react"
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

import Title from '../Title'
import { calculateProfit } from "../utils/calculator"
import Settings from "./Settings"
import ResultTableVertical from "../ResultTableVertical"
import ResultTable from "../ResultTable"
import Container from "@mui/material/Container"
import Debug from "./Debug"

const Item = ({ children }) => {
  return <div>{children}</div>
}

const settingsConfiguration = [
  {
    title: 'Stort',
    fields: [
      { name: 'Beräknad köp', key: 'buyPrice' },
      { name: 'Beräknad sälj', key: 'sellPrice' },
      { name: 'Köptes för', key: 'boughtPrice' },
    ]
  },
  {
    title: 'Sen',
    fields: [
      { name: 'Arvode', key: 'commission' },
      { name: 'Kvar på lån', key: 'loanRemaining' },
      { name: 'Uppskov', type: 'switch', key: 'deferredTaxes', defaultValue: true },
    ]
  },
  {
    title: 'Bostaden',
    fields: [
      { name: 'Bostadstyp', type: 'toggleButton', options: ['Villa', 'Bostadsrätt'], defaultValue: 'Villa', key: 'propertyType' },
      { name: 'Pantbrev sedan tidigare', key: 'mortageBond' },
      { name: 'Storlek', key: 'livingArea', defaultValue: null },
    ]
  },
  {
    title: 'Kostnader',
    fields: [
      { name: 'Hyra', key: 'costRent' },
      { name: 'Försäkring', key: 'costInsurance' },
      { name: 'El', key: 'costElectricity' },
      { name: 'Övrigt', key: 'costOther' },
    ]
  },
]

const Calculator: any = (props: any) => {
  const initialSettings = Object.assign({}, ...settingsConfiguration.map((section) => section.fields.map(field => ({ [field.key]: (typeof (field.defaultValue) !== "undefined" ? field.defaultValue : null) }))).flat())

  const [settings, updateSetting] = useReducer(
    (state: any, updates: any) => ({
      ...state,
      ...updates,
    }),
    initialSettings
  );

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
    <div style={{ backgroundColor: "#f5f5f5", minHeight: '100vh' }}>
      <Container>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <Settings settingsConfiguration={settingsConfiguration} settings={settings} updateState={(field: String, newValue: any) => updateSetting({ [field]: newValue })} reset={() => updateSetting(initialSettings)} />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Grid item xs={12}>

              <Item>
                <Title>Skatter</Title>
                <Paper sx={{ p: 2 }}>
                  <ResultTableVertical headerRow={[
                    "Beräknad vinst",
                    "Beräknad skatt",
                    "Avdrag renovering",
                  ]} tableData={[[
                    1300000,
                    286000,
                    20000,
                  ]]} />
                  <ResultTable tableData={tableData} headerRow={headerRow} />

                </Paper>
              </Item>
            </Grid>

            <Grid item xs={12}>
              <Item>
                <br />
                <Debug settings={settings} />
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <br />
      </Container>
    </div>
  )
}

export default Calculator
