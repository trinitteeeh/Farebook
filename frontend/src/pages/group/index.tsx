import { useContext, useState } from "react";
import css from "./style.module.css";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";
import Sidebar from "./components/sidebar/Sidebar";
import Recommendation from "./components/recommendation/Recommendation";
import NavigationBar from "../../common/NavigationBar/NavigationBar";
import GroupJoined from "./components/content/GroupJoined/GroupJoined";
import GroupFeeds from "./components/content/Feeds/GroupFeeds";
import { useQuery } from "@apollo/client";
import { GET_GROUP_BY_USER_ID } from "./query";
import GroupRecommendation from "./components/content/GroupRecommendation/GroupRecommendation";

interface GroupPageProps {}

const GroupPage: React.FC<GroupPageProps> = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [displayState, setDisplayState] = useState(0);

  const { data: joinedData, loading: joinedLoading } = useQuery(GET_GROUP_BY_USER_ID, {
    variables: { userID: user ? user.id : "" },
    skip: !user,
  });

  if (!user) {
    return;
  }

  if (joinedLoading) {
    return <p>Loading</p>;
  }

  if (!joinedData) return;

  return (
    <div className={css.container}>
      <NavigationBar />
      <Sidebar groups={joinedData.getGroupsByUserID} displayState={displayState} setDisplayState={setDisplayState} />
      {displayState === 0 && (
        <>
          <GroupFeeds user={user} groups={joinedData.getGroupsByUserID} isProfile={false} />
          <Recommendation />
        </>
      )}
      {displayState === 1 && <GroupRecommendation userID={user.id} setDisplayState={setDisplayState} />}
      {displayState === 2 && <GroupJoined userID={user.id} setDisplayState={setDisplayState} />}
    </div>
  );
};

export default GroupPage;
