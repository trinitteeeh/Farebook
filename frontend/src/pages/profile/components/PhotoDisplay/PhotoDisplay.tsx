import { useEffect, useState } from "react";
import css from "./style.module.css";
import { useQuery } from "@apollo/client";
import { GET_PICTURE_BY_USER_ID } from "../../query";

interface PhotoDisplayProps {
  user: User | null;
  isPostDisplay: boolean;
}

const PhotoDisplay: React.FC<PhotoDisplayProps> = ({ user, isPostDisplay }) => {
  const [photos, setPhotos] = useState<string[] | null>(null);

  const { data, loading } = useQuery(GET_PICTURE_BY_USER_ID, {
    variables: { userID: user ? user.id : "f4b80d79-a67b-4d24-b27e-01c79fb31683" },
  });

  useEffect(() => {
    if (!loading && data) {
      setPhotos(data.getPictureByUserID);
    }
  }, [data, loading]);

  if (loading) {
    return <p>loading</p>;
  }
  if (!data) {
    return;
  }

  return (
    <div className={`${css.container} ${isPostDisplay ? css.containerPost : ""}`}>
      <h2 style={{ textAlign: "start", marginBottom: "2vh" }}>Photos</h2>
      <div className={`${css.gridContainer} ${isPostDisplay ? css.gridPostContainer : ""}`}>
        {photos === null ? (
          <p>Loading...</p>
        ) : photos.length <= 0 ? (
          <div style={{ width: "100%", height: "100%" }}>
            <p>No Photo Available.</p>
          </div>
        ) : (
          photos.map((photo, index) => (
            <div className={css.photo} key={index}>
              <img src={photo} alt="" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PhotoDisplay;
