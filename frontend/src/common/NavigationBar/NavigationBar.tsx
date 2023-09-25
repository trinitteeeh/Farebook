import { Link, useNavigate } from "react-router-dom";
import css from "./style.module.css";
import { FaFacebook } from "react-icons/fa";
import { BsSearch, BsMessenger } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import { MdNotifications, MdOutlineGroups3 } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { FaGamepad } from "react-icons/fa";
import { useContext, useState } from "react";
import { TfiVideoClapper } from "react-icons/tfi";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";

const NavigationBar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { setIsAuth, setUser, setToken, user } = authContext;

  const [search, setSearch] = useState("");

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchQuery = search;

    navigate(`/search/` + searchQuery);
  };

  const handleSignout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuth(false);
    setUser(null);
    setToken("");
    navigate("/signin");
  };

  return (
    <>
      <nav className={css.navbar}>
        <div className={css.leftSide}>
          <Link to="/" className={css.logoLink}>
            <FaFacebook className={css.logoButton} />
          </Link>
          <div className={css.searchbarContainer}>
            <form onSubmit={handleSubmitSearch}>
              <input type="text" placeholder="Search on facebook" className={css.searchInput} onChange={(e) => setSearch(e.target.value)} value={search} />
            </form>
            <BsSearch color="black" />
          </div>
        </div>
        <div className={css.middleSide}>
          <div className={css.toggleMenu} onClick={() => navigate("/")}>
            <AiFillHome className={css.logoImage} color="#65676b" />
            <div className={css.toggleMenuLine}></div>
            <div className={css.hoverTitle}>Home</div>
          </div>
          <div className={css.toggleMenu} onClick={() => navigate("/friends")}>
            <MdOutlineGroups3 className={css.logoImage} color="#65676b" />
            <div className={css.toggleMenuLine}></div>
            <div className={css.hoverTitle}>Friends</div>
          </div>
          <div className={css.toggleMenu} onClick={() => navigate("/reels")}>
            <TfiVideoClapper className={css.logoImage} color="#65676b" />
            <div className={css.toggleMenuLine}></div>
            <div className={css.hoverTitle}>Reels</div>
          </div>
          <div className={css.toggleMenu} onClick={() => navigate("/group")}>
            <FaGamepad className={css.logoImage} color="#65676b" />
            <div className={css.toggleMenuLine}></div>
            <div className={css.hoverTitle}>Group</div>
          </div>
        </div>
        <div className={css.rightSide}>
          <div className={css.logoBackground}>
            <Link to="/" className={css.logoLink}>
              <CgMenuGridO className={css.logoImage} color="#050505" />
            </Link>
            <div className={css.hoverTitle}>Menu</div>
          </div>
          <div className={css.logoBackground} onClick={() => navigate("/messenger")}>
            <BsMessenger className={css.logoImage} color="#050505" />
            <div className={css.hoverTitle}>Messenger</div>
          </div>
          <div className={css.logoBackground} onClick={() => navigate("/notification")}>
            <MdNotifications className={css.logoImage} color="#050505" />
            <div className={css.hoverTitle}>Notification</div>
          </div>
          <div className={css.logoBackground} onClick={handleSignout}>
            <img src={user?.profileURL !== "" ? user?.profileURL : "/assets/blank-profile.png"} alt="" />
            <div className={css.hoverTitle}>Profile</div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
