import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        if (!hash) {
          window.scrollTo(0, 0);
          return;
        }

        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!target) {
          window.scrollTo(0, 0);
          return;
        }

        const scrollMargin = Number.parseFloat(getComputedStyle(target).scrollMarginTop);
        const offset = Number.isFinite(scrollMargin) && scrollMargin > 0 ? scrollMargin : 90;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: "auto",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
