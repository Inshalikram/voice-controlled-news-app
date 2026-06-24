import React, { useEffect, useState } from "react";

// Static lines outside the component
const rotatingLines = [
  "Stay updated hands-free with cutting-edge voice technology that reads you the headlines.",
  "Listen to real-time news updates anytime, anywhere — no screens, just sound.",
  "Powered by intelligent voice interaction, delivering news tailored to your interests.",
  "No more scrolling or searching — let the headlines come to you with voice-enabled access.",
  "Get the latest updates from around the world delivered in a seamless audio experience."
];


const Footer = () => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % rotatingLines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Animated VoiceNews Section */}
        <div className="footer-section logo-section">
          <h2 className="footer-logo">VoiceNews</h2>
          <p className="footer-description fade-text">
            {rotatingLines[currentLine]}
          </p>
        </div>

        {/* Product Links */}
        <div className="footer-section">
          <h3>Product</h3>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#get-started">Get Started</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} VoiceNews. All rights reserved.
      </div>

      <style jsx>{`
        .footer {
          width: 100%;
          background-color: rgba(12, 32, 38, 0.85);
          color: #ccc;
          padding: 60px 0 0;
          font-family: Arial, sans-serif;
          margin-top: 5%;
        }

        .footer-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 5px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-section {
          min-width: 180px;
        }

        .logo-section {
          padding-right: 20px;
        }

        .footer-logo {
          font-size: 1.8rem;
          color: #64ffda;
          margin-bottom: 15px;
        }

        .footer-description {
          font-size: 0.95rem;
          line-height: 1.5;
          color: #ccc;
          min-height: 1.5em;
        }

        .fade-text {
          transition: opacity 0.5s ease-in-out;
        }

        .footer-section h3 {
          color: #fff;
          font-size: 1.1rem;
          margin-bottom: 10px;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section ul li {
          margin: 6px 0;
        }

        .footer-section ul li a {
          text-decoration: none;
          color: #aaa;
          transition: color 0.3s ease;
        }

        .footer-section ul li a:hover {
          color: #fff;
        }

        .footer-bottom {
          text-align: center;
          border-top: 1px solid #333;
          margin-top: 40px;
          padding: 20px 0;
          font-size: 0.85rem;
          color: #999;
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .footer-section {
            margin-bottom: 30px;
          }

          .logo-section {
            padding-right: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
