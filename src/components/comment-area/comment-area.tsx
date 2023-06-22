import React, { useEffect, useState } from "react";
import "./comment-area.scss";
import { CommentsData } from "../../pages/home/home";

interface CommentAreaProps {
  setComments: React.Dispatch<React.SetStateAction<CommentsData[] | undefined>>;
}

const CommentArea = ({ setComments }: CommentAreaProps) => {
  const [text, setText] = useState<string>(
    localStorage.getItem("savedText") || ""
  );

  const names = [
    "John Lan",
    "Jane Ran",
    "Alice Vina",
    "Bob Lisa",
    "Emily Laha",
    "David Flor",
  ];

  function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];
    const splitedName = randomName.split("");
    const nameInitial = splitedName[0][0].toUpperCase();
    const secondNameInitial = splitedName[1][0].toUpperCase();
    const initials = nameInitial + secondNameInitial;
    return {
      name: names[randomIndex],
      initials: initials,
    };
  }

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
    const { name, initials } = getRandomName();
    setComments((prev: CommentsData[] | undefined) => {
      if (prev && text) {
        const newObj: CommentsData = {
          body: text,
          user: { username: name, initials: initials },
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
