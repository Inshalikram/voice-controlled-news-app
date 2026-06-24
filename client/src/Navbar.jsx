import React, { useState } from "react";

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    background: "rgba(12, 32, 38, 0.85)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 24px rgba(0, 191, 165, 0.5)",
    zIndex: 50,
  },
  container: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  logo: {
    color: "#64ffda",
    fontWeight: "900",
    fontSize: 26,
    cursor: "pointer",
    userSelect: "none",
    letterSpacing: 1.2,
    textShadow: "0 0 8px #64ffdaaa",
  },
  menu: {
    display: "flex",
    listStyle: "none",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    position: "relative",
    textAlign: "center",
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    color: "#64ffda",
    fontWeight: "700",
    fontSize: 16,
    cursor: "pointer",
    padding: "0.5rem 0",
    textShadow: "0 0 6px #64ffdaaa",
    transition: "color 0.3s ease",
  },
  link: {
    color: "#64ffda",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: 16,
    display: "block",
    padding: "0.5rem 0",
    cursor: "pointer",
    textShadow: "0 0 6px #64ffdaaa",
    transition: "color 0.3s ease",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "rgba(0, 191, 165, 0.15)",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(0,191,165,0.6)",
    padding: "0.5rem 0",
    width: "160px",
    backdropFilter: "blur(10px)",
    zIndex: 100,
  },
  dropdownItem: {
    padding: "0.6rem 1rem",
    color: "#b2dfdb",
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
    borderRadius: 8,
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  dropdownItemHover: {
    backgroundColor: "rgba(100, 255, 218, 0.4)",
    color: "#003f6b",
  },
};

const Navbar = () => {
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = styles.dropdownItemHover.backgroundColor;
    e.currentTarget.style.color = styles.dropdownItemHover.color;
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = styles.dropdownItem.color;
  };

  const handleLogoClick = () => {
    window.location.reload(); // Refresh the page when logo is clicked
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo} onClick={handleLogoClick}>
          VoiceNews
        </div>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>
            <button
              onClick={() => setFeaturesOpen(!featuresOpen)}
              style={styles.button}
              aria-haspopup="true"
              aria-expanded={featuresOpen}
            >
              Features ▼
            </button>
            {featuresOpen && (
              <ul style={styles.dropdown}>
                {["Voice Recognition", "News Aggregation", "Text Search"].map((item) => (
                  <li
                    key={item}
                    style={styles.dropdownItem}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={() => setFeaturesOpen(false)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li style={styles.menuItem}>
            <a href="#news" style={styles.link} onClick={() => setFeaturesOpen(false)}>
              News
            </a>
          </li>
          <li style={styles.menuItem}>
            <a href="#contact" style={styles.link} onClick={() => setFeaturesOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
