import { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'

const INITIAL_TIME = 30

export const Timer = () => {
  const [time, setTime] = useState(INITIAL_TIME)
  const [isRunning, setIsRunning] = useState(true)
  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isRunning])
  const handlePause = () => {
    setIsRunning(!isRunning)
  }
  return (
    <div>
      <Typography variant="h5" sx={{ color: time < 0 ? 'red' : undefined, cursor: 'pointer' }} onClick={handlePause}>
        {time.toString().padStart(2, '0')}
      </Typography>
      <Button sx={{ display: 'none' }} id="myTimer" onClick={() => {setTime(INITIAL_TIME)}}>Reset</Button>
    </div>
  )
}