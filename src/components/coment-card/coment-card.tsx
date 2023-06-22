import { useEffect, useState } from "react";
import "./coment-card.scss";

interface CommentCardProps {
  name: string;
  initials: string;
  comment: string;
  deleteCard: (index: number) => void;
  index: number;
}

const CommentCard = ({
  name,
  initials,
  comment,
  deleteCard,
  index,
}: CommentCardProps) => {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setShowCard(true);
  }, []);

  const handleDelete = ()=>{
    setShowCard(prev=>!prev)
    setTimeout(()=>{
      deleteCard(index)
      setShowCard(true)
    } , 300)
  }

  return (
    <div className={`comment-card ${showCard ? "appear" : "disappear"}`}>
      <div className="user-block">
        <div className="user-initials">
          <span>{initials}</span>
        </div>
        <div className="user-name">
          <span>{name}</span>
        </div>
      </div>
      <div onClick={handleDelete} className="button-container">
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
