import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  X,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
  BookOpen,
  ArrowLeft
} from "lucide-react";
import { articlesData, articleCategories, type Article } from "../data/articlesData";
import OptimizedImage from "../components/OptimizedImage";
import "../styles/articles.css";

const Articles: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const location = useLocation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Check URL hash to open article directly if linked
  useEffect(() => {
    if (location.hash) {
      const articleId = location.hash.replace("#", "");
      const found = articlesData.find((a) => a.id === articleId);
      if (found) {
        setSelectedArticle(found);
      }
    }
  }, [location.hash]);

  // Handle body scroll locking and reset scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.documentElement.classList.add("article-modal-open");
      document.body.classList.add("article-modal-open");
      const backdrop = document.querySelector(".article-modal-backdrop");
      if (backdrop) {
        backdrop.scrollTop = 0;
      }
    } else {
      document.documentElement.classList.remove("article-modal-open");
      document.body.classList.remove("article-modal-open");
    }
    return () => {
      document.documentElement.classList.remove("article-modal-open");
      document.body.classList.remove("article-modal-open");
    };
  }, [selectedArticle]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedArticle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter articles based on Category and Search Query
  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some((t) => t.toLowerCase().includes(query)) ||
        article.author.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured cover article (if "All" and no search query, highlight first featured)
  const featuredArticle = useMemo(() => {
    if (selectedCategory === "All" && !searchQuery.trim()) {
      return articlesData.find((a) => a.featured) || articlesData[0];
    }
    return null;
  }, [selectedCategory, searchQuery]);

  // Secondary articles grid (exclude featured when showing featured banner)
  const gridArticles = useMemo(() => {
    if (featuredArticle) {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle]);

  // Category count helper
  const getCategoryCount = (category: string) => {
    if (category === "All") return articlesData.length;
    return articlesData.filter((a) => a.category === category).length;
  };

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setReadingProgress(0);
    window.history.replaceState(null, "", `#${article.id}`);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    setReadingProgress(0);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      const progress = Math.min(100, Math.max(0, (target.scrollTop / totalHeight) * 100));
      setReadingProgress(progress);
    }
  };

  const handleShare = async (article: Article) => {
    const url = `${window.location.origin}/articles#${article.id}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 3000);
  };

  return (
    <main className="articles-page" id="articles-main">
      <div className="articles-container">
        {/* ================================================================ */}
        {/* HERO / PUBLICATION HEADER                                        */}
        {/* ================================================================ */}
        <header className="articles-hero">
          <div className="articles-hero-inner">
            {/* <motion.div
              className="articles-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Sparkles size={13} className="articles-eyebrow-icon" />
              <span>The Sangrilla Journal</span>
              <span className="articles-eyebrow-sep">•</span>
              <span className="articles-eyebrow-sub">Editorial Intelligence</span>
            </motion.div> */}

            <motion.h1
              className="articles-title"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Perspectives on Living, Investing & Building Purposefully
            </motion.h1>

            <motion.p
              className="articles-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Authoritative intelligence on Gujarat's high-growth corridors,
              greenfield smart cities, generational wealth compounding through
              plotted land, and the science of purposeful luxury architecture.
            </motion.p>
          </div>

          {/* SEARCH & CATEGORY FILTERS */}
          <div className="articles-controls-bar">
            <div className="articles-search-wrapper">
              <Search size={18} className="articles-search-icon" />
              <input
                type="text"
                className="articles-search-input"
                placeholder="Search articles or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="articles-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* CATEGORY TABS */}
            <div className="articles-categories-wrapper">
              <div className="articles-categories" role="tablist">
                {articleCategories.map((category) => {
                  const isActive = selectedCategory === category;
                  const count = getCategoryCount(category);
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`articles-category-btn ${isActive ? "active" : ""}`}
                      onClick={(e) => {
                        setSelectedCategory(category);
                        const container = e.currentTarget.parentElement;
                        if (category === "All" && container) {
                          container.scrollTo({ left: 0, behavior: "smooth" });
                        } else {
                          e.currentTarget.scrollIntoView({
                            behavior: "smooth",
                            inline: "nearest",
                            block: "nearest",
                          });
                        }
                      }}
                    >
                      <span>{category}</span>
                      <span className="articles-category-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================ */}
        {/* FEATURED STORY (Shown on default "All" view)                     */}
        {/* ================================================================ */}
        {featuredArticle && (
          <section className="articles-featured-section" aria-label="Featured Story">
            <motion.article
              className="articles-featured-card"
              onClick={() => handleOpenArticle(featuredArticle)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="articles-featured-image-wrapper">
                <OptimizedImage
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="articles-featured-image"
                />
                <span className="articles-featured-badge">Featured Story</span>
              </div>

              <div className="articles-featured-content">
                <div>
                  <div className="articles-featured-meta">
                    <span className="articles-category-tag">{featuredArticle.category}</span>
                    <span className="articles-meta-divider">•</span>
                    <span>{featuredArticle.publishDate}</span>
                    <span className="articles-meta-divider">•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>

                  <h2 className="articles-featured-title">{featuredArticle.title}</h2>
                  <p className="articles-featured-excerpt">{featuredArticle.excerpt}</p>
                </div>

                <div className="articles-featured-footer">
                  <div className="articles-author-box">
                    <div className="articles-author-avatar">
                      {featuredArticle.author.initials}
                    </div>
                    <div>
                      <div className="articles-author-name">{featuredArticle.author.name}</div>
                      <div className="articles-author-role">{featuredArticle.author.role}</div>
                    </div>
                  </div>

                  <span className="articles-read-btn">
                    Read Story <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </motion.article>
          </section>
        )}

        {/* ================================================================ */}
        {/* ARTICLES GRID                                                    */}
        {/* ================================================================ */}
        <section className="articles-grid-section" aria-label="Articles Feed">
          <div className="articles-grid-header">
            <h2 className="articles-grid-title">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory === "All"
                  ? "Recent Dispatches & Insights"
                  : `${selectedCategory} Insights`}
            </h2>
            <span className="articles-count-badge">
              Showing {filteredArticles.length} of {articlesData.length} articles
            </span>
          </div>

          {gridArticles.length > 0 ? (
            <div className="articles-grid">
              {gridArticles.map((article, idx) => (
                <motion.article
                  key={article.id}
                  className="article-card"
                  onClick={() => handleOpenArticle(article)}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <div className="article-card-media">
                    <OptimizedImage
                      src={article.coverImage}
                      alt={article.title}
                      className="article-card-image"
                    />
                    <span className="article-card-category">{article.category}</span>
                  </div>

                  <div className="article-card-body">
                    <div className="article-card-meta">
                      <Calendar size={13} />
                      <span>{article.publishDate}</span>
                      <span className="articles-meta-divider">•</span>
                      <Clock size={13} />
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="article-card-title">{article.title}</h3>
                    <p className="article-card-excerpt">{article.excerpt}</p>

                    <div className="article-card-footer">
                      <span className="article-card-author">{article.author.name}</span>
                      <span className="article-card-read-label">
                        Read Story <ArrowRight size={15} className="article-card-arrow" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="articles-no-results">
              <h3>No articles found</h3>
              <p>We could not find any articles matching your search criteria.</p>
              <button
                type="button"
                className="articles-reset-btn"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* ================================================================ */}
        {/* MARKET DISPATCH / NEWSLETTER                                     */}
        {/* ================================================================ */}
        {/* <section className="articles-dispatch-section">
          <div className="articles-dispatch-card">
            <div className="articles-dispatch-content">
              <span className="articles-dispatch-tag">The Sangrilla Dispatch</span>
              <h2 className="articles-dispatch-title">
                Stay Ahead of Gujarat's Real Estate Curve
              </h2>
              <p className="articles-dispatch-desc">
                Receive quarterly infrastructure briefs, early-stage corridor
                valuation metrics, and exclusive private pre-market access
                directly in your inbox. No spam. Pure signal.
              </p>

              {newsletterSuccess ? (
                <div className="articles-dispatch-success">
                  <Check size={20} />
                  <span>Thank you for subscribing to The Sangrilla Dispatch.</span>
                </div>
              ) : (
                <form className="articles-dispatch-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    className="articles-dispatch-input"
                    placeholder="Enter your professional email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="articles-dispatch-submit">
                    Subscribe to Dispatch
                  </button>
                </form>
              )}
            </div>
          </div>
        </section> */}
      </div>

      {/* ================================================================ */}
      {/* INTERACTIVE FULL-STORY ARTICLE READER MODAL                      */}
      {/* ================================================================ */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            className="article-modal-backdrop"
            onClick={handleCloseArticle}
            onScroll={handleModalScroll}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-article-title"
          >
            <motion.div
              className="article-modal-container"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* TOP BAR WITH NAVIGATION & READING PROGRESS */}
              <div className="article-modal-top-bar">
                <button
                  type="button"
                  className="article-modal-top-back-btn"
                  onClick={handleCloseArticle}
                  aria-label="Back to articles"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>

                <div className="article-modal-top-badge">
                  <span>{selectedArticle.category}</span>
                </div>

                <button
                  type="button"
                  className="article-modal-close-btn"
                  onClick={handleCloseArticle}
                  aria-label="Close article"
                >
                  <X size={18} />
                </button>

                {/* Real-time reading progress bar */}
                <div
                  className="article-modal-progress-bar"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>

              {/* HERO */}
              <div className="article-modal-hero">
                <OptimizedImage
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                />
                <div className="article-modal-hero-overlay">
                  <span className="article-modal-tag">{selectedArticle.category}</span>
                  <h1 className="article-modal-hero-title" id="modal-article-title">
                    {selectedArticle.title}
                  </h1>
                </div>
              </div>

              {/* BODY CONTENT */}
              <div className="article-modal-body">
                {/* AUTHOR & TIME INFO */}
                <div className="article-modal-meta-row">
                  <div className="article-modal-author">
                    <div className="article-modal-author-avatar">
                      {selectedArticle.author.initials}
                    </div>
                    <div>
                      <div className="article-modal-author-name">
                        {selectedArticle.author.name}
                      </div>
                      <div className="article-modal-author-role">
                        {selectedArticle.author.role}
                      </div>
                    </div>
                  </div>

                  <div className="article-modal-timing">
                    <Calendar size={13} />
                    <span>{selectedArticle.publishDate}</span>
                    <span className="articles-meta-divider">•</span>
                    <Clock size={13} />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                {/* KEY TAKEAWAYS BOX */}
                {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
                  <div className="article-takeaways-box">
                    <div className="article-takeaways-title">
                      <Sparkles size={18} color="#007ADD" />
                      <span>Executive Summary & Key Takeaways</span>
                    </div>
                    <ul className="article-takeaways-list">
                      {selectedArticle.keyTakeaways.map((item, i) => (
                        <li key={i} className="article-takeaways-item">
                          <span className="article-takeaways-bullet">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* STATS HIGHLIGHT CALLOUT */}
                {selectedArticle.statsHighlight && (
                  <div className="article-stat-callout">
                    <div className="article-stat-value">
                      {selectedArticle.statsHighlight.value}
                    </div>
                    <div className="article-stat-label">
                      {selectedArticle.statsHighlight.label}
                    </div>
                  </div>
                )}

                {/* SECTIONS & EDITORIAL CONTENT */}
                <div className="article-sections-container">
                  {selectedArticle.sections.map((section, idx) => (
                    <div key={idx} className="article-content-section">
                      <h3 className="article-content-heading">{section.heading}</h3>
                      <p className="article-content-text">{section.content}</p>

                      {section.quote && (
                        <blockquote className="article-pullquote">
                          "{section.quote}"
                        </blockquote>
                      )}

                      {section.bulletPoints && section.bulletPoints.length > 0 && (
                        <ul className="article-bullets-list">
                          {section.bulletPoints.map((point, pIdx) => (
                            <li key={pIdx} className="article-bullet-item">
                              <span className="article-bullet-dot" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* RELATED PROJECT BOX */}
                {selectedArticle.relatedProject && (
                  <div className="article-related-project-box">
                    <div>
                      <div className="article-related-badge">Featured Development</div>
                      <div className="article-related-title">
                        {selectedArticle.relatedProject.title}
                      </div>
                      <p className="article-related-desc">
                        {selectedArticle.relatedProject.description}
                      </p>
                    </div>

                    <Link
                      to={selectedArticle.relatedProject.to}
                      className="article-related-btn"
                      onClick={handleCloseArticle}
                    >
                      Explore Project →
                    </Link>
                  </div>
                )}

                {/* SHARE & BACK BAR */}
                <div className="article-modal-share-bar">
                  <div className="article-share-buttons">
                    <button
                      type="button"
                      className="article-share-btn"
                      onClick={() => handleShare(selectedArticle)}
                    >
                      {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
                      <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `${selectedArticle.title} - ${window.location.origin}/articles#${selectedArticle.id}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-share-btn"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        `${window.location.origin}/articles#${selectedArticle.id}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-share-btn"
                    >
                      LinkedIn
                    </a>
                  </div>

                  <button
                    type="button"
                    className="article-modal-back-btn"
                    onClick={handleCloseArticle}
                  >
                    <ArrowLeft size={15} />
                    <span>Back to Articles</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Articles;
