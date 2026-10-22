import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/upcoming.css";
import OptimizedImage from "../components/OptimizedImage";

import blossom from "../assets/upcoming/blossom.jpg";
import skyline from "../assets/upcoming/skyline.jpg";

const upcomingProjects = [
  {
    title: "SANGRILLA NEEJDHAM",
    description: "Ultra-luxury 4BHK apartments with private decks.",
    launchDate: "2026-06-15",
    image: blossom,
  },
  {
    title: "SANGRILLA SKYLINE",
    description: "Next-gen smart offices with sky gardens.",
    launchDate: "2026-08-01",
    image: skyline,
  }
];

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <div className="countdown-timer">Soon...</div>;

  return (
    <div className="countdown-timer">
      <div className="countdown-box">
        <span className="countdown-num">{timeLeft.days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-box">
        <span className="countdown-num">{timeLeft.hours}</span>
        <span className="countdown-label">Hrs</span>
      </div>
      <div className="countdown-box">
        <span className="countdown-num">{timeLeft.mins}</span>
        <span className="countdown-label">Mins</span>
      </div>
    </div>
  );
};

const UpcomingTeaser: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Sync active index with scroll position
  const handleScroll = () => {
    if (!gridRef.current) return;
    const container = gridRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const cards = container.querySelectorAll<HTMLElement>(".upcoming-card");

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToProject = (index: number) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".upcoming-card");
    const targetIndex = Math.max(0, Math.min(index, cards.length - 1));
    const card = cards[targetIndex];
    if (card) {
      const container = gridRef.current;
      const targetScrollLeft = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: "smooth",
      });
      setActiveIndex(targetIndex);
    }
  };

  // Mouse drag handlers for desktop smooth dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!gridRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - gridRef.current.offsetLeft;
    scrollLeftRef.current = gridRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !gridRef.current) return;
    e.preventDefault();
    const x = e.pageX - gridRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
    gridRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <section className="upcoming-section" id="upcoming-projects">
      <div className="upcoming-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upcoming Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A glimpse into the future of luxury living. Be the first to know when we launch.
        </motion.p>
      </div>

      <div
        ref={gridRef}
        className="upcoming-grid"
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
      >
        {upcomingProjects.map((project, index) => (
          <div
            key={index}
            className={`upcoming-card ${activeIndex === index ? "is-focused" : ""}`}
            onClick={() => {
              if (!hasMovedRef.current) {
                scrollToProject(index);
              }
            }}
          >
            <div className="upcoming-image-container">
              <OptimizedImage src={project.image} alt={project.title} />
            </div>

            <div className="upcoming-card-content">
              <div className="upcoming-card-header">
                <span className="upcoming-badge">Coming Soon</span>
                <span
                  className="upcoming-card-index"
                  aria-label={`Project ${index + 1} of ${upcomingProjects.length}`}
                >
                  {index + 1}/{upcomingProjects.length}
                </span>
              </div>

              <div className="upcoming-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <CountdownTimer targetDate={project.launchDate} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingTeaser;

