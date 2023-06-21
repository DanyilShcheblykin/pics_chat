import React, { useEffect, useState } from "react";
import "./styles/global.scss";
import ComentCard from "./components/coment-card/coment-card";
import CommentArea from "./components/comment-area/comment-area";

export interface CommentsData {
  body: string;
  id?: number;
  user?: { id: number; username: string };
}

function App() {
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
    const filtedComments = comments?.filter((item, index) => index !== cardIndex);
    setComments(filtedComments)
  };

  return (
    <div>
      <div className="container">
        {comments?.map((item, index) => (
          <ComentCard
            index={index}
            deleteCard={deleteCard}
            name={item.user?.username || ""}
            comment={item.body}
          ></ComentCard>
        ))}

        <CommentArea setComments={setComments}></CommentArea>
      </div>
    </div>
  );
}

export default App;
