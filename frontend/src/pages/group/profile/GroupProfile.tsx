import { useParams } from "react-router-dom";
import css from "./style.module.css";
import { GET_GROUP_BY_ID } from "../query";
import { useQuery } from "@apollo/client";
import Sidebar from "./components/sidebar/Sidebar";
import NavigationBar from "../../../common/NavigationBar/NavigationBar";
import { useContext, useState } from "react";
import { AuthContext } from "../../../setup/context-manager/AuthContextProvider";
import Header from "./components/header/Header";
import PostDisplay from "./components/post_display/PostDisplay";
import InviteFriendDialog from "./components/invite/InvitePopup";

interface GroupProfile {}

const GroupProfile: React.FC<GroupProfile> = () => {
  const { id } = useParams<{ id: string }>();
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [display, setDisplay] = useState(0);
  const [inviteFriendDialog, setInviteFriendDialog] = useState(false);

  const { data: allData, loading: allLoading } = useQuery(GET_GROUP_BY_ID, {
    variables: { id: id, userID: user?.id },
  });

  if (allLoading) {
    return <p>Loading</p>;
  }

  if (!allData) return;
  if (!user) return;

  return (
    <div className={css.container}>
      <NavigationBar />
      <Sidebar group={allData.getGroupByID} userID={user.id} />
      <div className={css.content}>
        <Header profileURL={allData.getGroupByID.profileURL} name={allData.getGroupByID.name} setDisplay={setDisplay} display={display} openInviteFriendDialog={setInviteFriendDialog} />
        <InviteFriendDialog userID={user.id} dialogVisible={inviteFriendDialog} onClose={setInviteFriendDialog} groupID={allData.getGroupByID.id} />
        {display === 0 && <PostDisplay user={user} group={allData.getGroupByID} />}
      </div>
    </div>
  );
};

export default GroupProfile;
