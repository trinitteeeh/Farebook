import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_FRIENDS } from "../../../query";
import LoadingPage from "../../../../loading";
import { CREATE_GROUP_Member } from "../../../mutation";

interface InviteFriendDialogProps {
  onClose: (state: boolean) => void;
  dialogVisible: boolean;
  userID: string;
  groupID: string;
}

const InviteFriendDialog: React.FC<InviteFriendDialogProps> = ({ onClose, dialogVisible, userID, groupID }) => {
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [friends, setFriends] = useState<[User] | null>(null);
  const { data, loading } = useQuery(GET_ALL_FRIENDS, {
    variables: { userID: userID },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [createGroupMember] = useMutation(CREATE_GROUP_Member);

  useEffect(() => {
    if (data && data.getAllFriends) {
      setFriends(data.getAllFriends);
    }
  }, [data]);

  const handleDialogClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const toggleFriendSelection = (friend: User) => {
    if (selectedFriends.some((selectedFriend) => selectedFriend.id === friend.id)) {
      setSelectedFriends(selectedFriends.filter((selectedFriend) => selectedFriend.id !== friend.id));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const handleSubmit = async () => {
    onClose(false);
    setIsLoading(true);

    try {
      const createPromises = selectedFriends.map((friend) => {
        return createGroupMember({
          variables: {
            groupID: groupID,
            memberID: friend.id,
            status: "Pending",
            role: "Member",
          },
        });
      });

      await Promise.all(createPromises);

      setIsLoading(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (loading || isLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return;
  }

  return (
    <div className={`${css.dialogOverlay} ${dialogVisible ? css.active : ""}`} onClick={() => onClose(false)}>
      <div className={css.dialogContent} onClick={handleDialogClick}>
        <div className={css.closeBtn}>
          <AiFillCloseCircle className={css.closeIcon} onClick={() => onClose(false)} />
        </div>
        <div className={css.dialogTitle}>Invite Friend</div>
        <div className={css.postContainer}>
          {friends?.map((friend: User) => (
            <div key={friend.id} className={css.friend}>
              <div className={css.profile}>
                <img src={friend.profileURL !== "" ? friend.profileURL : "/assets/blank-profile.png"} alt="" />
              </div>
              <h4>{friend.firstName + " " + friend.surename}</h4>
              <label style={{ marginLeft: "auto" }}>
                <input type="checkbox" checked={selectedFriends.some((selectedFriend) => selectedFriend.id === friend.id)} onChange={() => toggleFriendSelection(friend)} />
              </label>
            </div>
          ))}
        </div>

        <div className={css.actionContainer}>
          {selectedFriends.length > 0 ? (
            <button className={css.submitBtn} onClick={handleSubmit}>
              Invite
            </button>
          ) : (
            <button className={css.submitBtn} style={{ backgroundColor: "#e4e6ea", color: "#bcc0c5" }}>
              Invite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteFriendDialog;
