import type { FC } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "../styles/lifestyle.css";
import OptimizedImage from "../components/OptimizedImage";
import ZenGarden from "../assets/lifestyle images/zen_garden.png";
import KidsArena from "../assets/lifestyle images/kids_arena.png";
import CommunitySpirit from "../assets/lifestyle images/community_spirit.png";
import SwimmingPool from "../assets/lifestyle images/swimming_pool.png";
import ClubHouse from "../assets/lifestyle images/club_house.png";




const lifestyleMoments = [
  {
    title: "The Clubhouse",
    description: "Gather, celebrate, or take time to unwind.",
    image: ClubHouse,
  },
  {
    title: "Zen Gardens",
    description: "A quieter corner to begin the day.",
    image: ZenGarden,
  },
  {
    title: "Community",
    description: "Shared celebrations. Lasting connections.",
    image: CommunitySpirit,
  },
  {
    title: "Poolside",
    description: "Make room for a refreshing pause.",
    image: SwimmingPool,
  },
  {
    title: "Kids' Play",
    description: "Room to play, imagine, and grow.",
    image: KidsArena,
  }
];

const Lifestyle: FC = () => {
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };
  const animationDuration = reduceMotion ? 0 : 0.55;

  return (
    <section className="lifestyle-section" aria-labelledby="lifestyle-heading">
      <div className="lifestyle-inner">
        <div className="lifestyle-gallery">
          <motion.header
            className="lifestyle-intro"
            initial={initialState}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: animationDuration }}
          >
            <span className="lifestyle-eyebrow">A PLACE TO FEEL AT HOME</span>
            <h2 id="lifestyle-heading">The Sangrilla Life</h2>
            <p>Space to slow down, come together, and make every day count.</p>
          </motion.header>

          <div className="lifestyle-scroller" aria-label="Lifestyle highlights">
            {lifestyleMoments.map((moment, index) => (
              <figure
                key={moment.title}
                className={`lifestyle-moment lifestyle-moment-${index}`}
              >
                <OptimizedImage src={moment.image} alt={moment.title} />
                <figcaption className="lifestyle-caption">
                  <span className="lifestyle-moment-index">{String(index + 1).padStart(2, "0")} / 05</span>
                  <h3>{moment.title}</h3>
                  <p>{moment.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
