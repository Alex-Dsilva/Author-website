"use client"
import { useState, useEffect } from 'react'

// Corrected exactly as you requested!
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

export default function Home() {
  const [price, setPrice] = useState("Loading...")

  useEffect(() => {
    setTimeout(() => {
      setPrice("$19.99") 
    }, 1500)
  }, [])

  return (
    // The main wrapper now includes the Golden Petal background pattern
    <main className="bg-[#FAF7F2] text-[#2C201C] min-h-screen font-sans selection:bg-[#D4AF37] selection:text-white relative"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C30 16.5685 16.5685 30 0 30C16.5685 30 30 43.4315 30 60C30 43.4315 43.4315 30 60 30C43.4315 30 30 16.5685 30 0Z' fill='%23D4AF37' fill-opacity='0.06' fill-rule='evenodd'/%3E%3C/svg%3E")` }}>
      
      <Navbar />

      {/* ================= 1. WELCOME PAGE (Eager Excitement) ================= */}
      <section id="welcome" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-12 relative z-10">
        <h2 className="text-sm md:text-lg uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-4">Welcome</h2>
        <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-8 text-[#2C201C]">Art of Mind</h1>
        
        <p className="text-xl md:text-2xl font-light italic text-[#2C201C]/80 mb-6 max-w-2xl leading-relaxed">
          A sanctuary for the overwhelmed. A journey for the soul. <br/>
          Are you ready to turn the page and discover who you truly are?
        </p>
        
        <a href="#book" className="mt-8 px-10 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-serif uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all duration-500 ease-in-out">
          Begin the Journey
        </a>

        {/* Bouncing scroll indicator */}
        <div className="absolute bottom-10 animate-bounce text-[#D4AF37]">
          ↓
        </div>
      </section>

      {/* ================= 2. ABOUT PAGE ================= */}
      <section id="about" className="max-w-6xl mx-auto p-6 py-32 flex flex-col md:flex-row items-center gap-16 relative z-10 bg-[#FAF7F2]/80 backdrop-blur-sm rounded-3xl my-10 border border-[#D4AF37]/10 shadow-sm">
        <div className="w-full md:w-5/12">
           <img src="/IMG-20260513-WA0000.jpg" alt="Deborah M Tungnung" className="w-full h-auto rounded-t-full shadow-2xl border-4 border-white" />
        </div>
        <div className="w-full md:w-7/12 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-[#2C201C]">About the Author</h2>
          <p className="text-lg leading-relaxed text-[#2C201C]/80 mb-6 font-light">
            Deborah is a visionary author and advocate for mental wellness. She weaves intricate tales that speak directly to the soul, combining beautiful prose with transformative insights.
          </p>
          <p className="text-lg leading-relaxed text-[#2C201C]/80 font-light">
            With her elegant, minimalist approach, she invites readers on a journey of resilience, self-discovery, and profound healing through the art of the mind.
          </p>
        </div>
      </section>

      {/* ================= 3. BOOK PAGE (SELL SECTION) ================= */}
      <section id="book" className="py-24 px-6 border-y border-[#D4AF37]/20 relative z-10 bg-gradient-to-b from-[#FAF7F2] to-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-1/2 flex justify-center scale-90 md:scale-100 drop-shadow-2xl">
            <BookHero />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-2">Limited Edition</h2>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#2C201C]">Order Your Copy</h2>
            <p className="text-lg text-[#2C201C]/70 mb-10 max-w-md font-light">
              Secure your beautifully crafted physical copy directly from the publisher. Includes exclusive author content.
            </p>
            
            <div className="mb-10 w-full max-w-md">
              <Countdown />
            </div>

            <div className="text-xl mb-8 font-serif text-[#2C201C]/60 uppercase tracking-widest">
              Current Price <span className="font-bold text-[#2C201C] text-4xl ml-4 normal-case">{price}</span>
            </div>

            <button className="px-14 py-5 bg-[#2C201C] text-[#D4AF37] font-serif tracking-widest uppercase hover:bg-[#1A1310] hover:scale-[1.02] transition-all duration-300 shadow-2xl w-full sm:w-auto">
              Purchase via Lulu
            </button>
          </div>
        </div>
      </section>

      {/* ================= 4. GALLERY PAGE ================= */}
      <section id="gallery" className="max-w-6xl mx-auto py-32 px-6 relative z-10">
        <h2 className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-4 text-center">Aesthetics</h2>
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-[#2C201C]">Visual Journey</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-[4/5] overflow-hidden bg-white/50 group rounded-sm shadow-sm border border-[#D4AF37]/10">
              <img src={src} alt={`Gallery Image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. REVIEWS & FORM ================= */}
      <section id="review" className="py-32 px-6 relative z-10 bg-white border-y border-[#D4AF37]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-4 text-center">Testimonials</h2>
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center text-[#2C201C]">Reader Experiences</h2>
          
          <ReviewCarousel />

          {/* Leave a Review Form */}
          <div className="mt-24 max-w-2xl mx-auto bg-[#FAF7F2] p-8 md:p-12 rounded-2xl border border-[#D4AF37]/20 shadow-lg">
            <h3 className="text-3xl font-serif mb-2 text-center text-[#2C201C]">Share Your Thoughts</h3>
            <p className="text-center text-[#2C201C]/60 mb-8 font-light italic">How did Art of Mind impact your journey?</p>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-6">
                <input type="text" placeholder="Your Name" className="flex-1 p-4 bg-white border border-[#D4AF37]/30 rounded-none focus:outline-none focus:border-[#D4AF37] font-serif placeholder-[#2C201C]/40" />
                <select className="p-4 bg-white border border-[#D4AF37]/30 rounded-none focus:outline-none focus:border-[#D4AF37] font-serif text-[#2C201C]/70">
                  <option value="5">★★★★★ - Masterpiece</option>
                  <option value="4">★★★★☆ - Beautiful</option>
                  <option value="3">★★★☆☆ - Good</option>
                </select>
              </div>
              <textarea placeholder="Write your review here..." rows={4} className="p-4 bg-white border border-[#D4AF37]/30 rounded-none focus:outline-none focus:border-[#D4AF37] font-serif placeholder-[#2C201C]/40"></textarea>
              <button type="submit" className="py-4 bg-[#D4AF37] text-white font-serif uppercase tracking-widest hover:bg-[#C5A028] transition-colors">
                Submit Review
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ================= 6. SIGNUP ================= */}
      <section id="signup" className="py-32 px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-4">Newsletter</h2>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#2C201C]">Join the Inner Circle</h2>
          <p className="text-lg text-[#2C201C]/70 mb-10 font-light italic">Receive gentle updates on upcoming works, poetry snippets, and exclusive content.</p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto shadow-xl" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your elegant email address..." 
              className="flex-1 px-6 py-5 bg-white border border-[#D4AF37]/30 border-r-0 focus:outline-none font-serif placeholder-[#2C201C]/40"
              required
            />
            <button type="submit" className="px-10 py-5 bg-[#2C201C] text-[#D4AF37] font-serif uppercase tracking-widest hover:bg-[#1A1310] transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ================= 7. LUXURY FOOTER ================= */}
      <footer id="contact" className="bg-[#1A1310] text-[#FAF7F2] py-20 px-6 relative z-10 border-t-4 border-[#D4AF37]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-3xl font-serif mb-6 text-[#D4AF37] tracking-widest uppercase">Art of Mind</h3>
            <p className="text-[#FAF7F2]/60 font-light leading-relaxed max-w-xs italic">
              "Let go of who you think you're supposed to be; embrace who you are."
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm uppercase tracking-widest mb-6 text-[#D4AF37] font-semibold">Explore</h4>
            <div className="flex flex-col gap-4">
              <a href="#about" className="text-[#FAF7F2]/70 hover:text-[#D4AF37] font-serif transition-colors">About the Author</a>
              <a href="#book" className="text-[#FAF7F2]/70 hover:text-[#D4AF37] font-serif transition-colors">Purchase the Book</a>
              <a href="#gallery" className="text-[#FAF7F2]/70 hover:text-[#D4AF37] font-serif transition-colors">Visual Aesthetics</a>
              <a href="#review" className="text-[#FAF7F2]/70 hover:text-[#D4AF37] font-serif transition-colors">Reader Stories</a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm uppercase tracking-widest mb-6 text-[#D4AF37] font-semibold">Connect</h4>
            <p className="text-[#FAF7F2]/60 mb-6 font-light">For press inquiries, literary events, or reader letters.</p>
            <a href="mailto:hello@deborahmtungnung.com" className="text-xl font-serif text-[#FAF7F2] hover:text-[#D4AF37] transition-colors border-b border-[#D4AF37]/30 pb-1 mb-8">
              hello@deborahmtungnung.com
            </a>
            
            <div className="flex gap-6">
              <a href="#" className="text-[#FAF7F2]/60 hover:text-[#D4AF37] font-serif uppercase tracking-widest text-sm transition-colors">Instagram</a>
              <a href="#" className="text-[#FAF7F2]/60 hover:text-[#D4AF37] font-serif uppercase tracking-widest text-sm transition-colors">X / Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-[#FAF7F2]/10 text-[#FAF7F2]/40 text-xs tracking-[0.2em] uppercase">
          &copy; {new Date().getFullYear()} Deborah M Tungnung. All rights reserved.
        </div>
      </footer>

    </main>
  )
}
