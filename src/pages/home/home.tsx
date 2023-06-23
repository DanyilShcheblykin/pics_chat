import { useEffect, useState } from "react";
import ComentCard from "../../components/coment-card/coment-card";
import CommentArea from "../../components/comment-area/comment-area";
import "./home.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export interface UserInfo{
  username: string; initials: string 
}

export interface FetchedCommentsData {
  body: string;
  user: { username: string };
}

export interface CommentsData extends FetchedCommentsData {
  user: { username: string; initials: string };
}

function HomePage() {
  const fetchedDataLimit = 3;
  const API_URL = `https://dummyjson.com/comments?limit=${fetchedDataLimit}`;

  const [comments, setComments] = useState<Array<CommentsData>>();

  useEffect(() => {
    fetch(API_URL)
      .then((data) => data.json())
      .then((data) => {
        const newArray = data.comments.map((item: FetchedCommentsData) => ({
          ...item,
          user: {
            username: item.user?.username,
            initials: getUserInitials(item.user?.username || ""),
          },
        }));
        setComments(newArray);
      });
  }, []);

  const deleteCard = (cardIndex: number) => {
    if (comments) {
      const filteredComments = comments.filter(
        (_, index) => index !== cardIndex
      );
      setComments(filteredComments);
    }
  };

  const getUserInitials = (name: string) => {
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
          {comments && comments.length > 0 && (
            <PerfectScrollbar>
              {comments.map((commentInfo, index) => (
                <ComentCard
                  {...commentInfo}
                  key={index}
                  index={index}
                  deleteCard={deleteCard}
                />
              ))}
            </PerfectScrollbar>
          )}
        </div>

        <div>
          <CommentArea setComments={setComments}></CommentArea>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
