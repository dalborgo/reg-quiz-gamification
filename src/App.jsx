import master from './quiz.json'
import findIndex from 'lodash/findIndex'

import { AppBar, Box, Button, Paper, Toolbar, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Timer } from './Timer.jsx'
import { Section } from './Section.jsx'
import Timer2 from './Timer2.jsx'

const sbagliate = []
let count = 0

function App () {
  const [quiz] = useState(() => {
    const savedQuiz = localStorage.getItem('savedQuiz')
    if (savedQuiz) {
      const parsedQuiz = JSON.parse(savedQuiz)
      const startDone_ = parsedQuiz.filter(row => row.volte > 0)
      count = startDone_?.length || 0
      return parsedQuiz
    } else {
      return master
    }
  })
  const filteredArray = quiz.filter(obj => !obj.volte && obj.reg !== 'ASS' && obj.reg !== 'NFOT')
  const total = filteredArray.length
  //const filteredArray = quiz.filter(obj => obj.sbagliata > 0 && obj.volte > 0)
  const randomIndex = Math.floor(Math.random() * filteredArray.length)
  const dom = filteredArray[randomIndex]
  const originalIndex = findIndex(quiz, { num: dom.num })
  const time = useRef(new Date().getTime())
  const { num, reg, esa } = dom
  const [isRunning] = useState(true)
  const [stats, setStats] = useState({ esatte: 0, sbagliate: 0 })
  const totale = stats.esatte + stats.sbagliate
  const percentualeSbagliate = Math.round((stats.sbagliate / totale) * 100)
  
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
      quiz[originalIndex].sbagliata = quiz[originalIndex].sbagliata ? quiz[originalIndex].sbagliata + 1 : 1
      sbagliate.push(dom)
    }
    count++
    const currentTime = new Date().getTime()
    const elapsedSeconds = Math.floor((currentTime - time.current) / 1000)
    time.current = currentTime
    const elem = document.getElementById('myTimer')
    elem.click()
    quiz[originalIndex].volte = quiz[originalIndex].volte ? quiz[originalIndex].volte + 1 : 1
    setStats((prevStats) => ({
      ...prevStats,
      domPrev: { ...dom, elapsedSeconds, risposta },
    }))
  }
  const save = () => {
    localStorage.setItem('savedQuiz', JSON.stringify(quiz))
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 37) {
        const elem = document.getElementById('ButtonA')
        elem.click()
      } else if (event.keyCode === 38) {
        const elem = document.getElementById('ButtonB')
        elem.click()
      } else if (event.keyCode === 39) {
        const elem = document.getElementById('ButtonC')
        elem.click()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
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
        <Paper display="flex" sx={{ pt: 1, pb: 1, mt: 2, pl: 2, pr: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Box>{count} / {total}</Box>
            <Box display="flex" justifyContent="center">{totale} / <span
              style={{ color: 'red', marginLeft: 5 }}>{stats.sbagliate} ({percentualeSbagliate || 0}%)</span></Box>
            <Box><Timer2/></Box>
          </Box>
        </Paper>
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
