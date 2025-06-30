import Link from 'next/link'
import { Film } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-black border-b border-netflix-gray sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-netflix-red" />
            <span className="text-xl font-bold text-white">Netflix Clone</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/genres/action" className="text-white hover:text-gray-300 transition-colors">
              Action
            </Link>
            <Link href="/genres/sci-fi" className="text-white hover:text-gray-300 transition-colors">
              Sci-Fi
            </Link>
            <Link href="/genres/comedy" className="text-white hover:text-gray-300 transition-colors">
              Comedy
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}