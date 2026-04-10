import React, { useRef } from "react";
import { motion } from "framer-motion";
import "../styles/lifestyle.css";
import ZenGarden from "../assets/lifestyle images/zen_garden.png";
import KidsArena from "../assets/lifestyle images/kids_arena.png";
import CommunitySpirit from "../assets/lifestyle images/community_spirit.png";
import SwimmingPool from "../assets/lifestyle images/swimming_pool.png";
import ClubHouse from "../assets/lifestyle images/club_house.png";




const lifestyleMoments = [
  {
    title: "The Grand Clubhouse",
    description: "A space where luxury meets community. Designed for celebrations and everyday leisure.",
    image: ClubHouse,
  },
  {
    title: "Zen Gardens",
    description: "Quiet mornings amidst manicured landscapes. Find your peace in the heart of the city.",
    image: ZenGarden,
  },
  {
    title: "Community Spirit",
    description: "Memorable events and festive gatherings. Building bonds that last a lifetime.",
    image: CommunitySpirit,
  },
  {
    title: "Refresh & Rejuvenate",
    description: "Dive into luxury. Our temperature-controlled pools are perfect for any season.",
    image: SwimmingPool,
  },
  {
    title: "The Kids' Arena",
    description: "Safe, vibrant, and fun. Where every child's imagination finds a home.",
    image: KidsArena,
  }
];

const Lifestyle: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    if (scrollRef.current) {
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    if (scrollRef.current) {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX.current) * 2; // scroll speed
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  return (
    <section className="lifestyle-section">
      <div className="lifestyle-header container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The Sangrilla Life
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Show how life feels inside our projects — the perfect blend of luxury, 
          nature, and community designed for those who seek the extraordinary.
        </motion.p>
      </div>

      <div
        className="lifestyle-scroll-container"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {lifestyleMoments.map((moment, index) => (
          <motion.div
            key={index}
            className="lifestyle-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <img src={moment.image} alt={moment.title} />
            <div className="lifestyle-overlay">
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Lifestyle;
