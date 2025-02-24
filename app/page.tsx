import Link from "next/link"
import { buttonVariants } from "./components/ui/button"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm max-w-lg w-full p-8 rounded-xl shadow-lg text-center space-y-6">
        <h1 className="text-4xl font-bold text-emerald-900 animate-fade-in">
          Welcome to the Memory Card Matching Game!
        </h1>
        <p className="text-lg text-emerald-800 animate-fade-in-delay">
          Challenge your memory skills and see how fast you can match all the pairs!
        </p>
        <Link
          href="/environment"
          className={buttonVariants({
            size: "lg",
            className:
              "animate-slide-in bg-gradient-to-r from-emerald-900 to-emerald-700 hover:from-emerald-800 hover:to-emerald-600",
          })}
        >
          Start Game
        </Link>
      </div>
    </div>
  )
}

