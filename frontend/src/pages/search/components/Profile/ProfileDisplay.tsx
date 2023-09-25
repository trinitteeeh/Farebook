import { useNavigate } from "react-router-dom";
import css from "./style.module.css";

interface ProfileProps {
  user: User;
}

const ProfileDisplay: React.FC<ProfileProps> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className={css.container}>
      <div className={css.profilePicture}>
        <img src={user.profileURL !== "" ? user.profileURL : "/assets/blank-profile.png"} alt="" />
      </div>
      <div className={css.profileDescription}>
        <h4>{user.firstName + " " + user.surename}</h4>
      </div>
      <div className={css.profileAction} onClick={() => navigate("/profile/" + user.id)}>
        <button>profile</button>
      </div>
    </div>
  );
};

export default ProfileDisplay;
