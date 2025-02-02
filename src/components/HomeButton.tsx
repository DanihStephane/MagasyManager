import { Home } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

export function HomeButton() {
  return (
    <Button 
      asChild 
      variant="ghost" 
      className="relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-700/30 hover:to-purple-900/30 dark:hover:from-pink-950 dark:hover:to-purple-950 rounded-xl border border-pink-300/50 dark:border-purple-800/50 shadow-lg"
    >
      <Link to="/" className="flex items-center px-4 py-2 font-medium">
        <Home className="mr-2 h-5 w-5 text-pink-700 dark:text-pink-500 transition-transform group-hover:scale-110" />
        <span className="bg-gradient-to-r from-pink-700 to-purple-900 dark:from-pink-500 dark:to-purple-600 bg-clip-text text-transparent font-semibold">
          Accueil
        </span>
      </Link>
    </Button>
  )
}
