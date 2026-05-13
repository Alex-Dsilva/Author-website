"use client"
import { useState, useEffect } from 'react'

// Corrected relative imports for your setup
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
  const [rating, setRating] = useState(5) 
  const [mounted, setMounted] = useState(false)
  const [offerExpired, setOfferExpired] = useState(false)
  
  // Dynamic Pricing States
  const [price, setPrice] = useState("Loading...")
  const [originalPrice, setOriginalPrice] = useState("...")

  useEffect(() => {
    setMounted(true)
    
    // 1. Check if the 24-hour urgency offer has expired
    const checkExpiration = () => {
      const storedTime = localStorage.getItem('bookOfferStartTime')
      if (storedTime && Date.now() > parseInt(storedTime) + 24 * 60 * 60 * 1000) {
        setOfferExpired(true)
      }
    }
    checkExpiration()
    const id = setInterval(checkExpiration, 1000)

    // 2. Fetch Currency based on IP (NO POPUPS!)
    const fetchLocalCurrency = async () => {
      try {
        // This free API checks their IP address, not their GPS, so it never asks for permission
        const res = await fetch('https://ipapi.co/json/')
        const data = await res.json()
        
        switch(data.currency) {
          case 'GBP': // United Kingdom
            setPrice('£15.99')
            setOriginalPrice('£31.99')
            break
          case 'EUR': // Europe
            setPrice('€18.99')
            setOriginalPrice('€37.99')
            break
          case 'INR': // India
            setPrice('₹299')
            setOriginalPrice('₹499')
            break
          case 'CAD': // Canada
            setPrice('CA$26.99')
            setOriginalPrice('CA$54.99')
            break
          case 'AUD': // Australia
            setPrice('AU$27.99')
            setOriginalPrice('AU$55.99')
            break
          default: // Default to USD for US and unsupported regions
            setPrice('$19.99')
            setOriginalPrice('$39.99')
        }
      } catch (error) {
        // Fallback safely to USD if they have a strict ad-blocker or VPN
        setPrice('$19.99')
        setOriginalPrice('$39.99')
      }
    }

    fetchLocalCurrency()

    return () => clearInterval(id)
  }, [])

  return (
    <main className="bg-[#FDF8F4] text-[#402824] min-h-screen font-sans selection:bg-[#CB8D88] selection:text-white">
      
      <Navbar />

      {/* ================= 1. WELCOME PAGE ================= */}
      <section id="welcome" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-12">
        <h2 className="text-sm md:text-lg uppercase tracking-[0.3em] text-[#C9A164] font-semibold mb-4">Welcome</h2>
        <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-8 text-[#402824]">Art of Mind</h1>
        
        <div className="max-w-2xl mx-auto px-4 mt-4">
          <p className="text-xl md:text-2xl font-light italic text-[#402824]/80 mb-6 leading-relaxed">
            "To heal is not to erase the scars, but to turn them into art. The most profound journey we take is the one inward, exploring the quiet landscapes of our own minds."
          </p>
        </div>
        
        <a href="#about" className="mt-8 px-10 py-4 bg-transparent border-2 border-[#C9A164] text-[#C9A164] font-serif uppercase tracking-widest hover:bg-[#C9A164] hover:text-white transition-all duration-500 ease-in-out rounded-tl-[24px] rounded-br-[24px] rounded-tr-sm rounded-bl-sm">
          Discover the mind behind the words
        </a>
      </section>

      {/* ================= 2. ABOUT PAGE ================= */}
      <section id="about" className="max-w-6xl mx-auto p-6 py-24 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-5/12">
           <img src="/IMG-20260513-WA0000.jpg" alt="Deborah M Tungnung" className="w-full h-auto rounded-tl-[80px] rounded-br-[80px] rounded-tr-[10px] rounded-bl-[10px] shadow-2xl border-4 border-white object-cover" />
        </div>
        <div className="w-full md:w-7/12 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-sm uppercase tracking-[0.3em] text-[#C9A164] font-semibold mb-2">The Author</h2>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-[#402824]">Deborah M Tungnung</h2>
          <p className="text-lg leading-relaxed text-[#402824]/80 mb-6 font-light">
            Deborah is a visionary author and advocate for mental wellness. She weaves intricate tales that speak directly to the soul, combining beautiful prose with transformative insights.
          </p>
          <p className="text-lg leading-relaxed text-[#402824]/80 font-light">
            With her elegant, minimalist approach, she invites readers on a journey of resilience, self-discovery, and profound healing through the art of the mind.
          </p>
        </div>
      </section>

      {/* ================= 3. BOOK PAGE (SELL SECTION) ================= */}
      <section id="book" className="py-24 px-6 border-y border-[#C9A164]/20 bg-gradient-to-b from-[#FDF8F4] to-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-1/2 flex justify-center py-10">
            <div className="relative p-12 bg-gradient-to-tr from-[#CB8D88]/10 to-[#C9A164]/10 rounded-tl-[100px] rounded-br-[100px] rounded-tr-[20px] rounded-bl-[20px] border border-[#C9A164]/30 shadow-lg flex items-center justify-center">
              <BookHero />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[#C9A164] font-semibold mb-2">Limited Edition</h2>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#402824]">Order Your Copy</h2>
            
            {/* Dynamic Expiration UI */}
            {mounted && offerExpired ? (
              <div className="mb-10 w-full max-w-md">
                <p className="text-lg text-[#CB8D88] mb-4 font-serif italic">The introductory offer has ended.</p>
                <p className="text-md text-[#402824]/70 font-light">Don't worry, you can still purchase the beautifully crafted physical copy at its original price below.</p>
              </div>
            ) : (
              <>
                <p className="text-lg text-[#402824]/70 mb-10 max-w-md font-light">
                  Secure your beautifully crafted physical copy directly from the publisher. Includes exclusive author content.
                </p>
                <div className="mb-10 w-full max-w-md flex justify-center lg:justify-start">
                  <Countdown />
                </div>
              </>
            )}

            <div className="text-xl mb-8 font-serif text-[#402824]/60 uppercase tracking-widest flex flex-col items-center lg:items-start gap-2">
              {mounted && offerExpired ? (
                <div>Price <span className="font-bold text-[#402824] text-4xl ml-4 normal-case">{originalPrice}</span></div>
              ) : mounted ? (
                <div className="flex items-center gap-4">
                  <span className="line-through text-[#402824]/40 text-2xl">{originalPrice}</span>
                  <span className="font-bold text-[#CB8D88] text-4xl normal-case">{price}</span>
                </div>
              ) : (
                <div className="h-10"></div> /* Placeholder during loading to prevent layout shift */
              )}
            </div>

            <button className="px-14 py-5 bg-[#402824] text-[#C9A164] font-serif tracking-widest uppercase hover:bg-[#CB8D88] hover:text-white transition-all duration-300 rounded-tl-[24px] rounded-br-[24px] rounded-tr-[4px] rounded-bl-[4px] shadow-xl w-full sm:w-auto">
              Purchase via Lulu
            </button>
          </div>
        </div>
      </section>

      {/* ================= 4. GALLERY PAGE ================= */}
      <section id="gallery" className="max-w-6xl mx-auto py-32 px-6">
        <h2 className="text-sm uppercase tracking-[0.3em] text-[#C9A164] font-semibold mb-4 text-center">Aesthetics</h2>
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-[#402824]">Visual Journey</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-[4/5] overflow-hidden bg-white/50 group shadow-sm border border-[#C9A164]/20 rounded-tl-[40px] rounded-br-[40px] rounded-tr-md rounded-bl-md">
              <img src={src} alt={`Gallery Image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. REVIEWS & FORM ================= */}
      <section id="review" className="py-32 px-6 bg-white border-y border-[#C9A164]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] text-[#C9A164] font-semibold mb-4 text-center">Testimonials</h2>
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center text-[#402824]">Reader Experiences</h2>
          
          <ReviewCarousel />

          <div className="mt-24 max-w-2xl mx-auto bg-[#FDF8F4] p-8 md:p-12 rounded-tl-[60px] rounded-br-[60px] rounded-tr-[10px] rounded-bl-[10px] border border-[#C9A164]/30 shadow-lg">
            <h3 className="text-3xl font-serif mb-2 text-center text-[#402824]">Share Your Thoughts</h3>
            <p className="text-center text-[#402824]/60 mb-6 font-light italic">How did Art of Mind impact your journey?</p>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className={`text-4xl transition-colors ${rating >= star ? 'text-[#C9A164]' : 'text-[#C9A164]/30'}`}>
                    ★
                  </button>
                ))}
              </div>
              <input type="text" placeholder="Your Name" className="p-4 bg-white border border-[#C9A164]/30 focus:outline-none focus:border-[#C9A164] font-serif placeholder-[#402824]/40 rounded-tl-[16px] rounded-br-[16px]" />
              <textarea placeholder="Write your review here..." rows={4} className="p-4 bg-white border border-[#C9A164]/30 focus:outline-none focus:border-[#C9A164] font-serif placeholder-[#402824]/40 rounded-tl-[16px] rounded-br-[16px]"></textarea>
              <button type="submit" className="py-4 bg-[#C9A164] text-white font-serif uppercase tracking-widest hover:bg-[#CB8D88] transition-colors rounded-tl-[24px] rounded-br-[24px]">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= 6. SIGNUP ================= */}
      <section id="signup" className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] text-[#C9A164] font-semibold mb-4">Newsletter</h2>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#402824]">Join the Inner Circle</h2>
          <p className="text-lg text-[#402824]/70 mb-10 font-light italic">Receive gentle updates on upcoming works, poetry snippets, and exclusive content.</p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto shadow-xl rounded-tl-[30px] rounded-br-[30px] overflow-hidden" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your elegant email address..." className="flex-1 px-6 py-5 bg-white border-none focus:outline-none font-serif placeholder-[#402824]/40" required />
            <button type="submit" className="px-10 py-5 bg-[#402824] text-[#C9A164] font-serif uppercase tracking-widest hover:bg-[#CB8D88] hover:text-white transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ================= 7. FOOTER ================= */}
      <footer id="contact" className="bg-[#402824] text-[#FDF8F4] py-20 px-6 border-t-[6px] border-[#C9A164]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-3xl font-serif mb-6 text-[#C9A164] tracking-widest uppercase">Deborah M Tungnung</h3>
            <p className="text-[#FDF8F4]/60 font-light leading-relaxed max-w-xs italic">
              "Let go of who you think you're supposed to be; embrace who you are."
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm uppercase tracking-widest mb-6 text-[#C9A164] font-semibold">Explore</h4>
            <div className="flex flex-col gap-4">
              <a href="#about" className="text-[#FDF8F4]/70 hover:text-[#CB8D88] font-serif transition-colors">About the Author</a>
              <a href="#book" className="text-[#FDF8F4]/70 hover:text-[#CB8D88] font-serif transition-colors">Purchase the Book</a>
              <a href="#gallery" className="text-[#FDF8F4]/70 hover:text-[#CB8D88] font-serif transition-colors">Visual Aesthetics</a>
              <a href="#review" className="text-[#FDF8F4]/70 hover:text-[#CB8D88] font-serif transition-colors">Reader Stories</a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm uppercase tracking-widest mb-6 text-[#C9A164] font-semibold">Connect</h4>
            <p className="text-[#FDF8F4]/60 mb-6 font-light">For press inquiries, literary events, or reader letters.</p>
            <a href="mailto:hello@deborahmtungnung.com" className="text-xl font-serif text-[#FDF8F4] hover:text-[#CB8D88] transition-colors border-b border-[#C9A164]/30 pb-1 mb-8">
              hello@deborahmtungnung.com
            </a>
            <div className="flex gap-6">
              <a href="#" className="text-[#FDF8F4]/60 hover:text-[#CB8D88] font-serif uppercase tracking-widest text-sm transition-colors">Instagram</a>
              <a href="#" className="text-[#FDF8F4]/60 hover:text-[#CB8D88] font-serif uppercase tracking-widest text-sm transition-colors">X / Twitter</a>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-[#FDF8F4]/10 text-[#FDF8F4]/40 text-xs tracking-[0.2em] uppercase">
          &copy; {new Date().getFullYear()} Deborah M Tungnung. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
