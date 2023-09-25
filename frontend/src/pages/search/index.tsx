import { useParams } from "react-router-dom";
import NavigationBar from "../../common/NavigationBar/NavigationBar";
import css from "./style.module.css";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";
import Sidebar from "./components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import Scrollbar from "./components/Scrollbar/Scrollbar";
import { GET_ALL_GROUP, GET_ALL_POSTS, GET_ALL_USER } from "./query";
import { useQuery } from "@apollo/client";
import LoadingPage from "../loading";

const SearchPage = () => {
  const { search } = useParams();
  const query = search?.trim() === "" ? "" : search;

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [displayState, setDisplayState] = useState(0);
  const [itemsLoaded, setItemsLoaded] = useState(10);
  const [datas, setDatas] = useState<ScrollbarData>({
    type: "",
    posts: null,
    profile: null,
    group: null,
  });
  const [posts, setPosts] = useState<PostType[] | null>();
  const [users, setUsers] = useState<User[] | null>();
  const [groups, setGroups] = useState<Group[] | null>();
  console.log("placeholder");

  const { data: userData, loading: userLoading } = useQuery(GET_ALL_USER);
  const {
    data: postData,
    loading: postLoading,
    fetchMore: postFetchMore,
  } = useQuery(GET_ALL_POSTS, {
    variables: { currentUserID: user?.id || "", limit: 3, offset: 0 },
  });
  const { data: groupData, loading: groupLoading } = useQuery(GET_ALL_GROUP, {
    variables: { userID: user?.id },
  });

  useEffect(() => {
    if (!postLoading && postData) {
      setPosts(postData.getAllPost);
    }
  }, [postData, postLoading]);

  useEffect(() => {
    if (!groupLoading && groupData) {
      setGroups(groupData.getAllGroup);
    }
  }, [groupData, groupLoading]);

  useEffect(() => {
    if (!userLoading && userData) {
      setUsers(userData.getAllUser);
    }
  }, [userData, userLoading]);

  useEffect(() => {
    if (displayState === 0) {
      const displayedPosts = posts?.filter((post) => post.postText.includes(query ? query : "")); //
      const displayedData: ScrollbarData = {
        type: "post",
        posts: displayedPosts || null,
        profile: null,
        group: null,
      };
      setDatas(displayedData);
    } else if (displayState === 1) {
      const displayedGroups = groups?.filter((group) => group.name.includes(query ? query : "")); //

      const displayedData: ScrollbarData = {
        type: "group",
        posts: null,
        profile: null,
        group: displayedGroups || null,
      };
      setDatas(displayedData);
    } else if (displayState === 2) {
      const displayedUsers = users?.filter((user) => user.firstName.includes(query ? query : "") || user?.surename.includes(query ? query : "")); //
      console.log(displayedUsers);

      const displayedData: ScrollbarData = {
        type: "user",
        posts: null,
        profile: displayedUsers || null,
        group: null,
      };
      setDatas(displayedData);
    }
  }, [displayState, groups, postData, posts, query, userData, users]);

  if (postLoading || userLoading || groupLoading) {
    return <LoadingPage />;
  }

  if (!postData || !userData || !groupData || !user) {
    return;
  }

  const handleRefetchMore = async () => {
    console.log(itemsLoaded);
    await postFetchMore({
      variables: { offset: itemsLoaded, limit: 3 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          getAllPost: [...prev.getAllPost, ...fetchMoreResult.getAllPost],
        };
      },
    });
  };

  return (
    <div className={css.container}>
      anjaii
      <NavigationBar />
      <Sidebar displayState={displayState} setDisplayState={setDisplayState} search={search ? search : ""} />
      <div className={css.scrollbarContainer}>
        <Scrollbar itemsLoaded={itemsLoaded} setItemsLoaded={setItemsLoaded} datas={datas} user={user} fetchMore={handleRefetchMore} />
      </div>
    </div>
  );
};

export default SearchPage;
