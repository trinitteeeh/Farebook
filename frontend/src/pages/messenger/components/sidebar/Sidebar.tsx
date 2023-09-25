import { MdCreate } from "react-icons/md";
import css from "./style.module.css";
import { useEffect, useState } from "react";
import { GET_ALL_CHAT_HEADERS, GET_ALL_FRIENDS } from "../../query";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CHAT_HEADER } from "../../mutation";

interface SidebarProps {
  id: string;
  selectedFriend: User | null;
  setSelectedFriend: (friend: User) => void;
  setChatHeader: (chatheader: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ id, selectedFriend, setSelectedFriend, setChatHeader }) => {
  const [friends, setFriends] = useState<User[] | null>(null);
  const [showFriendPopup, setShowFriendPopup] = useState(false);
  const [createChatHeader] = useMutation(CREATE_CHAT_HEADER);

  const { data: friendsData, loading: friendsLoading } = useQuery(GET_ALL_FRIENDS, {
    variables: { userID: id },
  });

  const {
    data: headerData,
    loading: headerLoading,
    refetch,
  } = useQuery(GET_ALL_CHAT_HEADERS, {
    variables: { userID: id },
  });

  useEffect(() => {
    if (!friendsLoading && friendsData) {
      setFriends(friendsData.getAllFriends);
    }
  }, [friendsData, friendsLoading]);

  if (friendsLoading || headerLoading) {
    return <p>loading</p>;
  }
  if (!friendsData) {
    return;
  }

  const handleSelectFriend = (friend: User) => {
    setSelectedFriend(friend);
    if (!headerData.getAllChatHeaders.find((header: ChatHeader) => selectedFriend?.id === header.user1?.id || selectedFriend?.id === header.user2?.id)) {
      const newChatHeader = {
        userId1: id,
        userId2: friend.id,
      };

      console.log(newChatHeader);

      createChatHeader({
        variables: {
          newChatHeader: newChatHeader,
        },
      })
        .then((response) => {
          refetch(); // Assuming refetch is from Apollo useQuery
          setChatHeader(response.data.createChatHeader.id);
        })
        .catch((error) => {
          console.error("Error creating chat header:", error);
        });
    }
    console.log("selected friend");
    console.log(selectedFriend);
  };

  return (
    <div className={css.container}>
      <div className={css.descriptionContainer}>
        <div className={css.topPart}>
          <p style={{ margin: "0", fontSize: "1.8rem", fontWeight: "500" }}>Chats</p>
          <div className={css.icon} onClick={() => setShowFriendPopup(!showFriendPopup)}>
            <MdCreate />
            <div className={`${css.friendPopup} ${showFriendPopup ? css.popupActive : ""}`}>
              <h3 style={{ textAlign: "start" }}>Friends</h3>
              {friends?.map((friend) => (
                <div className={css.friendCard} onClick={() => handleSelectFriend(friend)} key={friend.id}>
                  <div className={css.profilePicture}>
                    <img src={friend.profileURL} alt="" />
                  </div>
                  <h5 style={{ textAlign: "justify" }}>{friend.firstName + " " + friend.surename}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={css.searchbar}></div>
      </div>
      <div className={css.content}>
        {headerData.getAllChatHeaders.map((header: ChatHeader) => {
          const friend:User = header.user1.id === id ? header.user2 : header.user1;

          return (
            <div
              className={`${css.friend} ${selectedFriend?.id === friend.id ? css.selectedFriend : ""}`}
              onClick={() => {
                setSelectedFriend(friend);
                setChatHeader(header.id);
              }}
              key={friend.id}
            >
              <div className={css.friendPicture}>
                <img src={friend.profileURL} alt="" />
              </div>
              <h4 style={{ textAlign: "justify" }}>{friend.firstName + " " + friend.surename}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
