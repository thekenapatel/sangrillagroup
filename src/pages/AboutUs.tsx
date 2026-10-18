import logoMark from "../assets/logo-rb.png";
import "../styles/about-us.css";

const milestones = [
    {
        year: "2000",
        title: "A people-first beginning",
        description: "Sangrilla starts with a belief in better places for everyday life.",
    },
    {
        year: "2010",
        title: "Growing into commercial spaces",
        description: "The portfolio expands to include places to work and do business.",
    },
    {
        year: "2018",
        title: "Planning for community",
        description: "Shared spaces become an important part of residential development.",
    },
    {
        year: "Today",
        title: "Looking ahead",
        description: "New projects explore the potential of Gujarat's growing regions.",
    }
];

const AboutUs = () => {
    return (
        <main className="sn-about">
            {/* ====================================================================
          1. CINEMATIC HERO: A SANGRILLA STORY
          "The Future Has an Origin."
          ==================================================================== */}
            <section className="sn-cinema-hero">
                {/* Sangrilla Logo as Hero Background with Low Opacity */}
                <div className="sn-cinema-bg">
                    <div className="sn-hero-ambient-glow" />
                    <div className="sn-hero-logo-backdrop" aria-hidden="true">
                        <img
                            src={logoMark}
                            alt="Sangrilla Group Emblem"
                            className="sn-hero-bg-logo-img"
                        />
                    </div>
                    <div className="sn-cinema-golden-light" />
                    <div className="sn-cinema-vignette" />
                    <div className="sn-cinema-grain" />
                </div>

                <div className="sn-container sn-hero-layout">
                    <div className="sn-hero-lead-box">
                        <p className="sn-story-title">THE SANGRILLA STORY</p>
                        <h1 className="sn-cinema-h1">
                            Not Just Better Spaces. <br />
                            <span className="sn-gold-serif">Stronger Tomorrows.</span>
                        </h1>

                        <p className="sn-cinema-thesis">
                            We envision beyond today. We build for generations.            
                        </p>
                    </div>
                </div>
            </section>

            <section className="sn-story-section sn-belief-section" aria-labelledby="sn-belief-title">
                <div className="sn-container sn-belief-layout">
                    <div className="sn-belief-heading">
                        <p className="sn-story-label">Our belief</p>
                        <h2 id="sn-belief-title">A good place makes everyday life better.</h2>
                        <p className="sn-story-copy">
                            We create homes, workplaces and communities with people in mind, built to support life today and for years to come.
                        </p>
                    </div>
                </div>
            </section>

            <section className="sn-vision-section" aria-labelledby="sn-vision-title">
                <div className="sn-container">
                    <div className="sn-vision-heading">
                        <p className="sn-story-label">Our vision</p>
                        <h2 id="sn-vision-title">Thoughtful places, made for real life.</h2>
                    </div>
                    <div className="sn-vision-principles">
                        <article>
                            <span>01</span>
                            <h3>Space to breathe</h3>
                            <p>Considered layouts that make room for everyday living.</p>
                        </article>
                        <article>
                            <span>02</span>
                            <h3>Built with care</h3>
                            <p>Practical design and quality that lasts.</p>
                        </article>
                        <article>
                            <span>03</span>
                            <h3>Room to connect</h3>
                            <p>Shared spaces that help people feel at home.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="sn-milestones-section" aria-labelledby="sn-milestones-title">
                <div className="sn-container">
                    <div className="sn-milestones-heading">
                        <p className="sn-story-label">Our journey</p>
                        <h2 id="sn-milestones-title">Milestones</h2>
                    </div>
                    <div className="sn-milestone-list">
                        {milestones.map((milestone) => (
                            <article className="sn-milestone" key={milestone.year}>
                                <span className="sn-milestone-year">{milestone.year}</span>
                                <div>
                                    <h3>{milestone.title}</h3>
                                    <p>{milestone.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="sn-future-brief" aria-labelledby="sn-future-title">
                <div className="sn-container sn-future-brief-inner">
                    <div>
                        <p className="sn-story-label">Looking ahead</p>
                        <h2 id="sn-future-title">The future of Gujarat is full of possibility.</h2>
                        <p className="sn-future-copy">
                            We see opportunity in emerging regions like Dholera SIR, and in creating places where communities can grow.
                        </p>
                    </div>
                    <p className="sn-future-location">DHOLERA SIR <span>GUJARAT, INDIA</span></p>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
