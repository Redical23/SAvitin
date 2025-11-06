"use client"

import { useState, useEffect } from "react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (num: number) => String(num).padStart(2, "0")

  return (
    <div className="flex gap-3 md:gap-4 items-center bg-white/20 backdrop-blur-sm rounded-lg p-4">
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold">{formatTime(timeLeft.hours)}</div>
        <div className="text-xs md:text-sm uppercase font-semibold opacity-90">Hours</div>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold">{formatTime(timeLeft.minutes)}</div>
        <div className="text-xs md:text-sm uppercase font-semibold opacity-90">Minutes</div>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold">{formatTime(timeLeft.seconds)}</div>
        <div className="text-xs md:text-sm uppercase font-semibold opacity-90">Seconds</div>
      </div>
    </div>
  )
}
