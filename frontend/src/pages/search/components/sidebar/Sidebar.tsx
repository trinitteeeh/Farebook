import css from "./style.module.css";
import { IoCompassOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsFillPersonFill } from "react-icons/bs";

interface SidebarProps {
  displayState: number;
  setDisplayState: (state: number) => void;
  search: string;
}

const Sidebar: React.FC<SidebarProps> = ({ displayState, setDisplayState, search }) => {
  return (
    <div className={css.container}>
      <div className={css.sidebarHeader}>
        <div style={{ borderBottom: "1px solid #cdd0d4", paddingBottom: "0.8rem" }}>
          <h2>Search Result for</h2>
          <h5 style={{ color: "#65696c", fontWeight: "500" }}>{search}</h5>
        </div>
      </div>
      <div className={css.sidebarMenu}>
        <h4 style={{ margin: "0.5rem " }}>Filter</h4>
        <div className={`${css.menu} ${displayState === 0 ? css.menuActive : ""}`} onClick={() => setDisplayState(0)}>
          <div className={css.icon}>
            <IoCompassOutline />
          </div>
          <h5>Post</h5>
        </div>
        <div className={`${css.menu} ${displayState === 1 ? css.menuActive : ""}`} onClick={() => setDisplayState(1)}>
          <div className={css.icon}>
            <HiOutlineUserGroup />
          </div>
          <h5>Group</h5>
        </div>
        <div className={`${css.menu} ${displayState === 2 ? css.menuActive : ""}`} onClick={() => setDisplayState(2)}>
          <div className={css.icon}>
            <BsFillPersonFill />
          </div>
          <h5>User</h5>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
