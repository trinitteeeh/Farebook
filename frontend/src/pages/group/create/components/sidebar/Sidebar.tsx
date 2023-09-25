import { AiOutlineClose } from "react-icons/ai";
import css from "./style.module.css";
import { FaFacebookF } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_FRIENDS } from "../../../query";
import { CREATE_GROUP, CREATE_GROUP_Member } from "../../../mutation";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupPrivacy, setGroupPrivacy] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [allFriend, setAllFriend] = useState<User[]>([]);
  const [createGroup] = useMutation(CREATE_GROUP);
  const [createGroupMember] = useMutation(CREATE_GROUP_Member);
  const navigate = useNavigate();

  const { data: allData, loading: allLoading } = useQuery(GET_ALL_FRIENDS, {
    variables: { userID: user ? user.id : "" },
    skip: !user,
  });

  useEffect(() => {
    if (!allLoading && allData) {
      setAllFriend(allData.getAllFriends);
    }
  }, [allLoading, allData]);

  if (allLoading) return <p>Loading...</p>;

  if (!allData) {
    return;
  }

  const handleFriendSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFriendIds = Array.from(e.target.selectedOptions, (option) => option.value);
    const selectedFriendsData = allFriend.filter((friend) => selectedFriendIds.includes(friend.id));

    const newSelectedFriends = selectedFriendsData.filter((friend) => !selectedFriends.find((selectedFriend) => selectedFriend.id === friend.id));

    setSelectedFriends((prevSelectedFriends) => [...prevSelectedFriends, ...newSelectedFriends]);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await createGroup({
        variables: {
          name: groupName,
          description: groupDescription,
          profileURL: "",
          privacy: groupPrivacy,
        },
      });

      console.log(data);

      await createGroupMember({
        variables: {
          groupID: data.createGroup.id,
          memberID: user.id,
          status: "Valid",
          role: "Admin",
        },
      });

      const createMemberPromises = selectedFriends.map((friend) => {
        return createGroupMember({
          variables: {
            groupID: data.createGroup.id,
            memberID: friend.id,
            status: "Pending",
            role: "Member",
          },
        });
      });

      await Promise.all(createMemberPromises);
    } catch (error) {
      console.error("Error creating group:", error);
    }
    navigate("/group");
  };

  return (
    <div className={css.container}>
      <div className={css.sidebarIconContainer}>
        <div className={css.icon} style={{ backgroundColor: "#a3a3a3", cursor: "pointer" }}>
          <AiOutlineClose />
        </div>
        <div className={css.icon} style={{ background: "linear-gradient(to bottom, #4caefe, #3d73e7)", padding: 0 }}>
          <FaFacebookF />
        </div>
      </div>
      <div className={css.sidebarHeader}>
        <h6 style={{ textAlign: "start", fontWeight: "400" }}>{`Groups > Create Group`}</h6>
        <h2 style={{ textAlign: "start" }}>Create Group</h2>
        <div className={css.profileContainer}>
          <div className={css.profile}>
            <img src={user.profileURL} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
            <h5 style={{ textAlign: "start", margin: "0" }}>{user.firstName + " " + user.surename}</h5>
            <h5 style={{ textAlign: "start", fontWeight: "400" }}>Admin</h5>
          </div>
        </div>
      </div>
      <div className={css.formContainer}>
        <form action="" className={css.formContainer}>
          <input className={css.inputText} id="name" name="name" placeholder={`Group Name`} type="text" onChange={(e) => setGroupName(e.target.value)} />
          <input className={css.inputText} id="description" name="description" placeholder={`Group Description`} type="text" onChange={(e) => setGroupDescription(e.target.value)} />
          <select className={css.inputSelect} id="privacy" name="privacy" onChange={(e) => setGroupPrivacy(e.target.value)} value={groupPrivacy}>
            <option value="" disabled style={{ color: "red" }}>
              Choose Privacy
            </option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <select className={css.inputSelect} id="friends" name="friends" onChange={handleFriendSelection} value={""}>
            <option value="" disabled style={{ color: "red" }}>
              Invite Friends (Optional)
            </option>
            {allFriend.map((friends: User) => (
              <option value={friends.id} key={friends.id}>
                {friends.firstName + " " + friends.surename}
              </option>
            ))}
          </select>
          <div className={css.selectedFriendContainer}>
            {selectedFriends.map((friend: User) => (
              <div className={css.selectedFriend} key={friend.id}>
                {friend.firstName + " " + friend.surename}
              </div>
            ))}
          </div>
        </form>
        <div className={css.actionContainer}>
          <button
            className={css.submitBtn}
            style={{ backgroundColor: groupName && groupPrivacy && groupDescription ? "#3c74e3" : "#e4e6ea", color: groupName && groupPrivacy && groupDescription ? "#ffffff" : "#bcc0c5", cursor: "pointer" }}
            onClick={handleSubmit}
          >
            create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
