import React from "react";
import "../../../styles/ActivityCard.css";

function ActivityCard({ activity }) {
  const { imageUrl, title, author } = activity;

  return (
    <div className="activity-card">
      <div className="image-container">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{author}</p>
      </div>
    </div>
  );
}

export default ActivityCard;
