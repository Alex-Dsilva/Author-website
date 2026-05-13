"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { useRef, useState, Suspense } from "react";

type ReviewItem = {
  id: number;
  reviewer: string;
  stars: number;
  text: string;
  skin: string;
};

// Your actual reviews
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
};

function StarRow({ stars }: { stars: number }) {
  return (
    <div style={{ color: "#C9A164", fontSize: 14, letterSpacing: 2 }}>
      {"★".repeat(stars)}
      <span style={{ opacity: 0.3 }}>{"★".repeat(5 - stars)}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div
      style={{
        width: 260,
        borderRadius: "24px 24px 4px 4px",
        background: "rgba(253,248,244,0.95)",
        border: "1px solid rgba(201,161,100,0.4)",
        boxShadow: "0 20px 40px rgba(64,40,36,0.15)",
        padding: "18px 20px",
        backdropFilter: "blur(12px)",
        color: "#402824",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            display: "grid",
            placeItems: "center",
            background: "#C9A164",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "sans-serif"
          }}
        >
          {review.reviewer.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "sans-serif" }}>{review.reviewer}</div>
          <StarRow stars={review.stars} />
        </div>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.6, fontStyle: "italic", opacity: 0.9 }}>
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
        height: 128,
        borderRadius: 4,
        background: `linear-gradient(135deg, #CB8D88, #C9A164)`,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "12px 10px",
        textAlign: "left",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.1 }}>Art of Mind</div>
      <div style={{ fontSize: 9, opacity: 0.9, textTransform: "uppercase", letterSpacing: 1, fontFamily: "sans-serif" }}>Deborah M Tungnung</div>
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

function HandCard({ review, index, total, activeIndex }: HandProps) {
  const visualRef = useRef<any>(null);

  const middle = Math.floor(total / 2);
  const relative = index - activeIndex;
  let wrapped = relative;
  if (relative > middle) wrapped = relative - total;
  if (relative < -middle) wrapped = relative + total;

  const isActive = index === activeIndex;
  
  const finalX = wrapped * 2.45;
  const finalY = isActive ? 0.45 : 0; 
  const finalZ = isActive ? 1.45 : -Math.abs(wrapped) * 0.55;
  const finalRotY = isActive ? 0 : -wrapped * 0.32;
  const finalRotZ = isActive ? 0 : wrapped * -0.08;
  const finalScale = isActive ? 1.15 : 0.86;

  const spring = useSpring({
    position: [finalX, finalY, finalZ] as any,
    rotation: [0, finalRotY, finalRotZ] as any,
    scale: [finalScale, finalScale, finalScale] as any,
    config: { mass: 1.1, tension: 125, friction: 20 },
  });

  useFrame((state) => {
    const g = visualRef.current;
    if (!g || !isActive) return;
    g.position.y = finalY + Math.sin(state.clock.elapsedTime * 1.6) * 0.06;
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
  });

  return (
    <a.group position={spring.position as any} rotation={spring.rotation as any} scale={spring.scale as any}>
      <group ref={visualRef}>
        <ProceduralHand color={review.skin} />
        
        <mesh position={[0, 0.62, 0.06]} castShadow receiveShadow>
          <boxGeometry args={[0.76, 1.12, 0.09]} />
          <meshStandardMaterial color="#402824" roughness={0.8} />
        </mesh>

        <mesh position={[-0.35, 0.62, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.06, 1.12, 0.11]} />
          <meshStandardMaterial color="#FAF7F2" roughness={0.2} />
        </mesh>

        <Html transform position={[0, 0.62, 0.12]} style={{ pointerEvents: 'none' }}>
          <BookFace />
        </Html>

        {isActive && (
          <Html transform position={[0, -1.65, 0.15]} style={{ pointerEvents: 'none' }}>
            <ReviewCard review={review} />
          </Html>
        )}
      </group>
    </a.group>
  );
}

function Scene({ activeIndex }: { activeIndex: number }) {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 6, 4]} intensity={2} color="#FDF8F4" castShadow />
      <pointLight position={[-4, 2, 3]} intensity={1} color="#CB8D88" />
      <pointLight position={[4, 1, 2]} intensity={1} color="#C9A164" />
      <Environment preset="city" />

      {reviews.map((review, index) => (
        <HandCard key={review.id} review={review} index={index} total={reviews.length} activeIndex={activeIndex} />
      ))}
    </>
  );
}

const buttonStyle: React.CSSProperties = {
  width: 46,
  height: 46,
  borderRadius: 999,
  border: "1px solid rgba(201,161,100,0.5)",
  background: "rgba(253,248,244,0.9)",
  color: "#402824",
  cursor: "pointer",
  fontSize: 22,
  backdropFilter: "blur(12px)",
  display: "grid",
  placeItems: "center",
  boxShadow: "0 4px 12px rgba(64,40,36,0.15)",
};

export default function ReviewCarousel(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(2);

  const previous = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  const next = () => setActiveIndex((prev) => (prev + 1) % reviews.length);

  return (
    <div style={{ width: "100%", minHeight: "600px", height: "75vh", position: "relative", overflow: "hidden", background: "transparent" }}>
      
      <Suspense fallback={null}>
        <Canvas shadows camera={{ position: [0, 0.2, 9.5], fov: 45 }} style={{ width: "100%", height: "100%" }}>
          <Scene activeIndex={activeIndex} />
        </Canvas>
      </Suspense>

      <div style={{ position: "absolute", left: "50%", bottom: 24, transform: "translateX(-50%)", zIndex: 2147483647, display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={previous} aria-label="Previous" style={buttonStyle}>←</button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 999, background: "rgba(253,248,244,0.7)", border: "1px solid rgba(201,161,100,0.3)", backdropFilter: "blur(12px)" }}>
          {reviews.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to review ${index + 1}`}
              style={{
                width: index === activeIndex ? 26 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                background: index === activeIndex ? "#C9A164" : "rgba(201,161,100,0.3)",
                cursor: "pointer",
                transition: "all 180ms ease",
              }}
            />
          ))}
        </div>

        <button onClick={next} aria-label="Next" style={buttonStyle}>→</button>
      </div>
    </div>
  );
}
