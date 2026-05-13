"use client";

import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";

type ReviewItem = {
  id: number;
  reviewer: string;
  stars: number;
  text: string;
  skin: string;
};

const reviews: ReviewItem[] = [
  { id: 1, reviewer: "Sarah K.", stars: 5, text: "The book feels uplifting and beautifully presented. A true gem!", skin: "#f1c7a3" },
  { id: 2, reviewer: "Amara T.", stars: 5, text: "Lovely cover and elegant feminine branding. Bought two copies.", skin: "#d9a57f" },
  { id: 3, reviewer: "Faith N.", stars: 5, text: "Great for a reader seeking hope, gratitude, and resilience.", skin: "#8d5a3a" },
  { id: 4, reviewer: "Grace M.", stars: 5, text: "Deborah's words speak to the soul. I keep returning to it.", skin: "#c98d64" },
  { id: 5, reviewer: "Elena R.", stars: 5, text: "Stunning 3D presentation and profound words inside.", skin: "#6b442a" },
];

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div style={{
        width: "240px",
        borderRadius: "20px 20px 4px 4px",
        background: "rgba(253,248,244,0.98)",
        border: "1px solid rgba(201,161,100,0.4)",
        boxShadow: "0 15px 35px rgba(64,40,36,0.15)",
        padding: "14px 18px",
        backdropFilter: "blur(10px)",
        color: "#402824",
        fontFamily: "Georgia, serif",
        pointerEvents: "none"
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#C9A164", color: "white", display: "grid", placeItems: "center", fontSize: "14px", fontWeight: "bold" }}>
          {review.reviewer.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "13px" }}>{review.reviewer}</div>
          <div style={{ color: "#C9A164", fontSize: "12px" }}>{"★".repeat(review.stars)}</div>
        </div>
      </div>
      <p style={{ fontSize: "12px", lineHeight: "1.4", fontStyle: "italic", margin: 0 }}>"{review.text}"</p>
    </div>
  );
}

// Added isMobile prop so the 3D object knows how to position itself
function HandAndBook({ review, isActive, wrapped, isMobile }: { review: ReviewItem; isActive: boolean; wrapped: number; isMobile: boolean }) {
  const visualRef = useRef<THREE.Group>(null);
  
  // DYNAMIC MATH: Shrinks and raises the object on mobile to fit the screen
  const finalX = wrapped * (isMobile ? 1.8 : 2.5);
  const finalY = isActive ? (isMobile ? 1.3 : 0.7) : (isMobile ? 0.6 : 0);
  const finalZ = isActive ? 1.5 : -Math.abs(wrapped) * 0.8;
  const scale = isActive ? (isMobile ? 0.85 : 1.1) : (isMobile ? 0.6 : 0.8);

  const spring = useSpring({
    position: [finalX, finalY, finalZ] as any,
    rotation: [0, isActive ? 0 : -wrapped * 0.3, isActive ? 0 : wrapped * -0.1] as any,
    scale: [scale, scale, scale] as any,
    config: { mass: 1, tension: 120, friction: 20 }
  });

  useFrame((state) => {
    if (visualRef.current && isActive) {
      visualRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      visualRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.02;
    }
  });

  return (
    <a.group position={spring.position} rotation={spring.rotation} scale={spring.scale}>
      <group ref={visualRef}>
        {/* Palm */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.7, 0.5, 0.15]} />
          <meshStandardMaterial color={review.skin} roughness={0.7} />
        </mesh>
        {/* Fingers */}
        {[-0.22, -0.07, 0.07, 0.22].map((x) => (
          <mesh key={x} position={[x, 0, 0.02]} castShadow>
            <capsuleGeometry args={[0.06, 0.3, 4, 8]} />
            <meshStandardMaterial color={review.skin} />
          </mesh>
        ))}
        {/* Book */}
        <mesh position={[0, 0.6, 0.05]} castShadow>
          <boxGeometry args={[0.8, 1.15, 0.1]} />
          <meshStandardMaterial color="#402824" />
        </mesh>
        <Html transform position={[0, 0.6, 0.11]} pointerEvents="none">
          <div style={{ width: "94px", height: "132px", borderRadius: "2px", overflow: "hidden" }}>
             <img src="/IMG_20260513_091812.jpg" alt="Book Cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </Html>
        {isActive && (
          <Html transform position={[0, -1.4, 0.15]} pointerEvents="none">
            <ReviewCard review={review} />
          </Html>
        )}
      </group>
    </a.group>
  );
}

export default function ReviewCarousel() {
  const [active, setActive] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  // Checks screen size on load and whenever the window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // Slightly increased minHeight to give extra breathing room on phones
    <div style={{ width: "100%", height: "70vh", minHeight: "550px", position: "relative", background: "transparent" }}>
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 40 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          {reviews.map((r, i) => {
            const middle = Math.floor(reviews.length / 2);
            let wrapped = i - active;
            if (wrapped > middle) wrapped -= reviews.length;
            if (wrapped < -middle) wrapped += reviews.length;
            
            // Passing the isMobile flag down to the 3D items
            return <HandAndBook key={r.id} review={r} isActive={i === active} wrapped={wrapped} isMobile={isMobile} />;
          })}
        </Suspense>
      </Canvas>

      {/* Controls */}
      <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 40, display: "flex", gap: "15px", alignItems: "center" }}>
        <button 
          onClick={() => setActive((a) => (a - 1 + reviews.length) % reviews.length)}
          style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid #C9A164", background: "white", cursor: "pointer", fontSize: "20px", display: "grid", placeItems: "center" }}
        >←</button>
        
        <div style={{ display: "flex", gap: "8px", background: "rgba(255,255,255,0.7)", padding: "8px 12px", borderRadius: "20px", backdropFilter: "blur(5px)" }}>
          {reviews.map((_, i) => (
            <div key={i} onClick={() => setActive(i)} style={{ width: i === active ? "20px" : "8px", height: "8px", borderRadius: "4px", background: i === active ? "#C9A164" : "#C9A16444", transition: "0.3s", cursor: "pointer" }} />
          ))}
        </div>

        <button 
          onClick={() => setActive((a) => (a + 1) % reviews.length)}
          style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid #C9A164", background: "white", cursor: "pointer", fontSize: "20px", display: "grid", placeItems: "center" }}
        >→</button>
      </div>
    </div>
  );
}
