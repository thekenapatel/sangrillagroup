import React from "react";
import "../styles/legal.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-page">
      <header>
        <h1>Privacy Policy</h1>
        {/* <p className="last-updated">Last Updated: April 20, 2026</p> */}
      </header>

      <section className="legal-section">
        <h2>Our Commitment to Your Privacy</h2>
        <p>
          At Sangrilla Group, we value the trust you place in us when you share your information. 
          This policy explains how we collect, use, and protect your personal data when you interact 
          with our website, services, and property offerings. By accessing our website or submitting 
          your information, you agree to the practices described below.
        </p>
      </section>

      <section className="legal-section">
        <h2>Information You Share With Us:</h2>
        <p>
          When you engage with our website such as filling out inquiry forms, requesting brochures, 
          booking site visits, or contacting us via phone, email, or WhatsApp you may provide personal 
          details including your name, phone number, email address, and property preferences. 
          You may also share additional information relevant to your inquiry, which helps us serve you better.
        </p>
      </section>

      <section className="legal-section">
        <h2>Information We Automatically Collect:</h2>
        <p>
          To enhance your experience, we may automatically collect certain technical data such as 
          your IP address, browser type, device details, and browsing behavior on our website. 
          This includes pages visited, time spent, and interaction patterns, which help us 
          understand user preferences and improve our platform.
        </p>
      </section>

      <section className="legal-section">
        <h2>Information From External Sources:</h2>
        <p>
          In some cases, we may receive information about you through our business partners, 
          marketing platforms, or service providers such as sales agents, analytics tools, 
          or advertising networks. This information may be combined with data you provide 
          to ensure a seamless and personalized experience.
        </p>
      </section>

      <section className="legal-section">
        <h2>How We Use Your Information:</h2>
        <p>
          Your information is used to respond to your inquiries, schedule property visits, 
          and provide details about our projects and services. We may also use your data to 
          share relevant updates, promotional offers, or new opportunities that align with 
          your interests. Additionally, your information helps us improve our website performance, 
          enhance user experience, and ensure the security of our platform.
        </p>
      </section>

      <section className="legal-section">
        <h2>Sharing and Disclosure of Information:</h2>
        <p>
          Sangrilla Group does not sell your personal data. However, your information may be 
          shared with our internal teams, affiliated companies, and trusted partners such as 
          sales agents, service providers, and professional advisors to fulfill your requests 
          or improve our services. We may also disclose information if required by law or 
          to protect our legal rights. Sensitive financial or transaction related data, 
          where applicable, is handled with strict confidentiality and is not shared 
          externally without necessity.
        </p>
      </section>

      <section className="legal-section">
        <h2>Data Storage and Security:</h2>
        <p>
          We take reasonable steps to safeguard your personal information through appropriate 
          technical and organizational measures. Your data may be stored or processed by 
          our team or authorized partners to deliver services efficiently. While we strive 
          to protect your data, please note that no internet based system can guarantee absolute security.
        </p>
      </section>

      <section className="legal-section">
        <h2>Use of Cookies and Tracking Tools:</h2>
        <p>
          Our website uses cookies to enhance your browsing experience, analyze traffic, 
          and personalize content. These cookies help us understand how users interact 
          with our site and allow us to improve functionality. You may choose to disable 
          cookies through your browser settings; however, some features of the website 
          may not function properly as a result.
        </p>
      </section>

      <section className="legal-section">
        <h2>Your Choices and Rights:</h2>
        <p>
          You have the right to control how your personal data is used. You may request access, 
          correction, or deletion of your information, and you may opt out of receiving 
          marketing communications at any time. Requests can be made using the contact 
          details provided below.
        </p>
      </section>

      <section className="legal-section">
        <h2>External Links:</h2>
        <p>
          Our website may include links to third party websites or services. Sangrilla Group 
          is not responsible for the privacy practices or content of these external platforms. 
          We recommend reviewing their policies before sharing any personal data.
        </p>
      </section>

      <section className="legal-section">
        <h2>Policy Updates:</h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in our practices 
          or legal requirements. Any updates will be published on this page, and 
          continued use of our website signifies your acceptance of the revised policy.
        </p>
      </section>

      <section className="legal-section">
        <h2>Contact:</h2>
        <div className="legal-contact-info">
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us at:</p>
          <p className="legal-mail">Email: <a href="mailto:sangrillagroup@gmail.com">sangrillagroup@gmail.com</a></p>
          <p>Address: 417, The CBD Mall, Opposite The Hotel Hillock, Near Vaishnodevi Circle, Zundal Road, Chandkheda, Ahmedabad - 382424</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
