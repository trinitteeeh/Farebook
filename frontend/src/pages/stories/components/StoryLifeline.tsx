import { useEffect, useState } from "react";
import css from "./style.module.css";

interface StoryLifelineProps {
  isActive?: boolean;
  nextSlide: () => void;
}

const StoryLifeline: React.FC<StoryLifelineProps> = ({ isActive, nextSlide }) => {
  const [progress, setProgress] = useState(0);
  const progressInterval = 50;
  const totalDuration = 5000;
  const totalSteps = totalDuration / progressInterval;
  let timeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    // Reset progress to 0 and clear the timeout when isActive changes
    setProgress(0);
    if (timeout) {
      clearTimeout(timeout);
    }

    if (isActive) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeout = setTimeout(nextSlide, totalDuration);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isActive, nextSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 100 / totalSteps;
        return newProgress <= 100 ? newProgress : 100;
      });
    }, progressInterval);

    return () => clearInterval(interval);
  }, [totalSteps]);

  return (
    <div className={css.lifeline}>
      <div className={css.progressBar} style={{ width: isActive ? `${progress}%` : "0" }}></div>
    </div>
  );
};

export default StoryLifeline;
