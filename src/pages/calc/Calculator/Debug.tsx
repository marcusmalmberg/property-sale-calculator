import React from "react"
import Paper from '@mui/material/Paper'

import Title from '../Title'

const Debug: any = ({settings}: any) => {

  return (
    <>
      <Title>Debug</Title>
      <Paper sx={{ p: 2 }}>
        <pre>
          {JSON.stringify(settings, undefined, 2)}
        </pre>
      </Paper>
    </>
  )
}

export default Debug
