"use client"
import { useState, useEffect } from 'react'

// Make sure these match the import paths that worked for you!
import Navbar from "../components/Navbar"
import BookHero from "../components/BookHero"
import Countdown from "../components/Countdown"
import ReviewCarousel from "../components/ReviewCarousel"

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

  // Simulate fetching dynamic price from Lulu API
  useEffect(() => {
    setTimeout(() => {
      setPrice("$19.99") // Replace this with actual Lulu API fetch later
    }, 1500)
  }, [])

  return (
    <main className="bg-[#fff8f6] text-[#3b2723] min-h-screen font-sans">
      
      {/* 1. NAVBAR COMPONENT */}
      <Navbar />

      {/* 2. WELCOME PAGE */}
      <section id="welcome" className="min-h-[80vh] flex flex-col items-center justify-center pt-10">
        <BookHero />
      </section>

      {/* 3. ABOUT PAGE */}
      <section id="about" className="max-w-6xl mx-auto p-6 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 aspect-square bg-[#ead8d3] rounded-3xl overflow-hidden shadow-xl">
          <img src="/IMG_20260513_091812.jpg" alt="Deborah M Tungnung" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-serif mb-6">About the Author</h2>
          <p className="text-lg leading-relaxed text-[#7c615b] mb-4">
            Deborah M Tungnung weaves intricate tales that speak directly to the soul. With a passion for uncovering the depths of human emotion, her work is recognized for its elegant feminine branding and uplifting messages.
          </p>
          <p className="text-lg leading-relaxed text-[#7c615b]">
            "Art of Mind" is her latest masterpiece, designed to offer comfort and inspiration to readers worldwide.
          </p>
        </div>
      </section>

      {/* 4. BOOK PAGE WITH LULU API & COUNTDOWN */}
      <section id="book" className="bg-[#f7e4d6] py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Special Limited Offer</h2>
          <p className="mb-8 text-[#7c615b]">Grab your copy directly from the publisher.</p>
          
          <div className="mb-8">
            <Countdown />
          </div>

          <div className="text-2xl mb-6">
            Current Price: <span className="font-bold text-[#86a56a] text-4xl">{price}</span>
          </div>

          <button className="px-10 py-4 bg-[#3b2723] text-white font-bold rounded-full hover:bg-black transition-all shadow-lg w-full md:w-auto">
            Purchase via Lulu
          </button>
        </div>
      </section>

      {/* 5. GALLERY PAGE */}
      <section id="gallery" className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-serif text-center mb-12">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-square bg-[#ead8d3] rounded-2xl overflow-hidden shadow-md">
              <img src={src} alt={`Gallery Image ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* 6. 3D REVIEW SECTION */}
      <section id="review" className="py-20 px-6 bg-gradient-to-b from-[#fff8f6] to-[#f7e4d6] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif mb-4 text-center">What Readers Say</h2>
          <p className="text-lg text-[#7c615b] mb-12 text-center">See why readers around the world are connecting with Art of Mind.</p>
          
          <ReviewCarousel />
          
        </div>
      </section>

      {/* 7. SIGNUP PAGE */}
      <section id="signup" className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif mb-4">Be the First to Know</h2>
          <p className="text-lg text-[#7c615b] mb-8">Join the VIP list to get a sneak peek at Deborah's upcoming work and exclusive content.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-4 rounded-full border border-[#ead8d3] focus:outline-none focus:ring-2 focus:ring-[#dca58b]"
              required
            />
            <button type="submit" className="px-8 py-4 bg-[#dca58b] text-white font-bold rounded-full hover:bg-[#c98d7d] transition-colors shadow-md">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* 8. CONTACT & FOOTER */}
      <section id="contact" className="bg-[#3b2723] text-[#f7e4d6] py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          <div>
            <h2 className="text-3xl font-serif mb-6">Get in Touch</h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" className="p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#dca58b]" />
              <input type="email" placeholder="Your Email" className="p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#dca58b]" />
              <textarea placeholder="Your Message" rows={4} className="p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#dca58b]"></textarea>
              <button type="submit" className="px-6 py-4 bg-[#86a56a] text-white font-bold rounded-xl hover:bg-[#6b8554] transition-colors">
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-serif mb-4">Connect</h3>
            <p className="mb-6 opacity-80">I would love to hear your thoughts on the book or answer any questions you might have.</p>
            <div className="flex gap-4 mb-8">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#dca58b] transition-colors">IG</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#dca58b] transition-colors">FB</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#dca58b] transition-colors">X</a>
            </div>
            <p className="opacity-80">Email: hello@example.com</p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/10 opacity-60 text-sm">
          &copy; {new Date().getFullYear()} Deborah M Tungnung. All rights reserved.
        </div>
      </section>

    </main>
  )
}
