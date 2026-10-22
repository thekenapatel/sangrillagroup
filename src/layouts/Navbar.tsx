import { motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useMemo, type KeyboardEvent } from "react";
import { allProjects } from "../data/allProjects";
import "../styles/navbar.css";

type SearchCategory = "Page" | "Project" | "Section" | "Master Plan";

type SearchEntry = {
  label: string;
  category: SearchCategory;
  to: string;
  subtitle?: string;
  keywords?: string;
};

const pageSearchEntries: SearchEntry[] = [
  {
    label: "Home",
    category: "Page",
    to: "/",
    subtitle: "Sangrilla Group homepage",
    keywords: "homepage main landing real estate developer gujarat",
  },
  {
    label: "Dholera",
    category: "Project",
    to: "/dholera",
    subtitle: "Sangrilla Meadows & Sangrilla Baghban · Dholera SIR",
    keywords: "dholera sir smart city residential plots luxury villas meadows baghban baghbaan investment",
  },
  {
    label: "Sangrilla Baghban",
    category: "Project",
    to: "/project/sangrilla-baghban",
    subtitle: "96 Planned Villa Plots & Porch Villas · Kamiyala, Dholera SIR",
    keywords: "sangrilla baghban baghbaan dholera sir kamiyala porch villas residential plots 96 plots",
  },
  {
    label: "Sangrilla Meadows",
    category: "Project",
    to: "/project/sangrilla-meadows",
    subtitle: "145 Planned Villa Plots & Luxury Villas · Aakru, Dholera SIR",
    keywords: "sangrilla meadows dholera sir aakru 145 plots luxury villas master plan",
  },
  {
    label: "Projects",
    category: "Page",
    to: "/projects",
    subtitle: "Commercial & residential developments",
    keywords: "all projects developments portfolio properties commercial residential",
  },
  {
    label: "Channel Partner",
    category: "Page",
    to: "/register-channel-partner",
    subtitle: "Become a registered channel partner",
    keywords: "partner broker agent registration associate real estate",
  },
  {
    label: "About Us",
    category: "Page",
    to: "/about-us",
    subtitle: "Our story, vision & legacy since 2000",
    keywords: "our story company profile history team vision belief leadership",
  },
  {
    label: "Contact",
    category: "Page",
    to: "/contact",
    subtitle: "Get in touch with our team",
    keywords: "contact us reach office inquiry phone email address support",
  },
  {
    label: "Commercial",
    category: "Page",
    to: "/commercial",
    subtitle: "Prime shops, offices & business parks",
    keywords: "commercial retail shops offices business parks centres",
  },
  {
    label: "Residential",
    category: "Page",
    to: "/residential",
    subtitle: "Bungalows, villas, apartments & plots",
    keywords: "residential homes luxury villas apartments flats bungalows",
  },
  {
    label: "Plotting",
    category: "Page",
    to: "/plots",
    subtitle: "Premium residential plotting options",
    keywords: "plots plotting land residential open spaces investment",
  },
  {
    label: "Completed Projects",
    category: "Page",
    to: "/completed-projects",
    subtitle: "Delivered landmarks across Gujarat",
    keywords: "past delivered completed archive handover legacy",
  },
  {
    label: "Under Construction",
    category: "Page",
    to: "/under-construction-projects",
    subtitle: "Ongoing and upcoming developments",
    keywords: "new ongoing upcoming under construction pre-launch",
  },
  {
    label: "Ready Property",
    category: "Page",
    to: "/ready-property",
    subtitle: "Move-in ready spaces",
    keywords: "ready possession immediate handover move in",
  },
  {
    label: "Articles & Insights",
    category: "Page",
    to: "/articles",
    subtitle: "Real estate news, updates & media",
    keywords: "articles insights blog media press news updates",
  },
  {
    label: "Services",
    category: "Page",
    to: "/services",
    subtitle: "Consulting & advisory solutions",
    keywords: "services real estate consultation advisory",
  },
  {
    label: "Propose Land",
    category: "Page",
    to: "/propose-land",
    subtitle: "Submit land proposals for partnership",
    keywords: "sell land joint venture partnership propose land parcel",
  },
  {
    label: "Propose Project",
    category: "Page",
    to: "/propose-project",
    subtitle: "Collaborate on development projects",
    keywords: "project proposal joint development collaboration",
  },
  {
    label: "Register as Vendor",
    category: "Page",
    to: "/register-vendor",
    subtitle: "Suppliers & contractors registration",
    keywords: "vendor supplier contractor procurement partner",
  },
  {
    label: "Sangrilla Estate",
    category: "Page",
    to: "/estate",
    subtitle: "Luxury estates and high-value properties",
    keywords: "estate luxury farmland exclusive",
  },
  {
    label: "Sangrilla Meadows Master Plan",
    category: "Master Plan",
    to: "/sangrilla-meadows-plan",
    subtitle: "High-resolution interactive GIS plotter",
    keywords: "master plan map layout plotter sangrilla meadows gis",
  },
];

const sectionSearchEntries: SearchEntry[] = [
  {
    label: "The Sangrilla Life",
    category: "Section",
    to: "/#lifestyle-heading",
    subtitle: "Home · Curated lifestyle experience",
    keywords: "lifestyle community living amenities",
  },
  {
    label: "Why Sangrilla",
    category: "Section",
    to: "/#why-heading",
    subtitle: "Home · Values, trust and quality",
    keywords: "why choose us value trust legacy",
  },
  {
    label: "Sangrilla in Numbers",
    category: "Section",
    to: "/#numbers-title",
    subtitle: "Home · Two decades of milestones",
    keywords: "statistics numbers legacy sq ft delivered families",
  },
  {
    label: "Our Belief",
    category: "Section",
    to: "/about-us#sn-belief-title",
    subtitle: "About Us · Making everyday life better",
    keywords: "belief philosophy values mission",
  },
  {
    label: "Our Vision",
    category: "Section",
    to: "/about-us#sn-vision-title",
    subtitle: "About Us · Thoughtful places made for real life",
    keywords: "vision future architecture design",
  },
  {
    label: "Milestones",
    category: "Section",
    to: "/about-us#sn-milestones-title",
    subtitle: "About Us · Our growth journey since 2000",
    keywords: "journey history milestones timeline past achievements",
  },
  {
    label: "Future of Gujarat",
    category: "Section",
    to: "/about-us#sn-future-title",
    subtitle: "About Us · Growth & possibility in Gujarat",
    keywords: "future gujarat development potential economy",
  },
  {
    label: "Upcoming Projects",
    category: "Section",
    to: "/#upcoming-projects",
    subtitle: "Preview upcoming luxury developments & smart offices",
    keywords: "upcoming projects teaser neejdham skyline luxury apartments future launch",
  },
  {
    label: "Project Overview",
    category: "Section",
    to: "/project/sangrilla-meadows#overview-section",
    subtitle: "Sangrilla Meadows · Specifications & details",
    keywords: "meadows specs overview dholera area units",
  },
  {
    label: "Meadows Photos",
    category: "Section",
    to: "/project/sangrilla-meadows#photos-section",
    subtitle: "Sangrilla Meadows · Visual gallery",
    keywords: "meadows photos images gallery pictures",
  },
  {
    label: "Meadows Location",
    category: "Section",
    to: "/project/sangrilla-meadows#location-section",
    subtitle: "Sangrilla Meadows · Dholera SIR connectivity",
    keywords: "meadows location map expressway connectivity airport",
  },
  {
    label: "Meadows Layout",
    category: "Section",
    to: "/project/sangrilla-meadows#layout-section",
    subtitle: "Sangrilla Meadows · Sector layout & plot map",
    keywords: "meadows layout master plan sectors villa plots",
  },
  {
    label: "Meadows Amenities",
    category: "Section",
    to: "/project/sangrilla-meadows#amenities-section",
    subtitle: "Sangrilla Meadows · Clubhouse, gym & parks",
    keywords: "meadows amenities clubhouse pool garden security parks",
  },
  {
    label: "Why Dholera",
    category: "Section",
    to: "/project/sangrilla-meadows#dholera-section",
    subtitle: "Sangrilla Meadows · India's greenfield smart city",
    keywords: "why dholera investment growth corridor expressway",
  },
  {
    label: "Meadows Contact",
    category: "Section",
    to: "/project/sangrilla-meadows#contact-section",
    subtitle: "Sangrilla Meadows · Speak with our sales advisor",
    keywords: "meadows contact inquiry booking phone visit",
  },
  {
    label: "Meadows Investors Corner",
    category: "Section",
    to: "/project/sangrilla-meadows#investors-section",
    subtitle: "Sangrilla Meadows · Investment opportunities",
    keywords: "meadows investors appreciation roi growth",
  },
];

const projectSearchEntries: SearchEntry[] = allProjects.map((project) => ({
  label: project.name,
  category: "Project",
  to: `/project/${project.id}`,
  subtitle: project.tagline + (project.location ? ` · ${project.location}` : ""),
  keywords: `${project.type} ${project.status} ${project.year ?? ""} ${project.location ?? ""} ${project.id.replace(/-/g, " ")}`,
}));

const searchEntries: SearchEntry[] = [
  ...pageSearchEntries,
  ...projectSearchEntries,
  ...sectionSearchEntries,
];

const getMatchScore = (entry: SearchEntry, terms: string[]): number => {
  const labelLower = entry.label.toLowerCase();
  const labelWords = labelLower.split(/\s+/);
  const subtitleLower = (entry.subtitle ?? "").toLowerCase();
  const keywordsLower = (entry.keywords ?? "").toLowerCase();
  const categoryLower = entry.category.toLowerCase();

  let score = 0;

  for (const term of terms) {
    if (!term) continue;
    const inLabel = labelLower.includes(term);
    const inSubtitle = subtitleLower.includes(term);
    const inKeywords = keywordsLower.includes(term);
    const inCategory = categoryLower.includes(term);

    if (!inLabel && !inSubtitle && !inKeywords && !inCategory) {
      return -1; // Must match all terms
    }

    // Exact word match in label (e.g. "Meadows" in "Sangrilla Meadows")
    if (labelWords.includes(term)) {
      score += 150;
    } else if (labelLower.startsWith(term)) {
      score += 120;
    } else if (labelLower.includes(` ${term}`)) {
      score += 90;
    } else if (inLabel) {
      score += 60;
    } else if (inCategory) {
      score += 35;
    } else if (inSubtitle) {
      score += 25;
    } else if (inKeywords) {
      score += 15;
    }
  }

  // Primary entities (Projects & Pages) get priority over deep sections
  if (entry.category === "Project") {
    score += 55;
  } else if (entry.category === "Page") {
    score += 45;
  } else if (entry.category === "Master Plan") {
    score += 40;
  }

  return score;
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeResultIndex, setActiveResultIndex] = useState(0);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((open) => !open);
  };

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Autofocus input when search dropdown opens
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
      setActiveResultIndex(0);
    }
  }, [isSearchOpen]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleGlobalKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  // Compute filtered search results
  const matchingResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return [];

    const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean);
    if (!queryTerms.length) return [];

    return searchEntries
      .map((entry) => ({ entry, score: getMatchScore(entry, queryTerms) }))
      .filter((item) => item.score >= 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.entry)
      .slice(0, 8);
  }, [searchQuery]);

  const selectSearchResult = (entry: SearchEntry) => {
    setSearchQuery("");
    setIsSearchOpen(false);

    if (entry.to.includes("#")) {
      const [path, targetHash] = entry.to.split("#");
      navigate(entry.to);

      setTimeout(() => {
        const el = document.getElementById(targetHash);
        if (el) {
          const scrollMargin = Number.parseFloat(getComputedStyle(el).scrollMarginTop);
          const offset = Number.isFinite(scrollMargin) && scrollMargin > 0 ? scrollMargin : 90;
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: Math.max(0, y),
            behavior: "smooth",
          });
        }
      }, 60);
    } else {
      navigate(entry.to);
    }
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      if (matchingResults.length > 0) {
        event.preventDefault();
        setActiveResultIndex((index) => (index + 1) % matchingResults.length);
      }
    } else if (event.key === "ArrowUp") {
      if (matchingResults.length > 0) {
        event.preventDefault();
        setActiveResultIndex((index) => (index - 1 + matchingResults.length) % matchingResults.length);
      }
    } else if (event.key === "Enter") {
      if (matchingResults.length > 0) {
        event.preventDefault();
        const selected = matchingResults[activeResultIndex] ?? matchingResults[0];
        if (selected) {
          selectSearchResult(selected);
        }
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsSearchOpen(false);
    }
  };

  const handleClearQuery = () => {
    setSearchQuery("");
    setActiveResultIndex(0);
    searchInputRef.current?.focus();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="navbar"
      >
        <div className="navbar-container">
          {/* LOGO */}
          <Link to="/" className="logo" aria-label="Sangrilla Group Home">
            SANGRILLA
          </Link>

          {/* DESKTOP & TABLET MENU - Centered Links */}
          <div className="nav-menu">
            <NavLink to="/dholera">Dholera</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/register-channel-partner">Channel Partner</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* RIGHT SIDE: Fixed Search Icon on desktop/tablet, Hamburger on mobile */}
          <div className="nav-icons">
            {/* SEARCH COMPONENT (Desktop & Tablet) */}
            <div className="nav-search" ref={searchContainerRef}>
              <button
                type="button"
                className={`nav-search-btn ${isSearchOpen ? "active" : ""}`}
                aria-label={isSearchOpen ? "Close search panel" : "Open search panel"}
                aria-expanded={isSearchOpen}
                onClick={toggleSearch}
              >
                <Search size={19} strokeWidth={1.8} aria-hidden="true" />
              </button>

              {/* SEARCH DROPDOWN PANEL - Opens directly below navbar */}
              {isSearchOpen && (
                <div
                  className="nav-search-dropdown"
                  id="nav-search-dropdown"
                  role="dialog"
                  aria-label="Site Search"
                >
                  <div className="nav-search-input-box">
                    <Search
                      className="nav-search-input-icon"
                      size={17}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    <input
                      ref={searchInputRef}
                      className="nav-search-input"
                      type="search"
                      value={searchQuery}
                      placeholder="Search our website..."
                      aria-label="Search pages, projects, and sections"
                      aria-autocomplete="list"
                      aria-controls="nav-search-results-list"
                      aria-activedescendant={
                        matchingResults.length > 0
                          ? `nav-search-option-${activeResultIndex}`
                          : undefined
                      }
                      role="combobox"
                      onChange={(event) => {
                        setSearchQuery(event.target.value);
                        setActiveResultIndex(0);
                      }}
                      onKeyDown={handleSearchKeyDown}
                    />

                    {searchQuery ? (
                      <button
                        type="button"
                        className="nav-search-clear"
                        aria-label="Clear search"
                        onClick={handleClearQuery}
                      >
                        <X size={14} strokeWidth={2} aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="nav-search-close"
                        aria-label="Close search dropdown"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <X size={14} strokeWidth={2} aria-hidden="true" />
                      </button>
                    )}
                  </div>

                  {/* RESULTS OR SUGGESTIONS */}
                  {searchQuery.trim().length > 0 ? (
                    <div
                      className="nav-search-results"
                      id="nav-search-results-list"
                      role="listbox"
                      aria-label="Search results"
                    >
                      {matchingResults.length > 0 ? (
                        matchingResults.map((result, index) => (
                          <button
                            type="button"
                            role="option"
                            aria-selected={index === activeResultIndex}
                            className={`nav-search-result ${index === activeResultIndex ? "active" : ""}`}
                            id={`nav-search-option-${index}`}
                            key={`${result.to}-${result.label}`}
                            onMouseEnter={() => setActiveResultIndex(index)}
                            onClick={() => selectSearchResult(result)}
                          >
                            <div className="nav-search-result-main">
                              <div className="nav-search-result-title-row">
                                <span className="nav-search-result-label">{result.label}</span>
                                <span
                                  className={`nav-search-result-badge badge-${result.category.toLowerCase().replace(/\s+/g, "-")}`}
                                >
                                  {result.category}
                                </span>
                              </div>
                              {result.subtitle && (
                                <span className="nav-search-result-subtitle">
                                  {result.subtitle}
                                </span>
                              )}
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="nav-search-empty" role="status">
                          <div className="nav-search-empty-icon">
                            <Search size={18} strokeWidth={1.6} />
                          </div>
                          <p className="nav-search-empty-title">No matching results found</p>
                          <p className="nav-search-empty-hint">
                            Try searching for <strong>Meadows</strong>, <strong>Dholera</strong>,{" "}
                            <strong>Projects</strong>, or <strong>About Us</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="nav-search-suggestions">
                      <span className="nav-search-suggestions-label">Popular searches</span>
                      <div className="nav-search-pills">
                        {["Dholera", "Sangrilla Meadows", "Projects", "About Us", "Contact"].map(
                          (term) => (
                            <button
                              key={term}
                              type="button"
                              className="nav-search-pill"
                              onClick={() => {
                                setSearchQuery(term);
                                setActiveResultIndex(0);
                                searchInputRef.current?.focus();
                              }}
                            >
                              {term}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE HAMBURGER BUTTON - Visible ONLY on Mobile Screens */}
            <button
              type="button"
              className="icon menu-btn"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* FULL MOBILE MENU DROPDOWN - Mobile only */}
        <div className={`full-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="menu-grid">
            <div className="menu-column">
              <Link to="/dholera" onClick={closeMobileMenu}>
                Dholera
              </Link>
              <Link to="/projects" onClick={closeMobileMenu}>
                Projects
              </Link>
              <Link to="/register-channel-partner" onClick={closeMobileMenu}>
                Channel Partner
              </Link>
              <Link to="/about-us" onClick={closeMobileMenu}>
                About Us
              </Link>
              <Link to="/contact" onClick={closeMobileMenu}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;