import React, { useEffect, useState } from "react"
import Paper from '@mui/material/Paper'

import Title from '../Title'

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"
import DeleteSaveIcon from '@mui/icons-material/DeleteOutlineOutlined'
import IconButton from "@mui/material/IconButton"
import ListItemButton from "@mui/material/ListItemButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"


const Saves = ({ settings, loadSettings }: any): JSX.Element => {
  const [saves, setSaves] = useState({})
  const [saveName, setSaveName] = useState("")

  useEffect(() => {
    loadSettingsFromStorage()
  }, [])

  const loadSettingsFromStorage = () => {
    const storedSaves = JSON.parse(localStorage.getItem('saves') ?? JSON.stringify({}))
    setSaves(storedSaves)
  }

  return (
    <>
      <Title>Spara / Ladda</Title>
      <Paper sx={{ p: 2 }}>
        <br />
        <Stack spacing={1}>
          <TextField size="small" variant="standard" autoComplete="off" label="Namn på sparning" value={saveName} onChange={(e) => setSaveName(e.target.value)} />
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="outlined" onClick={() => {
              saves[saveName] = settings
              localStorage.setItem('saves', JSON.stringify(saves))
              loadSettingsFromStorage()
            }}>Spara</Button>
          </Box>
        </Stack>
        <br />

        <Typography variant="button">Sparade</Typography>
        <List dense={false}>
          <Divider />
          {Object.keys(saves).map((save, i) => (
            <ListItemButton key={save} divider onClick={() => {
              loadSettings(saves[save])
              setSaveName(save)
            }}
              selected={save === saveName && JSON.stringify(settings) == JSON.stringify(saves[save])}>
              <ListItemText primary={save} />
              <IconButton onClick={(e) => {
                delete saves[saveName]
                localStorage.setItem('saves', JSON.stringify(saves))
                loadSettingsFromStorage()

                e.stopPropagation()
              }}>
                <DeleteSaveIcon />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </>
  )
}

export default Saves
