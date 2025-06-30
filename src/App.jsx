import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Timeline from './components/Timeline'
import Beaver from './components/Beaver'
import Footer from './components/Footer'
import schedule from '../schedule.json'
import './styles/globals.css'

export default function App() {
  const [currentDay, setCurrentDay] = useState('monday')
  const [currentTime, setCurrentTime] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const timelineRef = useRef()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const moscowTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }))
      setCurrentTime(moscowTime)
      
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      setCurrentDay(days[moscowTime.getDay()])
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!currentTime || !timelineRef.current) return

    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()
    const currentBlocks = schedule[currentDay]

    for (let i = 0; i < currentBlocks.length; i++) {
      const [start, end] = currentBlocks[i].time.split('-').map(t => {
        const [h, m] = t.split(':').map(Number)
        return h + m / 60
      })

      if (currentHour + currentMinute/60 < end) {
        setActiveIndex(i)
        timelineRef.current.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        break
      }
    }
  }, [currentDay, currentTime])

  return (
    <div className="app">
      <Header currentDay={currentDay} setCurrentDay={setCurrentDay} />
      
      <div className="timeline-container" ref={timelineRef}>
        <AnimatePresence mode="wait">
          <Timeline 
            key={currentDay}
            day={currentDay} 
            schedule={schedule[currentDay]} 
            activeIndex={activeIndex}
          />
        </AnimatePresence>
      </div>

      <Beaver 
        currentTask={schedule[currentDay]?.[activeIndex]?.task} 
        currentTime={currentTime}
      />

      <Footer />
    </div>
  )
}