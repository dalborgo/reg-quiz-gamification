import { Button, Grid, Paper, Typography } from '@mui/material'

export const Section = ({ dom, handleButtonClick }) => {
  const isPrev = Boolean(dom['risposta'])
  const corretta = dom['risposta'] === dom['esa']
  return (
    <>
      <Paper sx={{ p: 2, mb: 2, display: 'flex' }}>
        {
          isPrev &&
          <Typography variant="h6" color="primary" sx={{ mr: 2, textAlign: 'right', width: 65 }}>
            #&nbsp;{dom['num']}<br/>
            <small>&#8986;</small>&nbsp;{dom['elapsedSeconds']}

          </Typography>
        }
        <Typography variant="h5">
          {dom['dom']}
        </Typography>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: isPrev && dom['esa'] === 'A' ? corretta ? 'green' : 'red' : undefined
          }}>
            <Typography variant="h6" color="secondary" sx={{ mb: isPrev ? 0 : 2 }}>{dom['ris1']}</Typography>
            {
              !isPrev &&
              <Button
                id="ButtonA"
                sx={{ mt: 'auto', display: 'block', mx: 'auto' }}
                onClick={() => handleButtonClick('A')}
                variant="outlined">
                A
              </Button>
            }
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: isPrev && dom['esa'] === 'B' ? corretta ? 'green' : 'red' : undefined
          }}>
            <Typography variant="h6" color="secondary" sx={{ mb: isPrev ? 0 : 2 }}>{dom['ris2']}</Typography>
            {
              !isPrev &&
              <Button
                id="ButtonB"
                sx={{ mt: 'auto', display: 'block', mx: 'auto' }}
                onClick={() => handleButtonClick('B')}
                variant="outlined">
                B
              </Button>
            }
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: isPrev && dom['esa'] === 'C' ? corretta ? 'green' : 'red' : undefined
          }}>
            <Typography variant="h6" color="secondary" sx={{ mb: isPrev ? 0 : 2 }}>{dom['ris3']}</Typography>
            {
              !isPrev &&
              <Button
                id="ButtonC"
                sx={{ mt: 'auto', display: 'block', mx: 'auto' }}
                onClick={() => handleButtonClick('C')}
                variant="outlined">
                C
              </Button>
            }
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}