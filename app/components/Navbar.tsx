"use client"
import { useState, useEffect } from 'react'

const links = ['About', 'Book', 'Gallery', 'Review', 'Signup', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // This makes the navbar dynamic! It listens for scrolling.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-sm' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        <a href="#welcome" className={`font-serif tracking-widest uppercase transition-all duration-500 ${scrolled ? 'text-xl text-[#2C201C]' : 'text-2xl text-[#2C201C]'}`}>
          Art of Mind
        </a>
        
        <nav className="hidden md:flex gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-semibold tracking-wider text-[#2C201C] hover:text-[#D4AF37] transition-colors uppercase">
              {l}
            </a>
          ))}
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 flex flex-col items-center justify-center gap-1.5">
          <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-[#2C201C]' : 'bg-[#2C201C]'}`}></span>
          <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-[#2C201C]' : 'bg-[#2C201C]'}`}></span>
          <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-[#2C201C]' : 'bg-[#2C201C]'}`}></span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col p-6 gap-4 bg-[#FAF7F2] border-t border-[#D4AF37]/20 absolute w-full left-0 shadow-lg">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-[#2C201C] font-serif text-lg text-center uppercase tracking-widest hover:text-[#D4AF37]">
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
