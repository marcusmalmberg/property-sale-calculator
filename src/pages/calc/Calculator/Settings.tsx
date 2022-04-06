import React from "react"
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import Title from '../Title'
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

const inputForField = (field, updateField: Function, settings) => {
  const handleCheckbox = (e) => {
    console.log({ key: field.key, value: e.target.checked })
    updateField(field.key, e.target.checked)
  }

  const handleChange = (e) => {
    console.log({ key: field.key, value: e.target.value })
    updateField(field.key, e.target.value)
  }

  switch (field.type) {
    case "switch":
      return <FormGroup key={field.key}><FormControlLabel labelPlacement="end" control={<Switch size="small" checked={settings[field.key]} onClick={handleCheckbox} />} label={field.name} /></FormGroup>
    case "toggleButton":
      return <ToggleButtonGroup
        color="primary"
        value={settings[field.key]}
        exclusive
        size="small"
        fullWidth={true}
        onChange={handleChange}
        key={field.key}
      >
        {field.options.map((option, i) => (
          <ToggleButton key={option} value={option}>{option}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    default:
      return <TextField key={field.key} size="small" variant="standard" autoComplete="off" label={field.name} value={settings[field.key] ?? ""} onChange={handleChange} />
  }
}

const Settings: any = ({ reset, settingsConfiguration, ...props }: any) => {

  const state = props.settings;
  const updateState = props.updateState;

  const onChange = (fieldKey: string, newValue: any) => {
    updateState(fieldKey, newValue)
  }

  return (
    <>
      <Title>Inställningar</Title>
      <Paper sx={{ p: 2 }}>
        {settingsConfiguration.map((section, i) => {
          return (
            <React.Fragment key={section.title}>
              {i > 0 && <br />}
              <Typography variant="h6">{section.title}</Typography>
              <Stack spacing={2}>
                {section.fields.map((field, i) =>
                  inputForField(field, onChange, state)
                )}

              </Stack>
            </React.Fragment>
          )
        })}
        <br />
        <Box sx={{ textAlign: 'right' }}>
          <Button variant="outlined" onClick={reset}>Rensa</Button>
        </Box>

      </Paper>
    </>
  )
}

export default Settings
