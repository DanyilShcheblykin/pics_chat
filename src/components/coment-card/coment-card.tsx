import React from "react";
import "./coment-card.scss";

const CommentCard = () => {
  return (
    <div className="comment-card">
      <div className="user-block">
        <div className="user-initials">
          <span>DA</span>
        </div>
        <div className="user-name">
          <span>Danyil</span>
        </div>
      </div>
      <div className="button-container">
        <div className="delete-button">
          <div className="cross"></div>
        </div>
      </div>
      <div className="comment-text">
        <span>Hello HelloHelloHelloHelloHelloHello HelloHelloHello</span>
      </div>
    </div>
  );
};

export default CommentCard;
