import { motion } from 'framer-motion'

export default function Timeline({ day, schedule, activeIndex }) {
  if (!schedule) return null

  return (
    <div className="timeline">
      {schedule.map((item, index) => (
        <motion.div
          key={`${day}-${index}`}
          className={`timeline-block ${index < activeIndex ? 'past' : ''} ${index === activeIndex ? 'active' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="time">{item.time}</div>
          <div className={`intensity ${item.intensity}`}>
            {item.intensity === 'normal' && '🟡'}
            {item.intensity === 'hard' && '🔴'}
            {item.intensity === 'light' && '🟢'}
          </div>
          <div className="task">{item.task}</div>
        </motion.div>
      ))}
    </div>
  )
}