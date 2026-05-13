"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { useRef, useState, Suspense, useEffect } from "react";
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

type HandProps = {
  review: ReviewItem;
  index: number;
  total: number;
  activeIndex: number;
  isMobile: boolean; // New prop to handle responsive 3D positioning
};

function StarRow({ stars }: { stars: number }) {
  return (
    <div style={{ color: "#C9A164", fontSize: 13, letterSpacing: 2 }}>
      {"★".repeat(stars)}
      <span style={{ opacity: 0.3 }}>{"★".repeat(5 - stars)}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div
      style={{
        width: 250, 
        borderRadius: "24px 24px 4px 4px",
        background: "rgba(253,248,244,0.98)",
        border: "1px solid rgba(201,161,100,0.4)",
        boxShadow: "0 20px 40px rgba(64,40,36,0.15)",
        padding: "14px 18px",
        backdropFilter: "blur(12px)",
        color: "#402824",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            display: "grid",
            placeItems: "center",
            background: "#C9A164",
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "sans-serif"
          }}
        >
          {review.reviewer.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "sans-serif" }}>{review.reviewer}</div>
          <StarRow stars={review.stars} />
        </div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.4, fontStyle: "italic", opacity: 0.9 }}>
        "{review.text}"
      </div>
    </div>
  );
}

function BookFace() {
  return (
    <div
      style={{
        width: 92,
        height: 130,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        backgroundColor: "#CB8D88"
      }}
    >
      <img 
        src="/1000033650.jpg" 
        alt="Art of Mind Cover" 
        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
      />
    </div>
  );
}

function ProceduralHand({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, -0.46, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.78, 0.62, 0.2]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
      </mesh>
      {[-0.25, -0.08, 0.08, 0.25].map((x, i) => (
        <mesh
          key={x}
          castShadow
          receiveShadow
          position={[x, -0.02 + (i === 0 || i === 3 ? -0.03 : 0.01), 0.02]}
        >
          <capsuleGeometry args={[0.07, 0.34, 4, 10]} />
          <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
        </mesh>
      ))}
      <mesh
        castShadow
        receiveShadow
        position={[-0.42, -0.44, 0.05]}
        rotation={[0, 0, -0.9]}
      >
        <capsuleGeometry args={[0.075, 0.24, 4, 10]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
}

function HandCard({ review, index, total, activeIndex, isMobile }: HandProps) {
  const visualRef = useRef<any>(null);

  const middle = Math.floor(total / 2);
  const relative = index - activeIndex;
  let wrapped = relative;
  if (relative > middle) wrapped = relative - total;
  if (relative < -middle) wrapped = relative + total;

  const isActive = index === activeIndex;
  
  // DYNAMIC POSITIONING: Adjusts Y height and Scale based on whether it is a mobile phone or PC
  const finalX = wrapped * 2.45;
  const finalY = isActive ? (isMobile ? 1.1 : 0.3) : (isMobile ? 0.2 : -0.2); 
  const finalZ = isActive ? 1.45 : -Math.abs(wrapped) * 0.55;
  const finalRotY = isActive ? 0 : -wrapped * 0.32;
  const finalRotZ = isActive ? 0 : wrapped * -0.08;
  const finalScale = isActive ? (isMobile ? 1.05 : 1.2) : 0.86;

  const spring = useSpring({
    position: [finalX, finalY, finalZ] as any,
    rotation: [0, finalRotY, finalRotZ] as any,
    scale: [finalScale, finalScale, finalScale] as any,
    config: { mass: 1.1, tension: 125, friction: 20 },
  });

  useFrame((state) => {
    const g = visualRef.current;
    if (!g || !isActive) return;
    g.position.y = finalY + Math.sin(state.clock
