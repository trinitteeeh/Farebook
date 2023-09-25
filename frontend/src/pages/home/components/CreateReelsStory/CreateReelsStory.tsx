import { CgCardHearts } from "react-icons/cg";
import css from "./style.module.css";
import { GiOpenBook } from "react-icons/gi";
import { ImFilm } from "react-icons/im";
import { IoPersonCircle } from "react-icons/io5";
import { LuClock8 } from "react-icons/lu";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";

export default function CreateReelsStory() {
  const navigate = useNavigate();
  const [isStory, setIsStory] = useState(true);

  const handleNavigate = () => {
    isStory ? navigate("/stories/create") : navigate("/reels/create");
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <div className={`${css.menuItem} ${isStory ? css.menuItemActive : ""}`} onClick={() => setIsStory(true)}>
            <GiOpenBook size="36" />
            <h3>Stories</h3>
          </div>
          <div className={`${css.menuItem} ${!isStory ? css.menuItemActive : ""}`} onClick={() => setIsStory(false)}>
            <ImFilm size="36" />
            <h3>Reels</h3>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.imageContainer}>
            <div className={css.imageCard}>
              <IoPersonCircle className={css.cardImage} />
            </div>
            <button className={css.addReelsBtn} onClick={handleNavigate}>
              <BsPlus className={css.addIcon} />
            </button>
            <h3>{isStory ? "Create Story" : "Create Reels"}</h3>
          </div>
          <div className={css.descriptionContainer}>
            <div className={css.descriptionItem}>
              <CgCardHearts className={css.descriptionItemIcon} />
              <h4>{isStory ? "Share everyday moments with friends and family." : "Create fun and interactive reels."}</h4>
            </div>
            <div className={css.descriptionItem}>
              <LuClock8 className={css.descriptionItemIcon} />
              <h4>{isStory ? "Story dissapear after 24 hours." : "Share your best moment with people around the world"}</h4>
            </div>
            <div className={css.descriptionItem}>
              <FaFacebookMessenger className={css.descriptionItemIcon} />
              <h4>{isStory ? "Replies and reactions are private" : "Gain views by making cretive reels"}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
