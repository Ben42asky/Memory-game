"use client"

import { motion } from "framer-motion"
import { ENVIRONMENT_COLORS } from "../lib/constants"

type Environment = 'fruits' | 'birds' | 'cars' | 'clothes' | 'electronics' | 'animals' | 'nature';

interface CardProps {
  index: number
  value: string
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
  environment: Environment
}

export function Card({ index, value, isFlipped, isMatched, onClick, environment }: CardProps) {
  const colors = ENVIRONMENT_COLORS[environment]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="aspect-square relative cursor-pointer perspective-1000"
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-all duration-600 preserve-3d ${
          isFlipped ? "card-flip-enter" : "card-flip-exit"
        }`}
      >
        {/* Back of card (shown first) */}
        <div
          style={{ backgroundColor: colors.front }}
          className="absolute w-full h-full rounded-lg backface-hidden shadow-lg 
                     flex items-center justify-center transform-gpu"
        >
          <span className="text-4xl font-bold text-red-500 animate-pulse">?</span>
        </div>

        {/* Front of card (shown when flipped) */}
        <div
          style={{ backgroundColor: colors.back }}
          className={`absolute w-full h-full rounded-lg backface-hidden shadow-lg 
                     flex items-center justify-center transform-gpu rotate-y-180
                     ${isMatched ? "animate-glow" : ""}`}
        >
          <span className="text-4xl transform-gpu">{value}</span>
        </div>
      </div>
    </motion.div>
  )
}

