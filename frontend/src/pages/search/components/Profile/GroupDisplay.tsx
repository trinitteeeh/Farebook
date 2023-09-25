import { useNavigate } from "react-router-dom";
import css from "./style.module.css";

interface GroupProps {
  group: Group;
}

const GroupDisplay: React.FC<GroupProps> = ({ group }) => {
  const navigate = useNavigate();
  console.log("masuk group");
  return (
    <div className={css.container}>
      <div className={css.profilePicture}>
        <img src={group.profileURL !== "" ? group.profileURL : "/assets/facebook_group_profile.png"} alt="" />
      </div>
      <div className={css.profileDescription}>
        <h4>{group.name}</h4>
      </div>
      <div className={css.profileAction} onClick={() => navigate("/group/profile/" + group.id)}>
        <button>profile</button>
      </div>
    </div>
  );
};

export default GroupDisplay;
