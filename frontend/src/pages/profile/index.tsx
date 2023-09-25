import { useContext, useEffect, useState } from "react";
import NavigationBar from "../../common/NavigationBar/NavigationBar";
import OptionMenuContainer from "./components/optionMenu/OptionMenuContainer";
import Profile from "./components/profile/Profile";
import css from "./style.module.css";
import PostDisplay from "./components/PostDisplay/PostDisplay";
import PhotoDisplay from "./components/PhotoDisplay/PhotoDisplay";
import VideoDisplay from "./components/VideoDisplay/VideoDisplay";
import FriendDisplay from "./components/FriendDisplay/FriendDisplay";
import { GET_ALL_FRIENDS } from "../stories/query";
import { useQuery } from "@apollo/client";
import SuggestionDisplay from "./components/SugesstionDisplay/SuggestionDisplay";
import { useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "./query";
import LoadingPage from "../loading";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [displayState, setDisplayState] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [friends, setFriends] = useState<User[] | null>(null);
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery(GET_ALL_FRIENDS, {
    variables: { userID: id },
  });

  const { data: userData, loading: userLoading } = useQuery(GET_USER_BY_ID, {
    variables: { id: id },
  });

  useEffect(() => {
    if (!loading && data) {
      setFriends(data.getAllFriends);
    }
  }, [data, loading]);

  useEffect(() => {
    if (!userLoading && userData) {
      setCurrentUser(userData.getUserByID);
    }
    if (user?.id === currentUser?.id) {
      setIsCurrentUser(true);
    }
  }, [currentUser?.id, user?.id, userData, userLoading]);

  if (loading || userLoading) {
    return <LoadingPage />;
  }
  if (!data || !userData || !user) {
    return;
  }

  return (
    <div className={css.container}>
      <NavigationBar />
      <div className={css.profileHeader}>
        <div className={css.imageBackground}>
          <img src="https://res.cloudinary.com/dmqhud5tb/image/upload/v1691634486/samples/balloons.jpg" alt="" />
        </div>
        <div className={css.profileDescriptionContainer}>
          <Profile
            user={currentUser}
            friendsPicture={friends ? friends.map((friend) => (friend.profileURL ? friend.profileURL : "")) : []}
            setShowSuggesstion={setShowSuggestion}
            showSuggesstion={showSuggestion}
            currentUser={user}
            isCurrentUser={isCurrentUser}
            isFriend={true}
          />
          {showSuggestion && <SuggestionDisplay userID={id ? id : ""} />}
        </div>
        <OptionMenuContainer setDisplayState={setDisplayState} displayState={displayState} />
      </div>
      <div className={css.contentContainer}>
        {displayState === 0 && <PostDisplay user={currentUser} />}
        {displayState === 2 && <FriendDisplay friends={friends} />}
        {displayState === 3 && <PhotoDisplay user={currentUser} isPostDisplay={false} />}
        {displayState === 4 && <VideoDisplay user={currentUser} />}
      </div>
    </div>
  );
};

export default ProfilePage;
