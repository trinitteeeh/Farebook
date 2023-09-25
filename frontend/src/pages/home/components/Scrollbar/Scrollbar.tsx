import React, { useState, useEffect } from "react";
import CreatePost from "../CreatePost/CreatePost";
import CreateReelsStory from "../CreateReelsStory/CreateReelsStory";
import Post from "../Post/post";
import css from "./style.module.css";
import { animateScroll as scroll } from "react-scroll";

interface ScrollbarProps {
  posts: PostType[] | null;
  refetchData: () => void;
  fetchMore: () => void;
  itemsLoaded: number;
  setItemsLoaded: (item: number) => void;
  isProfile: boolean;
  user: User;
  isGroup: boolean;
}

const Scrollbar: React.FC<ScrollbarProps> = ({ posts, fetchMore, refetchData, itemsLoaded, setItemsLoaded, isProfile, user, isGroup }) => {
  const [load, setLoad] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const existingPosts = posts || []; // Preserve existing posts

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (!load && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      if ((existingPosts.length ?? 0) >= itemsLoaded) {
        setLoad(true);
        setItemsLoaded(itemsLoaded + 3);
        fetchMore();
        const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
        setScrollPosition(currentPosition);
        setLoad(false);
      }
    }
  };

  useEffect(() => {
    // Add a scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, existingPosts.length, itemsLoaded, scrollPosition]);

  useEffect(() => {
    if (scrollPosition > 0) {
      scroll.scrollTo(scrollPosition, {
        duration: 100,
        smooth: true,
      });
      setScrollPosition(0);
    }
  }, [scrollPosition]);

  // console.log(existingPosts);
  // console.log(posts);

  return (
    <div className={css.container} style={{ width: isProfile ? "100%" : "65%" }}>
      {!isProfile && <CreateReelsStory />}
      {!isGroup && <CreatePost refetchData={refetchData} setLoad={setLoad} user={user} />}
      {load && (
        <div className={css.loadingOverlay}>
          <img src="assets/load.gif" width="75px" height="75px" alt="Loading" />
        </div>
      )}
      {existingPosts.length <= 0 ? (
        <div style={{ backgroundColor: "#ffffff", width: "100%", height: "20vh", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
          <p>No posts available.</p>
        </div>
      ) : (
        existingPosts
          .slice(0, itemsLoaded)
          .map((post: PostType) => (
            <Post
              images={post.mediaLink}
              likes={post.likesCount}
              profileLocation="Alsut"
              profileName={`${post.user.firstName} ${post.user?.surename}`}
              text={post.postText}
              key={post.id}
              id={post.id}
              isLiked={post.isLiked}
              profileURL={post.user?.profileURL ? post.user.profileURL : ""}
              user={user}
              profileID={post.user.id}
              refetchPost={refetchData}
            />
          ))
      )}
    </div>
  );
};

export default Scrollbar;
