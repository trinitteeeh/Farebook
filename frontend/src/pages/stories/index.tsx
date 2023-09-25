// StoryPage.tsx
import { useContext, useState, useEffect } from "react";
import css from "./style.module.css";
import Sidebar from "./components/Sidebar";
import StoryCarousel from "./components/StoryCarousel";
import { GET_ALL_FRIENDS } from "./query";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";

function StoryPage() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [friends, setFriends] = useState<User[]>([]);

  const { data, loading } = useQuery(GET_ALL_FRIENDS, {
    variables: { userID: user ? user.id : "" },
    skip: !user,
  });

  useEffect(() => {
    if (!loading && data) {
      const allFriends = [user, ...data.getAllFriends];
      setFriends(allFriends);
    }
  }, [loading, data, user]);

  if (loading) {
    return <div>Loading</div>;
  }
  if (!data) return null;

  return (
    <div className={css.container}>
      <Sidebar />
      <StoryCarousel
        key={friends[currentIndex]?.id}
        userID={friends[currentIndex]?.id}
        setCurrentUserIndex={setCurrentIndex}
        userIndex={currentIndex}
        userCount={friends.length}
        username={friends[currentIndex]?.firstName + " " + friends[currentIndex]?.surename}
        profileURL={friends[currentIndex]?.profileURL || ""}
      />
    </div>
  );
}

export default StoryPage;
