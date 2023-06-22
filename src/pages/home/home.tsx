import { useEffect, useState } from "react";
import ComentCard from "../../components/coment-card/coment-card";
import CommentArea from "../../components/comment-area/comment-area";
import "./home.scss";

export interface FetchedCommentsData {
  body: string;
  user?: { username: string };
}

export interface CommentsData extends FetchedCommentsData {
  user?: { username: string; initials: string };
}

function HomePage() {
  const [comments, setComments] = useState<Array<CommentsData>>();

  useEffect(() => {
    fetch("https://dummyjson.com/comments?limit=3")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        const newArray = data.comments.map((item: FetchedCommentsData) => {
          const user = {
            username: item.user?.username,
            initials: getUserInitils(item.user?.username || ""),
          };
          return { ...item, user };
        });
        setComments(newArray);
      });
  }, []);

  const deleteCard = (cardIndex: number) => {
    const filtedComments = comments?.filter(
      (item, index) => index !== cardIndex
    );
    setComments(filtedComments);
  };

  const getUserInitils = (name: string) => {
    const arrayNames = name.split(" ");

    const containSecondName = arrayNames.length > 1;
    if (containSecondName) {
      const nameInitial = arrayNames[0][0].toUpperCase();
      const secondNameInitial = arrayNames[1][0].toUpperCase();
      const initials = nameInitial + secondNameInitial;
      return initials;
    }
    const nameInitial = arrayNames[0][0].toUpperCase();
    return nameInitial;
  };

  return (
    <section className="home-page container">
      <div className="comments-container">
        <div className="comments">
          {comments?.map((item, index) => (
            <ComentCard
              index={index}
              deleteCard={deleteCard}
              name={item.user?.username || ""}
              comment={item.body}
              initils={item.user?.initials || ""}
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
