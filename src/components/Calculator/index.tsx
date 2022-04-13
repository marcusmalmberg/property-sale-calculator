import React, { useEffect, useReducer, useState } from "react"
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

import Title from '../Title'
import Settings from "./Settings"
import ResultTableVertical from "../ResultTableVertical"
import Container from "@mui/material/Container"
import Debug from "./Debug"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

const Item = ({ children }) => {
  return <div>{children}</div>
}

const settingsConfiguration = [
  {
    title: 'Köp & Sälj',
    fields: [
      { name: 'Köptes för', key: 'boughtPrice' },
      { name: 'Beräknad sälj', key: 'sellPrice' },
      { name: 'Beräknad köp', key: 'buyPrice' },
    ]
  },
  {
    title: 'Ekonomi',
    fields: [
      { name: 'Arvode', key: 'commission' },
      { name: 'Förbättringsutgifter', key: 'improvementCosts' },
      { name: 'Lån på nuvarande bostad', key: 'loanRemaining' },
      { name: 'Extra kontanter', key: 'extraCash' },
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
  const [saves, setSaves] = useState(null)
  const [saveName, setSaveName] = useState(null)
  const [settings, updateSetting] = useReducer(
    (state: any, updates: any) => ({
      ...state,
      ...updates,
    }),
    initialSettings
  );

  useEffect(() => {
    const storedSaves = JSON.parse(localStorage.getItem('saves') ?? JSON.stringify({}))
    console.log(storedSaves)
  }, [])

  let calculations = {}
  let salesCalculations = {}
  salesCalculations.profit =  settings.sellPrice - settings.boughtPrice
  salesCalculations.adjustedProfit = salesCalculations.profit - settings.improvementCosts - settings.commission
  salesCalculations.taxes = Math.round(salesCalculations.adjustedProfit * 22 / 30 * 0.3)
  salesCalculations.remainingAfterTaxes = salesCalculations.adjustedProfit - (settings.deferredTaxes ? 0 : salesCalculations.taxes)
  salesCalculations.paidOnCurrentProperty = settings.boughtPrice - settings.loanRemaining
  calculations.salesCalculations = salesCalculations

  let buyCalculations = {}
  buyCalculations.availableAfterSale = salesCalculations.remainingAfterTaxes + salesCalculations.paidOnCurrentProperty
  buyCalculations.deposit = Math.round(settings.buyPrice * 0.15)
  buyCalculations.neededAfterSale = settings.buyPrice - buyCalculations.availableAfterSale
  buyCalculations.deedCost = settings.propertyType === "Villa" ? settings.buyPrice * 0.015 + 875 : 0
  buyCalculations.needToLoan = buyCalculations.neededAfterSale - settings.extraCash
  buyCalculations.mortageBondCost = settings.propertyType === "Villa" ? Math.max(Math.round((buyCalculations.needToLoan - settings.mortageBond) * 0.02), 0) : 0
  buyCalculations.cashInput = buyCalculations.deposit + buyCalculations.deedCost + buyCalculations.mortageBondCost
  buyCalculations.minimumExtraCash = Math.max(buyCalculations.cashInput - buyCalculations.availableAfterSale, 0)
  calculations.buyCalculations = buyCalculations

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: '100vh' }}>
      <Container>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <Item>
                <Settings settingsConfiguration={settingsConfiguration} settings={settings} updateState={(field: String, newValue: any) => updateSetting({ [field]: newValue })} reset={() => updateSetting(initialSettings)} />
              </Item>
            </Grid>
          </Grid>


          <Grid item xs={8}>

            <Grid item xs={12}>
              <Item>
                <Title>Sammanfattning</Title>
                <Paper sx={{ p: 2 }}>
                  <ResultTableVertical headerRow={["Tillgängligt efter försäljning", "Extra kontanter att skjuta till (utöver vinst)", "Kommer låna"]} tableData={[[buyCalculations.availableAfterSale, buyCalculations.minimumExtraCash, buyCalculations.needToLoan]]} />
                </Paper>
              </Item>
            </Grid>

            <Grid item xs={12}>
              <Item>
                <br />
                <Title>Pengar från försäljningar</Title>
                <Paper sx={{ p: 2 }}>
                  <ResultTableVertical headerRow={["Försäljningsvinst", "Vinst efter avdrag", "Skatt", "Kvar efter skatt", "Betalat på bostaden", ""]} tableData={[[salesCalculations.profit, salesCalculations.adjustedProfit, salesCalculations.taxes, salesCalculations.remainingAfterTaxes, salesCalculations.paidOnCurrentProperty, <Typography>{buyCalculations.availableAfterSale}</Typography>]]} />
                </Paper>
              </Item>
            </Grid>

            <Grid item xs={12}>
              <Item>
                <br />
                <Title>Behov köp</Title>
                <Paper sx={{ p: 2 }}>
                  <ResultTableVertical headerRow={["Tillgängligt efter försäljning", "Handpenning (15%)", "Behöver skjuta till / låna efter försäljning", "Lagfart (1.5% + 875 kr)", "Kommer låna", "Pantbrev (2% av nylån)", "Behov kontanter (handpenning + lagfart + pantbrev)", "Minst extra kontanter att skjuta till utöver försäljningsvinst"]} tableData={[[buyCalculations.availableAfterSale, buyCalculations.deposit, buyCalculations.neededAfterSale, buyCalculations.deedCost, buyCalculations.needToLoan, buyCalculations.mortageBondCost, buyCalculations.cashInput, buyCalculations.minimumExtraCash]]} />
                </Paper>
              </Item>
            </Grid>

            <Grid item xs={12}>
              <Item>
                <br />
                <Debug settings={{settings, calculations}} />
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