import { useEffect, useState } from "react";
import "./coment-card.scss";
import { UserInfo } from "../../pages/home/home";

interface CommentCardProps {
  body: string;
  user: UserInfo;
  deleteCard: (index: number) => void;
  index: number;
}

const CommentCard = ({
  body: comment,
  user,
  deleteCard,
  index,
}: CommentCardProps) => {
  const [showCard, setShowCard] = useState(false);

  const { username, initials } = user;

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
          <span>{username}</span>
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
