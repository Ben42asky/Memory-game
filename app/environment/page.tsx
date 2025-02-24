"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const ENVIRONMENTS = {
  fruits: ["🍎", "Fruits"],
  birds: ["🦜", "Birds"],
  cars: ["🚗", "Cars"],
  clothes: ["👗", "Clothes"],
  electronics: ["💻", "Electronics"],
  animals: ["🐶", "Animals"],
  nature: ["🌳", "Nature"],
}

export default function EnvironmentPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm max-w-2xl w-full p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-900 text-center mb-6">Select Your Environment</h1>
        <p className="text-lg text-emerald-800 text-center mb-8">Choose a theme to start your game:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(ENVIRONMENTS).map(([key, [emoji, name]], index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(`/game?environment=${key}`)}
              className="p-6 text-center rounded-lg bg-gradient-to-br from-emerald-900 to-emerald-700 text-white shadow-lg hover:shadow-xl transition-transform hover:scale-105 active:scale-95"
            >
              <span className="text-3xl block mb-2">{emoji}</span>
              <span className="text-lg font-medium">{name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

