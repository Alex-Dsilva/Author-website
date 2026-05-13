"use client"
import { useState, useEffect } from 'react'
export default function Countdown() {
  const [end] = useState(()=>Date.now()+24*60*60*1000)
  const [t, setT] = useState(24*60*60*1000)
  useEffect(()=>{
    const id=setInterval(()=>setT(Math.max(0,end-Date.now())),1000)
    return ()=>clearInterval(id)
  },[end])
  const pad=(n:number)=>String(n).padStart(2,'0')
  const h=pad(Math.floor(t/3600000)), m=pad(Math.floor((t%3600000)/60000)), s=pad(Math.floor((t%60000)/1000))
  return (
    <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:16}}>
      {[['Hours',h],['Minutes',m],['Seconds',s]].map(([label,val])=>(
        <div key={label} style={{textAlign:'center',padding:'12px 14px',borderRadius:18,background:'#fff',border:'1px solid #ead8d3',minWidth:80}}>
          <div style={{fontSize:28,fontWeight:900}}>{val}</div>
          <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.12em',color:'#7c615b'}}>{label}</div>
        </div>
      ))}
    </div>
  )
}
