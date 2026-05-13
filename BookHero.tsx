"use client"
import { useState } from 'react'
const links = ['Welcome','About','Book','Gallery','Review','Signup','Contact']
export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header style={{position:'sticky',top:0,zIndex:50,background:'rgba(255,248,246,.95)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(0,0,0,.06)'}}>
      <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 20px',gap:16}}>
        <a href="#welcome" style={{fontWeight:900,textTransform:'uppercase',letterSpacing:'0.12em',fontSize:14,color:'#3b2723',textDecoration:'none'}}>Art of Mind</a>
        <nav style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {links.map(l=><a key={l} href={`#${l.toLowerCase()}`} style={{padding:'8px 12px',borderRadius:999,fontSize:13,fontWeight:800,color:'#5c3c36',textDecoration:'none'}}>{l}</a>)}
        </nav>
        <button onClick={()=>setOpen(o=>!o)} aria-label="Menu"
          style={{position:'relative',width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#f7e4d6,#dca58b)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span style={{position:'absolute',width:20,height:2.5,background:'#fff',borderRadius:99}} />
          <span style={{position:'absolute',width:20,height:2.5,background:'#fff',borderRadius:99,transform:'translateY(-7px)'}} />
          <span style={{position:'absolute',width:20,height:2.5,background:'#fff',borderRadius:99,transform:'translateY(7px)'}} />
          <i style={{position:'absolute',left:6,top:7,width:7,height:13,background:'#86a56a',borderRadius:'100% 0 100% 0',transform:'rotate(-40deg)'}} />
          <i style={{position:'absolute',right:6,top:7,width:7,height:13,background:'#86a56a',borderRadius:'0 100% 0 100%',transform:'rotate(40deg)'}} />
          <i style={{position:'absolute',left:4,bottom:7,width:6,height:11,background:'#86a56a',borderRadius:'100% 0 100% 0',transform:'rotate(-70deg)'}} />
          <i style={{position:'absolute',right:4,bottom:7,width:6,height:11,background:'#86a56a',borderRadius:'0 100% 0 100%',transform:'rotate(70deg)'}} />
        </button>
      </div>
      {open&&<div style={{maxWidth:1200,margin:'0 auto',padding:'0 20px 16px',display:'grid',gap:8}}>
        {links.map(l=><a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setOpen(false)}
          style={{display:'block',padding:'14px 18px',borderRadius:18,background:'#fff',border:'1px solid #ead8d3',fontWeight:900,fontSize:15,color:'#3b2723',textDecoration:'none'}}>{l}</a>)}
      </div>}
    </header>
  )
}
