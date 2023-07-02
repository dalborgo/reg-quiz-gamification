import { useEffect, useState } from 'react'

const Timer2 = () => {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Incrementa i secondi
      setSeconds((prevSeconds) => prevSeconds + 1)
      
      // Se i secondi raggiungono 60, incrementa i minuti e azzera i secondi
      if (seconds === 59) {
        setSeconds(0)
        setMinutes((prevMinutes) => prevMinutes + 1)
      }
    }, 1000)
    
    return () => {
      clearInterval(interval)
    }
  }, [seconds])
  
  // Funzione per aggiungere un zero davanti a numeri inferiori a 10
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time
  }
  
  return (
    <div>
      {formatTime(minutes)}:{formatTime(seconds)}
    </div>
  )
}

export default Timer2
