import React from "react";
import css from "../style.module.css";
import ProfileDisplay from "./UserProfile";

interface ReelsProps {
  reel: Reel;
}

const Reels: React.FC<ReelsProps> = React.memo(({ reel }) => {
  return (
    <div className={css.canvas}>
      <ProfileDisplay username={reel?.user?.firstName + " " + reel?.user?.surename} profilePicture="" />
      <video key={reel.id} controls muted loop preload="auto" autoPlay className={css.reelsVid}>
        <source src={reel.mediaURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
});

export default Reels;
