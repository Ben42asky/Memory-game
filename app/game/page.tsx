"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "./card"
import { Scoreboard } from "./scoreboard"
import { CompletionModal } from "./completion-modal"
import { ENVIRONMENTS } from "../lib/constants"

export default function GamePage() {
  const searchParams = useSearchParams()
  const environment = (searchParams.get("environment") as keyof typeof ENVIRONMENTS) || "fruits"

  const [cards, setCards] = useState<string[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    startGame()
  }, [])

  const startGame = () => {
    const deck = [...ENVIRONMENTS[environment], ...ENVIRONMENTS[environment]]
    setCards(shuffleArray(deck))
    setFlippedIndices([])
    setMatchedPairs([])
    setMoves(0)
    setStartTime(Date.now())
    setIsComplete(false)
    setIsChecking(false)
  }

  const handleCardFlip = async (index: number) => {
    // Prevent clicking if already checking a pair or clicking a flipped/matched card
    if (isChecking || flippedIndices.includes(index) || matchedPairs.includes(index)) {
      return
    }

    const newFlipped = [...flippedIndices, index]
    setFlippedIndices(newFlipped)

    // If we have a pair to check
    if (newFlipped.length === 2) {
      setIsChecking(true)
      setMoves((m) => m + 1)

      const [firstIndex, secondIndex] = newFlipped

      if (cards[firstIndex] === cards[secondIndex]) {
        // Match found
        setMatchedPairs((prev) => [...prev, ...newFlipped])
        setFlippedIndices([])
        setIsChecking(false)

        // Check if game is complete
        if (matchedPairs.length + 2 === cards.length) {
          setIsComplete(true)
        }
      } else {
        // No match - wait and flip back
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setFlippedIndices([])
        setIsChecking(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm max-w-2xl w-full p-8 rounded-xl shadow-lg">
        <Scoreboard moves={moves} startTime={startTime} onRestart={startGame} />
        <div className="grid grid-cols-4 gap-4 mt-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              index={index}
              value={card}
              isFlipped={flippedIndices.includes(index) || matchedPairs.includes(index)}
              isMatched={matchedPairs.includes(index)}
              onClick={() => handleCardFlip(index)}
              environment={environment}
            />
          ))}
        </div>
        {isComplete && <CompletionModal moves={moves} startTime={startTime} onNewGame={() => startGame()} />}
      </div>
    </div>
  )
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

