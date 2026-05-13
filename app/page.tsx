"use client"
import { useState, useEffect } from 'react'

// Make sure these match the import paths that worked for you!
import Navbar from "./components/Navbar"
import BookHero from "./components/BookHero"
import Countdown from "./components/Countdown"
import ReviewCarousel from "./components/ReviewCarousel"

const galleryImages = [
  "/IMG-20260513-WA0000.jpg", 
  "/IMG-20260513-WA0001.jpg", 
  "/IMG-20260513-WA0002.jpg", 
  "/IMG-20260513-WA0003.jpg", 
  "/IMG-20260513-WA0004.jpg",
  "/IMG-20260513-WA0007.jpg"
]

eexport default function Home() {
  const [price, setPrice] = useState("Loading...")

  // Simulate fetching dynamic price from Lulu API
  useEffect(() => {
    setTimeout(() => {
      setPrice("$19.99") 
    }, 1500)
  }, [])

  return (
    <main className="bg-[#FAF7F2] text-[#2C201C] min-h-screen font-sans selection:bg-[#9BA98E] selection:text-white">
      
      <Navbar />

      {/* ================= 1. WELCOME PAGE ================= */}
      <section id="welcome" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-12 bg-gradient-to-b from-[#E8D5C8]/40 to-[#FAF7F2]">
        <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-6 text-[#2C201C]">Art of Mind</h1>
        <p className="text-xl md:text-3xl font-light italic text-[#9BA98E] mb-12">By Deborah M Tungnung</p>
        
        <div className="max-w-2xl mx-auto bg-white/50 p-8 md:p-12 rounded-3xl border border-[#E8D5C8]/50 shadow-sm">
          <p className="text-lg md:text-2xl leading-relaxed text-[#2C201C]/80 font-serif italic">
            "Let go of who you think you're supposed to be; embrace who you are."
          </p>
          <span className="text-sm uppercase tracking-widest mt-6 block font-semibold text-[#9BA98E]">- Brené Brown</span>
        </div>
      </section>

      {/* ================= 2. ABOUT PAGE ================= */}
      <section id="about" className="max-w-6xl mx-auto p-6 py-24 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-5/12">
           {/* Using the first image for the Author section */}
           <img src="/IMG-20260513-WA0000.jpg" alt="Deborah M Tungnung" className="w-full h-auto rounded-t-full shadow-xl border-4 border-white" />
        </div>
        <div className="w-full md:w-7/12 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-[#2C201C]">About the Author</h2>
          <p className="text-lg leading-relaxed text-[#2C201C]/80 mb-6">
            Deborah is a visionary author and advocate for mental wellness. She weaves intricate tales that speak directly to the soul, combining beautiful prose with transformative insights.
          </p>
          <p className="text-lg leading-relaxed text-[#2C201C]/80">
            With her elegant, minimalist approach, she invites readers on a journey of resilience, self-discovery, and profound healing through the art of the mind.
          </p>
        </div>
      </section>

      {/* ================= 3. BOOK PAGE (SELL SECTION) ================= */}
      <section id="book" className="bg-[#E8D5C8]/30 py-24 px-6 border-y border-[#E8D5C8]/50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-1/2 flex justify-center scale-90 md:scale-100">
            <BookHero />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#2C201C]">Order Your Copy</h2>
            <p className="text-lg text-[#2C201C]/80 mb-10 max-w-md">
              Secure your limited edition copy directly from the publisher. Includes exclusive author content.
            </p>
            
            <div className="mb-10 w-full max-w-md">
              <Countdown />
            </div>

            <div className="text-2xl mb-8 font-serif">
              Current Price: <span className="font-bold text-[#9BA98E] text-4xl ml-2">{price}</span>
            </div>

            <button className="px-12 py-4 bg-[#9BA98E] text-white font-semibold tracking-widest uppercase rounded-sm hover:bg-[#839276] transition-all shadow-md w-full sm:w-auto">
              Purchase via Lulu
            </button>
          </div>
        </div>
      </section>

      {/* ================= 4. GALLERY PAGE ================= */}
      <section id="gallery" className="max-w-6xl mx-auto py-24 px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-[#2C201C]">Visual Journey</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-[4/5] overflow-hidden bg-[#E8D5C8]/20 group rounded-sm">
              <img src={src} alt={`Gallery Image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. REVIEWS ================= */}
      <section id="review" className="py-24 px-6 bg-[#FAF7F2] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-12 text-center text-[#2C201C]">Reader Experiences</h2>
          <ReviewCarousel />
        </div>
      </section>

      {/* ================= 6. SIGNUP & CONTACT ================= */}
      <section id="signup" className="py-24 px-6 text-center bg-[#2C201C] text-[#FAF7F2]">
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-serif mb-4">Join the List</h2>
          <p className="text-lg text-[#FAF7F2]/70 mb-8">Receive gentle updates on upcoming works, poetry snippets, and exclusive content.</p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 rounded-t-sm sm:rounded-l-sm sm:rounded-tr-none border-none text-[#2C201C] focus:outline-none focus:ring-2 focus:ring-[#9BA98E]"
              required
            />
            <button type="submit" className="px-8 py-4 bg-[#9BA98E] text-white font-bold rounded-b-sm sm:rounded-r-sm sm:rounded-bl-none hover:bg-[#839276] transition-colors uppercase tracking-widest text-sm">
              Subscribe
            </button>
          </form>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-12 border-t border-[#FAF7F2]/10">
          <div>
            <h3 className="text-2xl font-serif mb-6">Connect</h3>
            <p className="mb-8 text-[#FAF7F2]/70 max-w-sm">I would love to hear how the book resonated with you, or answer any press inquiries.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 flex items-center justify-center hover:bg-[#9BA98E] transition-colors">IG</a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 flex items-center justify-center hover:bg-[#9BA98E] transition-colors">FB</a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 flex items-center justify-center hover:bg-[#9BA98E] transition-colors">X</a>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#FAF7F2]/70 mb-2">General Inquiries</p>
            <a href="mailto:hello@deborahmtungnung.com" className="text-xl font-serif hover:text-[#9BA98E] transition-colors">hello@deborahmtungnung.com</a>
          </div>
        </div>
        
        <div className="text-center pt-16 opacity-50 text-xs tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Deborah M Tungnung. All rights reserved.
        </div>
      </section>

    </main>
  )
}
