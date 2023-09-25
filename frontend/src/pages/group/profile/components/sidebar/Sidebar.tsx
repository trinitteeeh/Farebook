import { FiMoreHorizontal } from "react-icons/fi";
import css from "./style.module.css";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP_Member, DELETE_GROUP_MEMBER } from "../../../mutation";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  group: Group;
  userID: string;
}

const Sidebar: React.FC<SidebarProps> = ({ group, userID }) => {
  const [clicked, setClicked] = useState(false);
  const [status, setStatus] = useState("");
  const [deleteGroupMember] = useMutation(DELETE_GROUP_MEMBER);
  const [createGroupMember] = useMutation(CREATE_GROUP_Member);
  const navigate = useNavigate();

  useEffect(() => {
    const memberStatus = group.members.some((member) => member.user.id === userID && member.status === "Valid") ? "Joined" : group.members.some((member) => member.user.id === userID && member.status !== "Valid") ? "Pending" : "Join";

    setStatus(memberStatus);
  }, [group.members, userID]);

  const handleLeaveGroup = async () => {
    try {
      await deleteGroupMember({
        variables: {
          groupID: group.id,
          memberID: userID,
        },
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/group");
  };

  const handleJoinGroup = async () => {
    try {
      await createGroupMember({
        variables: {
          groupID: group.id,
          memberID: userID,
          status: "Pending",
          role: "Member",
        },
      }).then(() => {
        setStatus("Pending");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.group}>
        <div className={css.topPart}>
          <div className={css.profile}>
            <img src={group.profileURL !== "" ? group.profileURL : "/assets/facebook_group_profile.png"} alt="" />
          </div>
          <div style={{ position: "relative", flex: "1" }}>
            <h5 style={{ fontSize: "1.2rem" }}>{group.name}</h5>
            <h5 style={{ fontWeight: "400", position: "absolute", bottom: "0", left: "0" }}>{group.description}</h5>
          </div>
        </div>
        <div className={css.bottomPart}>
          <div className={`${css.status} ${status === "Pending" ? css.statusPending : ""}`} onClick={() => setClicked(!clicked)}>
            {status}
            {status === "Joined" && (
              <div className={`${css.popup} ${clicked ? css.active : ""}`} onClick={handleLeaveGroup}>
                <h4>Leave Group</h4>
              </div>
            )}
            {status !== "Joined" && (
              <div className={`${css.popup} ${clicked ? css.active : ""}`} onClick={handleJoinGroup}>
                <h4>Join Group</h4>
              </div>
            )}
          </div>

          <div className={css.moreIcon}>
            <FiMoreHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
