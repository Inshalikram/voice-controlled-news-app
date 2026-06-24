import React, { useState, useRef, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import Footer from "../Footer";

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#e0e0e0",
    fontFamily: "'Poppins', sans-serif",
    boxSizing: "border-box",
  },
  modeSwitch: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    marginBottom: 30,
    flexWrap: "wrap",
  },
  modeBtn: {
    padding: "14px 32px",
    fontSize: 16,
    cursor: "pointer",
    borderRadius: 30,
    border: "2px solid #64ffda",
    backgroundColor: "transparent",
    color: "#64ffda",
    fontWeight: 600,
    transition: "all 0.3s ease",
    boxShadow: "0 0 8px #64ffda50",
  },
  activeModeBtn: {
    padding: "14px 32px",
    fontSize: 16,
    cursor: "pointer",
    borderRadius: 30,
    border: "2px solid #64ffda",
    backgroundColor: "#64ffda",
    color: "#0d1b1e",
    fontWeight: 700,
    boxShadow: "0 6px 20px #64ffdaaa",
  },
  speakBtn: {
    display: "block",
    margin: "0 auto 40px",
    padding: "16px 60px",
    fontSize: 22,
    backgroundColor: "#00bfa5",
    color: "#fff",
    border: "none",
    borderRadius: 40,
    cursor: "pointer",
    boxShadow: "0 10px 30px #00bfa5aa",
    fontWeight: 700,
    letterSpacing: 1,
  },
  speakBtnDisabled: {
    backgroundColor: "#00695c",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginBottom: 30,
    flexWrap: "wrap",
  },
  input: {
    flexGrow: 1,
    minWidth: 260,
    maxWidth: 480,
    padding: 16,
    fontSize: 18,
    borderRadius: 35,
    border: "2px solid #64ffda",
    outline: "none",
    backgroundColor: "#052f2f",
    color: "#a0f0e0",
    boxShadow: "inset 0 0 8px #64ffda66",
    fontWeight: 600,
  },
  submitBtn: {
    padding: "16px 40px",
    fontSize: 18,
    borderRadius: 35,
    border: "none",
    backgroundColor: "#00bfa5",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 8px 25px #00bfa5bb",
    fontWeight: 700,
  },
  spokenText: {
    textAlign: "center",
    fontSize: 17,
    marginTop: -10,
    marginBottom: 15,
    fontStyle: "italic",
    color: "#80cbc4",
  },
  loading: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "#00bfa5",
    fontWeight: 700,
  },
  error: {
    textAlign: "center",
    color: "#ff5252",
    fontWeight: "bold",
    marginTop: 20,
    textShadow: "0 0 6px #ff5252",
  },
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 60,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
  },
  noResults: {
    textAlign: "center",
    fontSize: 18,
    color: "#80cbc4",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    padding: 20,
    borderRadius: 20,
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(100, 255, 218, 0.3)",
  },
  cardImage: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 16,
    marginBottom: 14,
    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
  },
  cardTitle: {
    fontWeight: 800,
    fontSize: 20,
    color: "#b2dfdb",
    marginBottom: 8,
    flexGrow: 1,
  },
  source: {
    color: "#80cbc4",
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 10,
    fontStyle: "italic",
  },
  readMore: {
    color: "#00bfa5",
    fontWeight: 700,
    textDecoration: "underline",
  },
  readAloudBtn: {
    marginTop: 10,
    background: "transparent",
    border: "none",
    color: "#64ffda",
    fontSize: "16px",
    cursor: "pointer",
    padding: 0,
    textDecoration: "underline",
    display: "inline-block",
  },
};

const ITEMS_PER_PAGE = 6;

const Home = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState("voice");
  const [query, setQuery] = useState("");
  const lastQueryRef = useRef("");
  const [listening, setListening] = useState(false);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  };

  const handleSearch = useCallback(
    async (searchTerm, newOffset = 0) => {
      try {
        setLoading(true);
        setError("");
        if (newOffset === 0) setResults([]);

        const res = await axios.post("http://localhost:5000/process", {
          command: searchTerm,
          offset: newOffset,
          limit: ITEMS_PER_PAGE,
        });

        if (!res.data.results || res.data.results.length === 0) {
          if (newOffset === 0) setError("No news found for your query.");
        } else {
          if (newOffset === 0) {
            setResults(res.data.results);
          } else {
            setResults((prev) => [...prev, ...res.data.results]);
          }
          setOffset(newOffset + res.data.results.length);
        }
      } catch {
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && query.trim() !== lastQueryRef.current) {
      lastQueryRef.current = query.trim().toLowerCase();
      setOffset(0);
      handleSearch(query.trim().toLowerCase(), 0);
    }
  };

  const loadMore = () => {
    handleSearch(query, offset);
  };

  const handleListen = () => {
    setListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
    setTimeout(() => {
      SpeechRecognition.stopListening();
      setListening(false);
      if (transcript.trim()) {
        setQuery(transcript.trim());
        lastQueryRef.current = transcript.trim().toLowerCase();
        setOffset(0);
        handleSearch(transcript.trim().toLowerCase(), 0);
      }
    }, 5000);
  };

  const handleInputChange = (e) => setQuery(e.target.value);

  return (
    <div style={styles.page}>
      <Navbar />
      <HeroSection />

      <div style={styles.modeSwitch}>
        <button
          style={inputMode === "voice" ? styles.activeModeBtn : styles.modeBtn}
          onClick={() => setInputMode("voice")}
        >
          🎙 Voice Input
        </button>
        <button
          style={inputMode === "text" ? styles.activeModeBtn : styles.modeBtn}
          onClick={() => setInputMode("text")}
        >
          ✍ Text Input
        </button>
      </div>

      {inputMode === "voice" && (
        <>
          <button
            style={{
              ...styles.speakBtn,
              ...(listening ? styles.speakBtnDisabled : {}),
            }}
            onClick={handleListen}
            disabled={listening}
            aria-label="Start voice recognition"
          >
            {listening ? "Listening..." : "Start Speaking"}
          </button>
          {transcript && (
            <p style={styles.spokenText}>You said: "{transcript}"</p>
          )}
        </>
      )}

      {inputMode === "text" && (
        <form style={styles.form} onSubmit={handleInputSubmit}>
          <input
            type="text"
            placeholder="Enter your search query"
            value={query}
            onChange={handleInputChange}
            style={styles.input}
            aria-label="Search news"
          />
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            Search
          </button>
        </form>
      )}

      {loading && <p style={styles.loading}>Loading news...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && results.length === 0 && (
        <p style={styles.noResults}>No news found. Try another query.</p>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <div style={styles.resultsGrid}>
            {results.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.card}
                aria-label={`Open news article: ${item.title}`}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={styles.cardImage}
                  />
                )}
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.source}>{item.source}</p>
                <p style={styles.readMore}>Read More →</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    speak(item.title);
                  }}
                  style={styles.readAloudBtn}
                  aria-label={`Read aloud: ${item.title}`}
                >
                  🔊 Read Aloud
                </button>
              </a>
            ))}
          </div>

          {results.length % ITEMS_PER_PAGE === 0 && (
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <button
                onClick={loadMore}
                style={styles.submitBtn}
                disabled={loading}
                aria-label="Load more news"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
 