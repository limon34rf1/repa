import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const beaverTypes = {
  study: { 
    image: '/assets/images/beaver-study.png', 
    text: 'Учись, как бобр! Сосредоточься на задаче!' 
  },
  eat: { 
    image: '/assets/images/beaver-eat.png', 
    text: 'Не забудь подкрепиться! Зарядись энергией!' 
  },
  gym: { 
    image: '/assets/images/beaver-gym.png', 
    text: 'Разминайся, как бобр! Движение - жизнь!' 
  },
  sleep: { 
    image: '/assets/images/beaver-sleep.png', 
    text: 'Время спать! Отдыхай для новых свершений!' 
  },
  default: { 
    image: '/assets/images/beaver-default.png', 
    text: 'Готов к работе! Начни продуктивный день!' 
  }
}

export default function Beaver({ currentTask, currentTime }) {
  const [beaverState, setBeaverState] = useState('default')

  useEffect(() => {
    if (currentTime?.getHours() >= 0 && currentTime?.getHours() < 6) {
      setBeaverState('sleep')
      return
    }

    if (!currentTask) {
      setBeaverState('default')
      return
    }

    const task = currentTask.toLowerCase()
    if (task.includes('еда') || task.includes('завтрак') || task.includes('обед') || task.includes('ужин')) {
      setBeaverState('eat')
    } else if (task.includes('тренировка') || task.includes('зарядка') || task.includes('прогулка')) {
      setBeaverState('gym')
    } else if (task.includes('сон') || task.includes('отдых') || task.includes('разгрузка')) {
      setBeaverState('sleep')
    } else if (task.includes('математика') || task.includes('анализ') || task.includes('python') || 
               task.includes('физика') || task.includes('статистика') || task.includes('алгоритмы') ||
               task.includes('олимпиад') || task.includes('практика') || task.includes('проект')) {
      setBeaverState('study')
    } else {
      setBeaverState('default')
    }
  }, [currentTask, currentTime])

  return (
    <motion.div
      className="beaver-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 10 }}
    >
      <motion.img 
        src={beaverTypes[beaverState].image} 
        alt={`Бобр: ${beaverTypes[beaverState].text}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      />
      <motion.div 
        className="speech-bubble"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {beaverTypes[beaverState].text}
      </motion.div>
    </motion.div>
  )
}