import "../styles/contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <h1 className="contact-title">Visit Us</h1>

      <div className="contact-cards">

        {/* Email */}
        <div className="contact-card">
          <div className="card-content">
            <h3>Email</h3>
            <p>sangrillagroup@gmail.com</p>
          </div>
          <a href="mailto:sangrillagroup@gmail.com">Send Email</a>
        </div>

        {/* Phone */}
        <div className="contact-card">
          <div className="card-content">
            <h3>Phone</h3>
            <p>Office: +91 99782 33222</p>
            <p>WhatsApp: +91 99889 44552</p>
          </div>
          <a href="tel:+919978233222">Call Now</a>
        </div>

        {/* Office */}
        <div className="contact-card">
          <div className="card-content">
            <h3>Head Office</h3>
            <p>
              Sangrilla Group Office, The CBD Mall, Nr. Vaishnodevi Circle,
              Opp. HOTEL HILL LOCK, Tragad, Chandkheda, Ahmedabad - 382424
            </p>
          </div>
          <a
            href="https://share.google/NcvYGsqTMM12hqJ6N"
            target="_blank"
            rel="noreferrer"
          >
            Get Direction
          </a>
        </div>

      </div>
    </div>
  );
};

export default Contact;