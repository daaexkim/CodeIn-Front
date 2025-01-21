import React from "react";
import "../../../styles/Activity/ActivityCards.css";

function ActivityCard({ activity, onClick }) {
  const { images, mainImageIndex, title, author } = activity;

  // 대표 이미지
  const mainImage = images && images.length > 0
    ? images[mainImageIndex || 0]
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="activity-card" onClick={onClick}>
      <div className="image-container">
        <img src={mainImage} alt={title} />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{author}</p>
      </div>
    </div>
  );
}


function ActivityCards({activities, onCardClick}) {
  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onClick={() => onCardClick(activity)}
        />
      ))}
    </div>
  );
}

export default ActivityCards;