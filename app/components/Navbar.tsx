"use client"
import { useState, useEffect } from 'react'

const links = ['About', 'Book', 'Gallery', 'Review', 'Signup', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#FDF8F4]/95 backdrop-blur-md border-b border-[#C9A164]/20 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        
        {/* Changed to Author's Name */}
        <a href="#welcome" className={`font-serif tracking-widest uppercase transition-all duration-500 ${scrolled ? 'text-xl text-[#402824]' : 'text-2xl text-[#402824]'}`}>
          Deborah M Tungnung
        </a>
        
        <nav className="hidden md:flex gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-semibold tracking-wider text-[#402824] hover:text-[#CB8D88] transition-colors uppercase">
              {l}
            </a>
          ))}
        </nav>

        {/* Golden Leaf Border Hamburger Menu */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden p-2.5 flex flex-col items-center justify-center gap-1.5 border-2 border-[#C9A164] rounded-tl-[16px] rounded-br-[16px] rounded-tr-[4px] rounded-bl-[4px] bg-white/50 backdrop-blur-sm"
        >
          <span className="w-5 h-0.5 bg-[#402824]"></span>
          <span className="w-5 h-0.5 bg-[#402824]"></span>
          <span className="w-5 h-0.5 bg-[#402824]"></span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col p-6 gap-4 bg-[#FDF8F4] border-t border-[#C9A164]/20 absolute w-full left-0 shadow-lg rounded-b-[2rem]">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-[#402824] font-serif text-lg text-center uppercase tracking-widest hover:text-[#CB8D88]">
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
