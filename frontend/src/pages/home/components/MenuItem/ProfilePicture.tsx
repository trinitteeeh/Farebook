import React from "react";
import css from "./style.module.css";
import { useNavigate } from "react-router-dom";

interface ProfilePictureProps {
  pictureURL: string;
  text: string;
  id: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ pictureURL, text, id }) => {
  const navigate = useNavigate();
  return (
    <div className={css.container} onClick={() => navigate("/profile/" + id)}>
      <div className={css.imageContainer}>
        <img src={pictureURL !== "" ? pictureURL : "/assets/blank-profile.png"} alt="" />
      </div>
      <h4>{text}</h4>
    </div>
  );
};

export default ProfilePicture;
