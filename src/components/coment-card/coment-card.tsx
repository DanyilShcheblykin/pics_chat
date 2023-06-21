import React from "react";
import "./coment-card.scss";

interface CommentCardProps {
  name: string;
  comment: string;
  deleteCard: (index:number) => void;
  index: number;
}

const CommentCard = ({
  name,
  comment,
  deleteCard,
  index,
}: CommentCardProps) => {
  return (
    <div className="comment-card">
      <div className="user-block">
        <div className="user-initials">
          <span>DA</span>
        </div>
        <div className="user-name">
          <span>{name}</span>
        </div>
      </div>
      <div onClick={()=> deleteCard(index)} className="button-container">
        <div className="delete-button">
          <div className="cross"></div>
        </div>
      </div>
      <div className="comment-text">
        <span>{comment}</span>
      </div>
    </div>
  );
};

export default CommentCard;
