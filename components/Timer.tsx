'use client'

import { useState, useEffect } from 'react'

interface TimerProps {
  initialMinutes?: number
  onExpire?: () => void
}

export default function Timer({ initialMinutes = 2, onExpire }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)
      onExpire?.()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onExpire])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const isFinished = timeLeft === 0
  const isWarning = timeLeft <= 30 && timeLeft > 0

  const getTimerStyles = (withPulse = false) => {
    if (isFinished) return 'text-white'
    if (isWarning) return `text-[#FD5656] ${withPulse ? 'animate-pulse' : ''}`
    return 'text-[#FFBB00]'
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-[40px] font-bold leading-[44px] uppercase transition-colors ${getTimerStyles(true)}`}>
        {String(minutes).padStart(2, '0')}
      </span>

      <span className={`text-[40px] font-bold leading-[52px] transition-colors ${getTimerStyles(false)}`}>
        :
      </span>

      <span className={`text-[40px] font-bold leading-[44px] uppercase transition-colors ${getTimerStyles(true)}`}>
        {String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}
