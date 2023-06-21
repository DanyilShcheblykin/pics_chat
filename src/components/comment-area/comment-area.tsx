import React, { useState } from "react";
import "./comment-area.scss";
import { CommentsData } from "../../App";

interface CommentAreaProps {
  setComments: React.Dispatch<React.SetStateAction<CommentsData[] | undefined>>;
}

const CommentArea = ({ setComments }: CommentAreaProps) => {
  const [text, setText] = useState<CommentsData>();

  const addComment = () => {
    setComments((prev) => {
      if (prev && text) {
        const newState = [...prev, text];
        return newState;
      }
      return prev;
    });
  };

  return (
    <section className="coment-area">
      <div className="coment-area-block">
        <textarea
          value={text?.body}
          onChange={(e) => setText({ body: e.target.value })}
          className="text-area"
          rows={5}
        ></textarea>
        <button onClick={addComment} className="coment-button">Send</button>
      </div>
    </section>
  );
};

export default CommentArea;
