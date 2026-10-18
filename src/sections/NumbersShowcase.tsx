import { useEffect, useRef, type ReactElement } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import "../styles/numbers-showcase.css";

type Statistic = {
  value: number;
  suffix: string;
  description: string;
};

const statistics: Statistic[] = [
  {
    value: 25,
    suffix: "+",
    description: "Years of legacy",
  },
  {
    value: 1,
    suffix: "+",
    description: "Million sq. ft. built",
  },
  {
    value: 1000,
    suffix: "+",
    description: "Families in our communities",
  },
  {
    value: 15,
    suffix: "+",
    description: "Completed projects",
  },
];

type StatCounterProps = Pick<Statistic, "value" | "suffix">;

function StatCounter({ value, suffix }: StatCounterProps): ReactElement {
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.75 });
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const roundedCount = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString("en-IN"),
  );

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    });

    return controls.stop;
  }, [count, isInView, prefersReducedMotion, value]);

  return (
    <span className="numbers-stat-value" ref={counterRef}>
      <motion.span aria-label={`${value.toLocaleString("en-IN")}${suffix}`}>
        {roundedCount}
      </motion.span>
      <span className="numbers-stat-suffix" aria-hidden="true">
        {suffix}
      </span>
    </span>
  );
}

function NumbersShowcase(): ReactElement {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="numbers-showcase" aria-labelledby="numbers-title">
      <div className="numbers-showcase-inner">
        <motion.header
          className="numbers-heading"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 id="numbers-title">SANGRILLA IN NUMBERS</h2>
          <p className="numbers-eyebrow">Since 2000</p>
        </motion.header>

        <div className="numbers-grid">
          {statistics.map((statistic, index) => (
            <motion.article
              className="numbers-stat"
              key={statistic.description}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <StatCounter value={statistic.value} suffix={statistic.suffix} />
              <p>{statistic.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NumbersShowcase;