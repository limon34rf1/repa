import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="legend">
        <div className="legend-item">
          <span className="legend-icon">🟡</span>
          <span className="legend-text">норм — обычная нагрузка</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon">🔴</span>
          <span className="legend-text">хард — высокая нагрузка</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon">🟢</span>
          <span className="legend-text">лёгк — лёгкая</span>
        </div>
      </div>
    </motion.footer>
  )
}