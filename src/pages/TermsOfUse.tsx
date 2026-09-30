import React from "react";
import "../styles/terms.css";

const TermsOfUse: React.FC = () => {
  return (
    <div className="terms-page">
      <header>
        <h1>Terms of Use</h1>
      </header>

      <section className="terms-section">
        <p>
          Welcome to sangrillagroup.com, operated by Sangrilla Group and its affiliated entities. 
          By accessing or using this website, you agree to comply with the terms outlined below. 
          Please read them carefully before proceeding.
        </p>
      </section>

      <section className="terms-section">
        <h2>Who We Are:</h2>
        <p>
          This website is owned and managed by Sangrilla Group along with its associated companies, 
          subsidiaries, and partners. The platform is provided to users free of cost for 
          informational and service related purposes.
        </p>
      </section>

      <section className="terms-section">
        <h2>Information Accuracy & Disclaimer:</h2>
        <p>
          We aim to keep all content on our website accurate and up to date. However, information 
          may occasionally become outdated or contain inaccuracies. Content is provided for general 
          information only and should not be treated as professional advice. We do not guarantee 
          completeness, reliability, or accuracy of any information.
        </p>
        <p>
          Sangrilla Group shall not be held responsible for any loss or damage resulting from 
          reliance on the website content. Users are encouraged to independently verify any 
          details especially those related to properties, services, or financial matters and 
          consult appropriate professionals before making decisions.
        </p>
      </section>

      <section className="terms-section">
        <h2>Property & Project Details:</h2>
        <p>
          All descriptions, layouts, measurements, visuals, and specifications are indicative and 
          provided in good faith. Images may include artistic impressions or computer generated 
          visuals. Dimensions and plans may vary during development phases. Travel times, 
          projections, and estimates are approximate.
        </p>
        <p>
          Features, fittings, and pricing may change without prior notice. We strongly recommend 
          personal inspection and verification before making commitments.
        </p>
      </section>

      <section className="terms-section">
        <h2>Website Access & Security:</h2>
        <p>
          Access to this website is temporary and may be modified or withdrawn at any time without 
          notice. If you are provided login credentials, you must keep them confidential. Sharing 
          credentials with others is strictly prohibited. We reserve the right to suspend or 
          terminate access if misuse is detected.
        </p>
        <p>
          You are responsible for ensuring that anyone accessing the site through your connection 
          complies with these terms.
        </p>
      </section>

      <section className="terms-section">
        <h2>Intellectual Property Rights:</h2>
        <p>
          All materials on this website including text, design, graphics, software, and databases are 
          owned or licensed by Sangrilla Group. You may view, download, and print content for 
          personal use only.
        </p>
        <p>
          You may not copy, reproduce, or distribute content for commercial purposes. Modified 
          or derivative works are not permitted without written permission. Unauthorized use may 
          result in legal action.
        </p>
      </section>

      <section className="terms-section">
        <h2>External Links:</h2>
        <p>
          Our website may contain links to third party websites for convenience. We do not control 
          or endorse these external sites and are not responsible for their content or practices. 
          Users access third party links at their own risk.
        </p>
      </section>

      <section className="terms-section">
        <h2>Linking to Our Website:</h2>
        <p>
          You may link to our homepage provided that the link is fair and lawful. It must not 
          misrepresent any association with Sangrilla Group or harm our reputation. Framing our 
          website or linking to internal pages without permission is not allowed.
        </p>
      </section>

      <section className="terms-section">
        <h2>Privacy & Data Usage:</h2>
        <p>
          Our Privacy Policy explains how we collect and use personal data. By using this website, 
          you consent to data processing as per our policy and confirm that any information 
          provided is accurate and complete.
        </p>
      </section>

      <section className="terms-section">
        <h2>Governing Law:</h2>
        <p>
          These terms are governed by the laws of India. Any disputes arising will fall under the 
          jurisdiction of the courts in Gujarat.
        </p>
      </section>

      <section className="terms-section">
        <h2>Booking & Refunds:</h2>
        <div className="terms-group">
          <h3>Booking Process:</h3>
          <p>
            To secure a property or service, a token amount may be required. Full booking is 
            confirmed only after submission of required documents and payment completion within 
            the specified time. Failure to complete the process may result in release of the 
            reserved unit.
          </p>
        </div>
        <div className="terms-group">
          <h3>Cancellation & Refunds:</h3>
          <p>
            For cancellation requests, customers are required to contact or visit our official office. 
            Requests will be processed as per company policy. Token amounts are eligible for refund 
            within a reasonable processing period, typically up to 30 days. Refunds will be issued 
            without deductions unless otherwise stated.
          </p>
        </div>
      </section>

      <section className="terms-section">
        <h2>Orders & Service Access:</h2>
        <p>
          Certain services, bookings, or facility payments may be available through Sangrilla 
          Group’s digital platforms or applications. Users must have valid access to such 
          platforms. Confirmation receipts will be generated automatically upon successful transactions.
        </p>
      </section>

      <section className="terms-section">
        <div className="terms-contact">
          <h2>Contact:</h2>
          <p>For any queries or assistance, please reach out to us:</p>
          <p>Email: <a href="mailto:sangrillagroup@gmail.com">sangrillagroup@gmail.com</a></p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfUse;
