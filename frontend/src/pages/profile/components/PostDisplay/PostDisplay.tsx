import { useEffect, useState } from "react";
import Scrollbar from "../../../home/components/Scrollbar/Scrollbar";
import css from "./style.module.css";
import { useQuery } from "@apollo/client";
import { GET_POST_BY_USER_ID } from "../../../home/query";
import PhotoDisplay from "../PhotoDisplay/PhotoDisplay";

interface PostDisplayProps {
  user: User | null;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ user }) => {
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [itemsLoaded, setItemsLoaded] = useState(3);

  // console.log("ini user");
  // console.log(user);

  const { data, loading, refetch, fetchMore } = useQuery(GET_POST_BY_USER_ID, {
    variables: { userID: user ? user.id : "" },
  });

  useEffect(() => {
    if (!loading && data) {
      setPosts(data.getPostByUserId);
    }
  }, [data, loading]);

  if (loading) {
    return <p>loading</p>;
  }
  if (!data) {
    return;
  }

  const handleRefetchData = () => {
    refetch();
  };

  const handleRefetchMore = async () => {
    await fetchMore({
      variables: { limit: 3, offset: itemsLoaded },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const existingPosts = prev?.getAllPost || [];
        return {
          getPostByUserId: [...existingPosts, ...fetchMoreResult.getAllPost],
        };
      },
    });
  };

  return (
    <div className={css.container}>
      <div className={css.leftDisplay}>
        <div className={css.infoContainer}></div>
        <div className={css.friendsContainer}>
          <PhotoDisplay user={user} isPostDisplay={true} />
        </div>
      </div>
      <div className={css.rightDisplay}>
        <Scrollbar fetchMore={handleRefetchMore} refetchData={handleRefetchData} posts={posts} itemsLoaded={itemsLoaded} setItemsLoaded={setItemsLoaded} isProfile={true} user={user} isGroup={false} />
      </div>
    </div>
  );
};

export default PostDisplay;
