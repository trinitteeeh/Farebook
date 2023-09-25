import { useNavigate } from "react-router-dom";
import MenuItem from "../MenuItem/MenuItem";
import css from "./style.module.css";
import { FcClapperboard, FcCollaboration, FcConferenceCall, FcFilm } from "react-icons/Fc";
import ProfilePicture from "../MenuItem/ProfilePicture";

interface MenuSidebarProps {
  user: User | null;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={css.container}>
        {" "}
        <div onClick={() => navigate("/profile/" + user?.id)}>
          <ProfilePicture text={user?.firstName + " " + user?.surename} pictureURL={user?.profileURL ? user.profileURL : ""} key={user?.id} id={user?.id ? user.id : ""} />
        </div>
        <MenuItem logo={<FcCollaboration />} text={"Friends"} onClick={() => navigate("/friends")} />
        <MenuItem logo={<FcFilm />} text={"Reels"} onClick={() => navigate("/reels")} />
        <MenuItem logo={<FcConferenceCall />} text={"Groups"} onClick={() => navigate("/group")} />
        <MenuItem logo={<FcClapperboard />} text={"Story"} onClick={() => navigate("/stories")} />
      </div>
    </>
  );
};

export default MenuSidebar;
