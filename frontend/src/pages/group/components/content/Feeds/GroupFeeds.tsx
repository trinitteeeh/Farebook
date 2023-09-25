import { useState } from "react";
import Scrollbar from "../../../../home/components/Scrollbar/Scrollbar";
import css from "./style.module.css";

interface GroupFeedsProps {
  user: User;
  groups: Group[];
  isProfile: boolean;
}

const GroupFeeds: React.FC<GroupFeedsProps> = ({ user, groups, isProfile }) => {
  const [itemsLoaded, setItemsLoaded] = useState(3);
  const handleRefetchMore = () => {};
  const handleRefetchData = () => {};

  const allPosts = groups.flatMap((group) => group.posts);

  return (
    <div className={`${css.container} ${isProfile ? css.profileContainer : ""}`}>
      <Scrollbar fetchMore={handleRefetchMore} refetchData={handleRefetchData} posts={allPosts} itemsLoaded={itemsLoaded} setItemsLoaded={setItemsLoaded} isProfile={true} user={user} isGroup={true} />
    </div>
  );
};

export default GroupFeeds;
