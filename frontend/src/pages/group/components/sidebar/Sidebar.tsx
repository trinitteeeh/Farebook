import { useState } from "react";
import css from "./style.module.css";
import { IoCompassOutline, IoSettings } from "react-icons/io5";
import { MdOutlineFeed } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  displayState: number;
  setDisplayState: (state: number) => void;
  groups: Group[];
}

const Sidebar: React.FC<SidebarProps> = ({ groups, displayState, setDisplayState }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {};

  return (
    <div className={css.container}>
      <div className={css.sidebarHeader}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Friends</h2>
          <div className={css.icon}>
            <IoSettings color="#1c1f24" />
          </div>
        </div>
        <div>
          <form onSubmit={handleSearch}>
            <input className={css.searchbar} id="message" name="message" placeholder={`Start messaging`} value={search} onChange={(event) => setSearch(event?.target.value)}></input>
          </form>
        </div>
      </div>
      <div className={css.sidebarMenu}>
        <div className={`${css.menu} ${displayState === 0 ? css.menuActive : ""}`} onClick={() => setDisplayState(0)}>
          <div className={css.icon}>
            <MdOutlineFeed />
          </div>
          <h5>Your Feed</h5>
        </div>
        <div className={`${css.menu} ${displayState === 1 ? css.menuActive : ""}`} onClick={() => setDisplayState(1)}>
          <div className={css.icon}>
            <IoCompassOutline />
          </div>
          <h5>Discover</h5>
        </div>
        <div className={`${css.menu} ${displayState === 2 ? css.menuActive : ""}`} onClick={() => setDisplayState(2)}>
          <div className={css.icon}>
            <HiOutlineUserGroup />
          </div>
          <h5>Your Group</h5>
        </div>
        <div
          className={css.createGroupBtn}
          onClick={() => {
            navigate("/group/create");
          }}
        >
          <h4 style={{ color: "#4077f2" }}>Create new Group</h4>
        </div>
      </div>
      <div className={css.sidebarContent}>
        <h4 style={{ textAlign: "start", fontSize: "1rem" }}>Group you have joined</h4>
        {groups.map((group: Group) => (
          <div
            className={css.groupContainer}
            onClick={() => {
              navigate("/group/profile/" + group.id);
            }}
            key={group.id}
          >
            <div className={css.groupProfile}>
              <img src={group.profileURL !== "" ? group.profileURL : "/assets/facebook_group_profile.png"} alt="" />
            </div>
            <div style={{ position: "relative", flex: "1", overflowY: "hidden" }}>
              <h5 style={{ fontSize: "1.2rem" }}>{group.name}</h5>
              <h5 style={{ fontWeight: "400", position: "absolute", bottom: "0", left: "0" }}>{group.description}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
