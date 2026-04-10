import { useState, useEffect } from "react";
import logoImage from "../assets/FrontLogoPoster.png";
import "../styles/splash.css";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<
    "idle" | "stamp" | "settle" | "hold" | "exit"
  >("idle");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Brief pause before stamp hits
    timers.push(setTimeout(() => setPhase("stamp"), 300));
    // Settle into final size after impact
    timers.push(setTimeout(() => setPhase("settle"), 650));
    // Hold to let user admire the logo
    timers.push(setTimeout(() => setPhase("hold"), 1100));
    // Fade out
    timers.push(setTimeout(() => setPhase("exit"), 2600));
    // Done
    timers.push(setTimeout(() => onComplete(), 3400));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`splash ${phase === "exit" ? "splash--exit" : ""}`}>
      {/* Impact ring that expands on stamp */}
      <div
        className={`splash-ring ${
          phase === "stamp" || phase === "settle" || phase === "hold" || phase === "exit"
            ? "splash-ring--active"
            : ""
        }`}
      />

      {/* The logo — the stamp itself */}
      <div
        className={`splash-logo-wrapper ${
          phase === "idle"
            ? ""
            : phase === "stamp"
            ? "splash-logo--stamp"
            : phase === "settle"
            ? "splash-logo--settle"
            : "splash-logo--done"
        }`}
      >
        <img src={logoImage} alt="Sangrilla" className="splash-logo" />
      </div>

      {/* Radial ink lines that shoot out on impact */}
      {(phase === "stamp" || phase === "settle" || phase === "hold" || phase === "exit") && (
        <div className="splash-ink-lines">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="splash-ink-line"
              style={{
                transform: `rotate(${i * 30}deg)`,
                animationDelay: `${i * 0.02}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
