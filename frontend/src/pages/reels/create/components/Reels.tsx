import React from "react";
import css from "../style.module.css";
import { GrClose } from "react-icons/gr";

interface ReelsProps {
  video: File | null;
  setVideo: (video: File | null) => void;
}

const Reels: React.FC<ReelsProps> = React.memo(({ video, setVideo }) => {
  const url = video ? URL.createObjectURL(video) : "";

  return (
    <div className={css.canvas}>
      {video && (
        <div
          className={css.removeReelsIcon}
          onClick={() => {
            setVideo(null);
            console.log("pressed");
          }}
        >
          <GrClose />
        </div>
      )}

      {video && (
        <video key={url} controls muted loop preload="auto" autoPlay className={css.reelsVid}>
          <source src={URL.createObjectURL(video)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
});

export default Reels;
