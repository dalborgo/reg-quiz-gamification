import master from './quiz.json'

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { Timer } from './Timer.jsx'
import { Section } from './Section.jsx'

function getRandomObjectWithVolteZero (array) {
  const filteredArray = array.filter(obj => !obj.volte)
  return Math.floor(Math.random() * filteredArray.length)
}

const sbagliate = []

function App () {
  const [quiz] = useState(() => {
    const savedQuiz = sessionStorage.getItem('savedQuiz')
    return savedQuiz ? JSON.parse(savedQuiz) : master
  })
  const randomIndex = getRandomObjectWithVolteZero(quiz)
  const dom = quiz[randomIndex]
  const time = useRef(new Date().getTime())
  const { num, reg, esa } = dom
  const [isRunning] = useState(true)
  const [stats, setStats] = useState({ esatte: 0, sbagliate: 0 })
  const handleButtonClick = risposta => {
    if (risposta === esa) {
      setStats(prevStats => ({
        ...prevStats,
        esatte: prevStats.esatte + 1,
      }))
    } else {
      setStats(prevStats => ({
        ...prevStats,
        sbagliate: prevStats.sbagliate + 1,
      }))
      quiz[randomIndex].sbagliata = quiz[randomIndex].sbagliata ? quiz[randomIndex].sbagliata + 1 : 1
      sbagliate.push(dom)
    }
    const currentTime = new Date().getTime();
    const elapsedSeconds = Math.floor((currentTime - time.current) / 1000)
    console.log('elapsedSeconds:', elapsedSeconds)
    time.current = currentTime
    const elem = document.getElementById('myTimer')
    elem.click()
    quiz[randomIndex].volte = quiz[randomIndex].volte ? quiz[randomIndex].volte + 1 : 1
    setStats((prevStats) => ({
      ...prevStats,
      domPrev: { ...dom, elapsedSeconds, risposta },
    }))
  }
  const save = () => {
    sessionStorage.setItem('savedQuiz', JSON.stringify(quiz))
  }
  console.log('sbagliate:', sbagliate)
  return (
    <>
      <Box sx={{ pr: '20%', pl: '20%', }}>
        <AppBar position="static" sx={{ mb: 2, mt: 1 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="primary">
              Domanda n. {num} - Reg. {reg}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Timer isRunning={isRunning}/>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}/>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Button onClick={save} variant="outlined">
                  Salva
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Section dom={dom} handleButtonClick={handleButtonClick}/>
      </Box>
      <Box
        sx={{
          mb: 1,
          pr: '20%',
          pl: '20%',
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
      >
        {stats.domPrev && <Section dom={stats.domPrev}/>}
      </Box>
    </>
  
  )
}

export default App
