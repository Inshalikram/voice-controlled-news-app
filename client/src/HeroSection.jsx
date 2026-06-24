import React from "react";

const HeroSection = () => {
  const robotImageUrl = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";

  return (
    <>
      <section
        className="hero-section relative flex flex-col items-center justify-center text-center min-h-[100vh] px-4
                   bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1610034734325-3a8b09abf5bb?auto=format&fit=crop&w=1470&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Floating Robot Image */}
        <img
  src={robotImageUrl}
  alt="Floating Robot"
  className="robot-image animate-float"
/>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounceSlow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 1.2s ease forwards;
          }

          .animate-bounce-slow {
            animation: bounceSlow 2.5s ease-in-out infinite;
          }

          .robot-image {
            position: absolute;
            bottom: 40px;
            right: 60px;
            width: 120px;
            z-index: 1;
            opacity: 0.9;
          }

          .animate-float {
            animation: float 3.5s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* --- New Feature Section Below Hero --- */}
      <section className="feature-section">
        <div className="feature-container">
          <div className="feature-text">
            <h3>Listen to the news, your way</h3>
            <p>
              Experience news like never before with our voice-controlled news app.
              Stay updated hands-free while you focus on what matters.
            </p>
            <a href="#get-started" className="feature-button">
              <i> Get Started</i>
            </a>
          </div>
          <div className="feature-image">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
              alt="Voxpow App Illustration"
            />
          </div>
        </div>

        <style jsx>{`
          .feature-section {
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .feature-container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 40px;
            justify-content: center;
          }

          .feature-text {
            flex: 1 1 400px;
            max-width: 600px;
            text-align: left;
          }

          .feature-text h3 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 20px;
            color: #111;
          }

          .feature-text p {
            font-size: 1.125rem;
            color: #555;
            margin-bottom: 30px;
          }

          .feature-button {
            display: inline-block;
            background-color:rgba(12, 32, 38, 0.85);
            color: white;
            padding: 14px 36px;
            border-radius: 9999px;
            font-weight: 600;
            text-decoration: none;
            box-shadow: 0 4px 6px rgba(15, 38, 88, 0.5);
            transition: background-color 0.3s ease;
          }

          .feature-button:hover {
            background-color: #1e40af;
          }

          .feature-image {
            flex: 1 1 300px;
            max-width: 400px;
            text-align: center;
          }

          .feature-image img {
            max-width: 100%;
            height: auto;
          }

          @media (max-width: 768px) {
            .feature-text {
              text-align: center;
            }
            .feature-container {
              justify-content: center;
            }
          }
            .robot-image {
  position: absolute;
  bottom: 40px;
  right: 60px;
  width: 120px;
  z-index: 1;
  opacity: 0.9;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 3.5s ease-in-out infinite;
}

        `}</style>
      </section>
    </>
  );
};

export default HeroSection;
