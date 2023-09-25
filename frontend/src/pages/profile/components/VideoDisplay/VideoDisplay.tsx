import { useEffect, useState } from "react";
import css from "../PhotoDisplay/style.module.css";
import { useQuery } from "@apollo/client";
import { GET_REELS_BY_USER_ID } from "../../query";

interface VideoDisplayProps {
  user: User | null;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ user }) => {
  const [reels, setReels] = useState<string[] | null>(null);

  const { data, loading } = useQuery(GET_REELS_BY_USER_ID, {
    variables: { userID: user ? user.id : "f4b80d79-a67b-4d24-b27e-01c79fb31683" },
  });

  useEffect(() => {
    if (!loading && data) {
      setReels(data.getReelsURLByUserID);
    }
  }, [data, loading]);

  if (loading) {
    return <p>loading</p>;
  }
  if (!data) {
    return;
  }

  return (
    <div className={css.container}>
      <h2 style={{ textAlign: "start", marginBottom: "2vh" }}>Video</h2>
      <div className={css.gridContainer}>
        {reels?.map((reel, index) => (
          <div className={css.photo}>
            <video key={index} controls muted loop>
              <source src={reel} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDisplay;
