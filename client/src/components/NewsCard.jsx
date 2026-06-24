import React from "react";
import "./NewsCard.css";

const NewsCard = ({ title, link, source, thumbnail }) => {
  return (
    <div className="news-card">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={thumbnail}
          alt={title}
          className="news-thumbnail"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
        <h3 className="news-title">{title}</h3>
      </a>
      <p className="news-source">{source}</p>
    </div>
  );
};

export default NewsCard;
