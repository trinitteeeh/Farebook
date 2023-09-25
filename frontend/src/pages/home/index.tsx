import { useContext, useEffect, useState } from "react";
import NavigationBar from "../../common/NavigationBar/NavigationBar";
import { ContactSidebar } from "./components/ContactSidebar/ContactSidebar";
import MenuSidebar from "./components/MenuSidebar/MenuSidebar";
import css from "./style.module.css";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";
import Scrollbar from "./components/Scrollbar/Scrollbar";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "./query";
import LoadingPage from "../loading";

function HomePage() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [itemsLoaded, setItemsLoaded] = useState(3);

  const { data, loading, refetch, fetchMore } = useQuery(GET_ALL_POSTS, {
    variables: { currentUserID: user?.id || "", limit: 3, offset: 0 },
  });

  useEffect(() => {
    if (!loading && data) {
      setPosts(data.getAllPost);
    }
  }, [data, loading]);

  if (loading) {
    return <LoadingPage />;
  }
  if (!data) {
    return;
  }

  const handleRefetchData = () => {
    refetch();
  };

  const handleRefetchMore = async () => {
    console.log(itemsLoaded);
    await fetchMore({
      variables: { offset: itemsLoaded, limit: 3 },
      updateQuery: (prev, { fetchMoreResult }) => {
        // console.log(itemsLoaded)
        if (!fetchMoreResult) return prev;
        return {
          getAllPost: [...prev.getAllPost, ...fetchMoreResult.getAllPost],
        };
      },
    });
  };

  if (!user) {
    return;
  }

  return (
    <>
      <div className={css.container}>
        <NavigationBar />
        <MenuSidebar user={user} />
        <ContactSidebar />
        <div className={css.scrollbarContainer}>
          <Scrollbar posts={posts ? posts : null} refetchData={handleRefetchData} fetchMore={handleRefetchMore} setItemsLoaded={setItemsLoaded} itemsLoaded={itemsLoaded} isProfile={false} user={user} isGroup={false} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
