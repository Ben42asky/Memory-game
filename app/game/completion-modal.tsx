"use client"

import { Button } from "../components/ui/button"
import { formatTime } from "../lib/utils"
import { useRouter } from "next/navigation"

interface CompletionModalProps {
  moves: number
  startTime: number | null
  onNewGame: () => void
}

export function CompletionModal({ moves, startTime, onNewGame }: CompletionModalProps) {
  const router = useRouter()
  const time = startTime ? formatTime(Date.now() - startTime) : "00:00"

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <h2 className="text-2xl font-bold text-emerald-900">Congratulations!</h2>
        <p className="text-lg text-emerald-800">
          You completed the game in {moves} moves and {time}.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => router.push("/environment")}>Choose New Environment</Button>
          <Button variant="outline" onClick={onNewGame}>
            Play Again
          </Button>
        </div>
      </div>
    </div>
  )
}

