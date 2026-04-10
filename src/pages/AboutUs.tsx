import "../styles/page.css";

const AboutUs = () => {
  return (
    <div className="generic-page about-us-page">
      <div className="page-header">
        <h1>About Us</h1>
      </div>
      <div className="page-content compact-content">
        <p className="intro">
          We are a trusted name in the construction industry since 2000. With over 25 years of rich experience, SANGRILLA has successfully delivered a wide range of landmark projects including residential, commercial, plotting, and land development.
        </p>

        <p>
          From humble beginnings, we have grown into a reputed construction firm known for quality workmanship, timely execution, and complete transparency. We have built beautiful homes, modern commercial spaces, well-planned residential societies, plotted developments, and large-scale land properties across the region.
        </p>

        <div className="highlight">
          <p>
            At SANGRILLA, we believe in creating spaces that enhance lives and add value for generations to come.
          </p>
        </div>

        <div className="vision-section">
          <h2>Our Vision</h2>
          <p>
            To be the most trusted and preferred construction company by delivering exceptional quality, innovative designs, and sustainable developments that shape a better future for our communities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
