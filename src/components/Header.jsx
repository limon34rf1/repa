import React from 'react'
import { motion } from 'framer-motion'
import './Header.css'

const days = [
  { id: 'monday', name: 'ПН' },
  { id: 'tuesday', name: 'ВТ' },
  { id: 'wednesday', name: 'СР' },
  { id: 'thursday', name: 'ЧТ' },
  { id: 'friday', name: 'ПТ' },
  { id: 'saturday', name: 'СБ' },
  { id: 'sunday', name: 'ВС' }
]

export default function Header({ currentDay, setCurrentDay }) {
  return (
    <header className="header">
      <motion.h1 
        className="app-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Бобр-Планировщик
      </motion.h1>
      
      <nav>
        <ul className="days-list">
          {days.map(day => (
            <motion.li
              key={day.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className={`day-button ${currentDay === day.id ? 'active' : ''}`}
                onClick={() => setCurrentDay(day.id)}
              >
                {day.name}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  )
}