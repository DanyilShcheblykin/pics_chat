import "./coment-card.scss";

interface CommentCardProps {
  name: string;
  initils: string;
  comment: string;
  deleteCard: (index: number) => void;
  index: number;
}

const CommentCard = ({
  name,
  initils,
  comment,
  deleteCard,
  index,
}: CommentCardProps) => {
  return (
    <div className="comment-card">
      <div className="user-block">
        <div className="user-initials">
          <span>{initils}</span>
        </div>
        <div className="user-name">
          <span>{name}</span>
        </div>
      </div>
      <div onClick={() => deleteCard(index)} className="button-container">
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
