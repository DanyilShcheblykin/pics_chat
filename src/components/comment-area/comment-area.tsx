import React, { useEffect, useState } from "react";
import "./comment-area.scss";
import { CommentsData } from "../../App";

interface CommentAreaProps {
  setComments: React.Dispatch<React.SetStateAction<CommentsData[] | undefined>>;
}

const CommentArea = ({ setComments }: CommentAreaProps) => {
  const [text, setText] = useState<string>(
    localStorage.getItem("savedText") || "" 
  );

  const saveText = () => {
    console.log("Saving text:", text);
    localStorage.setItem("savedText", text ? text : "");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", saveText);

    return () => {
      window.removeEventListener("beforeunload", saveText);
    };
  }, [text]);

  const addComment = () => {
    setComments((prev) => {
      if (prev && text) {
        const newObj = { body: text };
        const newState = [...prev, newObj];
        return newState;
      }
      return prev;
    });
    setText("")
  };

  return (
    <section className="coment-area">
      <div className="coment-area-block">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-area"
          rows={5}
        ></textarea>
        <button onClick={addComment} className="coment-button">
          Send
        </button>
      </div>
    </section>
  );
};

export default CommentArea;
