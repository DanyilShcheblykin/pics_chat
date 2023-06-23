import React, { useEffect, useState } from "react";
import "./comment-area.scss";
import { CommentsData, FETCHED_DATA_LIMIT } from "../../pages/home/home";

interface CommentAreaProps {
  setComments: React.Dispatch<React.SetStateAction<CommentsData[] | undefined>>;
}

const CommentArea = ({ setComments }: CommentAreaProps) => {
  const [cardId, setCardId] = useState<number>(FETCHED_DATA_LIMIT);
  const [text, setText] = useState<string>(
    () => localStorage.getItem("savedText") ?? ""
  );

  const names = [
    "John Lan",
    "Jane Ran",
    "Alice Vina",
    "Bob Lisa",
    "Emily Laha",
    "David Flor",
  ];

  const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    const [name, secondName] = names[randomIndex].split(" ");
    const initials = name[0].toUpperCase() + secondName[0].toUpperCase();
    return { name: names[randomIndex], initials };
  };

  useEffect(() => {
    const saveText = () => {
      localStorage.setItem("savedText", text);
    };
    window.addEventListener("beforeunload", saveText);

    return () => {
      window.removeEventListener("beforeunload", saveText);
    };
  }, [text]);

  const addComment = () => {
    const { name, initials } = getRandomName();
    setComments((prev) => {
      if (prev && text) {
        const newCardId = cardId + 1;
        setCardId(newCardId);
        const newObj: CommentsData = {
          id: newCardId,
          body: text,
          user: { username: name, initials },
        };
        const newState = [...prev, newObj];
        return newState;
      }
      return prev;
    });
    setText("");
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