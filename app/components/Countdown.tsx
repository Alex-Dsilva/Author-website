"use client"
import { useState, useEffect } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const now = Date.now()
    let storedTime = localStorage.getItem('bookOfferStartTime')
    
    // If it's their first time visiting, start the 24hr clock and save it
    if (!storedTime) {
      storedTime = now.toString()
      localStorage.setItem('bookOfferStartTime', storedTime)
    }

    const endTime = parseInt(storedTime) + 24 * 60 * 60 * 1000

    const updateTimer = () => {
      const remaining = Math.max(0, endTime - Date.now())
      setTimeLeft(remaining)
    }

    updateTimer()
    const id = setInterval(updateTimer, 1000)
    return () => clearInterval(id)
  }, [])

  // Prevents hydration errors
  if (!mounted) return null
  // Hides the timer visually if the 24 hours have passed
  if (timeLeft === 0) return null 

  const pad = (n: number) => String(n).padStart(2, '0')
  const h = pad(Math.floor(timeLeft / 3600000))
  const m = pad(Math.floor((timeLeft % 3600000) / 60000))
  const s = pad(Math.floor((timeLeft % 60000) / 1000))

  return (
    <div className="flex gap-4 justify-center lg:justify-start">
      {[['Hours', h], ['Minutes', m], ['Seconds', s]].map(([label, val]) => (
        <div key={label} className="text-center p-3 rounded-tl-[16px] rounded-br-[16px] rounded-tr-sm rounded-bl-sm bg-white border border-[#C9A164]/30 min-w-[80px] shadow-sm">
          <div className="text-3xl font-serif font-bold text-[#402824]">{val}</div>
          <div className="text-[10px] uppercase tracking-widest text-[#C9A164] mt-1 font-semibold">{label}</div>
        </div>
      ))}
    </div>
  )
}
