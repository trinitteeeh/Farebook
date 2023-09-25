import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import css from "./style.module.css";
import { useQuery } from "@apollo/client";
import { GET_ALL_STORY_BY_USERID } from "../query";
import Story from "./Story";
import React, { useState } from "react";
import StoryLifeline from "./StoryLifeline";
import ProfileDisplay from "./Profile";

interface StoryCarouselProps {
  userID: string;
  username: string;
  setCurrentUserIndex: (index: number) => void;
  userIndex: number;
  userCount: number;
  profileURL: string;
}

const StoryCarousel: React.FC<StoryCarouselProps> = ({ userID, setCurrentUserIndex, userIndex, userCount, username, profileURL }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, loading } = useQuery(GET_ALL_STORY_BY_USERID, {
    variables: { userID: userID },
  });

  if (loading) {
    return <div>Loading</div>;
  }
  if (!data) return;

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      if (userIndex > 0) {
        setCurrentUserIndex(userIndex - 1);
      } else {
        setCurrentUserIndex(userCount - 1);
      }
      const storiesCount = data.getStoryByUserId.length;
      setCurrentIndex(storiesCount - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < data.getStoryByUserId.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      if (userIndex < userCount - 1) {
        setCurrentUserIndex(userIndex + 1);
      } else {
        setCurrentUserIndex(0);
      }
      setCurrentIndex(0);
    }
  };

  if (data.getStoryByUserId.length <= 0) {
    if (userIndex < userCount - 1) {
      setCurrentUserIndex(userIndex + 1);
    } else {
      setCurrentUserIndex(0);
    }
    setCurrentIndex(0);
  }

  return (
    <>
      <div className={css.carouselContainer}>
        <div className={css.moveStoryBtn} onClick={prevSlide}>
          <FaLessThan />
        </div>
        <div className={css.storyContainer}>
          <ProfileDisplay username={username} profilePicture={profileURL} />
          <div className={css.lifelineContainer}>
            {data.getStoryByUserId.map((story: Story, index: number) => (
              <StoryLifeline key={story.id} isActive={index === currentIndex} nextSlide={nextSlide} />
            ))}
          </div>

          {data.getStoryByUserId.map((story: Story, index: number) => (
            <React.Fragment key={story.id}>
              <Story key={story.id} story={story} isActive={index === currentIndex} />
            </React.Fragment>
          ))}
        </div>
        <div className={css.moveStoryBtn} onClick={nextSlide}>
          <FaGreaterThan />
        </div>
      </div>
    </>
  );
};

export default StoryCarousel;
