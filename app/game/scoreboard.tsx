"use client"

import { Button } from "../components/ui/button"
import { formatTime } from "../lib/utils"
import { useEffect, useState } from "react"

interface ScoreboardProps {
  moves: number
  startTime: number | null
  onRestart: () => void
}

export function Scoreboard({ moves, startTime, onRestart }: ScoreboardProps) {
  const [time, setTime] = useState("00:00")

  useEffect(() => {
    if (!startTime) return

    const timer = setInterval(() => {
      setTime(formatTime(Date.now() - startTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime])

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-900 to-emerald-700 text-white font-medium">
        Moves: {moves}
      </div>
      <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-900 to-emerald-700 text-white font-medium">
        Time: {time}
      </div>
      <Button onClick={onRestart} variant="outline">
        Restart
      </Button>
    </div>
  )
}

