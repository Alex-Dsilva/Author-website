import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Countdown from "./components/Countdown";

const BookHero = dynamic(() => import("./components/BookHero"), { ssr: false });
const ReviewCarousel = dynamic(() => import("./components/ReviewCarousel"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <Countdown />
      <BookHero />
      <ReviewCarousel />
    </>
  );
}
