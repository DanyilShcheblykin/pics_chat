import { useEffect, useState } from "react";
import ComentCard from "../../components/coment-card/coment-card";
import CommentArea from "../../components/comment-area/comment-area";
import './home.scss'

export interface CommentsData {
  body: string;
  id?: number;
  user?: { id: number; username: string };
}

function HomePage() {
  const [comments, setComments] = useState<Array<CommentsData>>();

  useEffect(() => {
    fetch("https://dummyjson.com/comments?limit=3")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setComments(data.comments);
      });
  }, []);

  const deleteCard = (cardIndex: number) => {
    const filtedComments = comments?.filter(
      (item, index) => index !== cardIndex
    );
    setComments(filtedComments);
  };

  return (
    <section className="home-page container">
        <div className="comments-container">
          <div>
            {comments?.map((item, index) => (
              <ComentCard
                index={index}
                deleteCard={deleteCard}
                name={item.user?.username || ""}
                comment={item.body}
              ></ComentCard>
            ))}
          </div>
          <div>
            <CommentArea setComments={setComments}></CommentArea>
          </div>
        </div>
    </section>
  );
}

export default HomePage;
