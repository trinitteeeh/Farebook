import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import { animateScroll as scroll } from "react-scroll";
import Post from "../../../home/components/Post/post";
import ProfileDisplay from "../Profile/ProfileDisplay";
import GroupDisplay from "../Profile/GroupDisplay";

interface ScrollbarProps {
  datas: ScrollbarData;
  fetchMore: () => void;
  itemsLoaded: number;
  setItemsLoaded: (item: number) => void;
  user: User | null;
}

const Scrollbar: React.FC<ScrollbarProps> = ({ datas, fetchMore, itemsLoaded, setItemsLoaded, user }) => {
  const [load, setLoad] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  let displayedDatas: PostType[] | User[] | Group[] | null = null;

  if (datas.type === "post") {
    displayedDatas = datas.posts;
  } else if (datas.type === "user") {
    displayedDatas = datas.profile;
  } else if (datas.type === "group") {
    displayedDatas = datas.group;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (!load && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      if ((displayedDatas?.length ?? 0) >= itemsLoaded) {
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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, itemsLoaded, scrollPosition]);

  useEffect(() => {
    if (scrollPosition > 0) {
      scroll.scrollTo(scrollPosition, {
        duration: 100,
        smooth: true,
      });
      setScrollPosition(0);
    }
  }, [scrollPosition]);

  return (
    <div className={css.container}>
      {load && (
        <div className={css.loadingOverlay}>
          <img src="assets/load.gif" width="75px" height="75px" alt="Loading" />
        </div>
      )}
      {displayedDatas && displayedDatas.length > 0 ? (
        displayedDatas.slice(0, itemsLoaded).map((data) => {
          if (datas.type === "post") {
            const post = data as PostType;
            return (
              <Post
                images={post.mediaLink}
                likes={post.likesCount}
                profileLocation="Alsut"
                profileName={`${post.user.firstName} ${post.user?.surename}`}
                text={post.postText}
                key={post.id}
                id={post.id}
                isLiked={post.isLiked}
                profileURL={post.user?.profileURL || ""}
                user={user}
              />
            );
          } else if (datas.type === "group") {
            const group = data as Group;
            return <GroupDisplay group={group} />;
          } else if (datas.type === "user") {
            const profile = data as User;
            return <ProfileDisplay user={profile} />;
          }
        })
      ) : (
        <div className={css.noPostsContainer}>
          <p>No posts available.</p>
        </div>
      )}
    </div>
  );
};

export default Scrollbar;
