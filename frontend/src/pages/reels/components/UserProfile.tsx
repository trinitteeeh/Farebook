import { BsPersonCircle } from "react-icons/bs";
import css from "../style.module.css";

interface ProfileProps {
  profilePicture?: string;
  username: string;
}

const ProfileDisplay: React.FC<ProfileProps> = ({ profilePicture, username }) => {
  return (
    <>
      <div className={css.profileContainer}>
        {profilePicture === "" ? (
          <div className={css.icon}>
            <BsPersonCircle color="#ffffff" />
          </div>
        ) : (
          <div className={css.profileIcon}></div>
        )}
        <h4 style={{ margin: 0, display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#ffffff", fontWeight: 700 }}>{username}</h4>
      </div>
    </>
  );
};

export default ProfileDisplay;
