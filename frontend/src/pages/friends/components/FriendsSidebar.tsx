import { IoPersonAdd, IoSettings } from "react-icons/io5";
import css from "./style.module.css";
import FriendsFilter from "./FriendsFilter";
import { MdPeople } from "react-icons/md";
import { BsFillPersonDashFill, BsFillPersonLinesFill } from "react-icons/bs";

interface FriendsSidebar {
  setDisplayState: (state: number) => void;
}

const FriendsSidebar: React.FC<FriendsSidebar> = ({ setDisplayState }) => {
  return (
    <div className={css.sidebarContainer}>
      <div className={css.sidebarHeader}>
        <h2>Friends</h2>
        <div className={css.icon}>
          <IoSettings color="#1c1f24" />
        </div>
      </div>
      <div className={css.sidebarContent}>
        <div onClick={() => setDisplayState(0)}>
          <FriendsFilter icon={<MdPeople />} text="Home" />
        </div>
        <div onClick={() => setDisplayState(1)}>
          <FriendsFilter icon={<IoPersonAdd />} text="Friend Requests" />
        </div>
        <div onClick={() => setDisplayState(2)}>
          <FriendsFilter icon={<BsFillPersonDashFill />} text="Suggestion" />
        </div>
        <div onClick={() => setDisplayState(3)}>
          <FriendsFilter icon={<BsFillPersonLinesFill />} text="All Friends" />
        </div>
      </div>
    </div>
  );
};

export default FriendsSidebar;
