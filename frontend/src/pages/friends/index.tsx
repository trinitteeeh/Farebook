import NavigationBar from "../../common/NavigationBar/NavigationBar";
import css from "./style.module.css";
import FriendsSidebar from "./components/FriendsSidebar";
import DisplayLayout from "./components/DisplayLayout";
import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";
import { GET_ALL_FRIENDS, GET_ALL_FRIEND_REQUEST, GET_ALL_FRIEND_SUGGESTIONS } from "./query";
import { CONFIRM_FRIENDSHIP, CREATE_FRIENDSHIP, DELETE_FRIENDSHIP } from "./mutation";
import { useNavigate } from "react-router-dom";

const FriendsPage = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [request, setRequest] = useState<[User] | null>(null);
  const [suggest, setSuggest] = useState<[User] | null>(null);
  const [all, setAll] = useState<[User] | null>(null);
  const [displayState, setDisplayState] = useState(0);

  const [confirmFriendship] = useMutation(CONFIRM_FRIENDSHIP);
  const [deleteFriendship] = useMutation(DELETE_FRIENDSHIP);
  const [createFriendship] = useMutation(CREATE_FRIENDSHIP);
  const [friendID, setFriendID] = useState("");
  const navigate = useNavigate();

  const {
    data: requestData,
    loading: requestLoading,
    refetch: requestRefetch,
  } = useQuery(GET_ALL_FRIEND_REQUEST, {
    variables: { userID: user ? user.id : "" },
    skip: !user,
  });

  const {
    data: suggestData,
    loading: suggestLoading,
    refetch: suggestRefetch,
  } = useQuery(GET_ALL_FRIEND_SUGGESTIONS, {
    variables: { userID: user ? user.id : "" },
    skip: !user,
  });

  const {
    data: allData,
    loading: allLoading,
    refetch: allRefetch,
  } = useQuery(GET_ALL_FRIENDS, {
    variables: { userID: user ? user.id : "" },
    skip: !user,
  });

  useEffect(() => {
    if (requestData && requestData.getAllFriendRequests) {
      setRequest(requestData.getAllFriendRequests);
    }
  }, [requestData]);

  useEffect(() => {
    if (suggestData && suggestData.getAllFriendSuggestions) {
      setSuggest(suggestData.getAllFriendSuggestions);
    }
  }, [suggestData]);

  useEffect(() => {
    if (allData && allData.getAllFriends) {
      setAll(allData.getAllFriends);
    }
  }, [allData]);

  if (requestLoading || suggestLoading || allLoading) {
    return <div>Loading</div>;
  }
  if (!requestData || !suggestData || !allData) return null;
  if (!user) {
    return;
  }

  const handleConfirmFriendRequest = async () => {
    console.log("confirm");
    try {
      console.log("user id " + user?.id);
      console.log("friend id " + friendID);
      await confirmFriendship({
        variables: {
          userID: user ? user.id : "",
          friendID: friendID,
        },
      }).then((response) => {
        console.log("Mutation response:", response);
        requestRefetch();
        allRefetch();
        suggestRefetch();
        setFriendID("");
      });
    } catch (error) {
      console.log("errornya: " + error);
    }
  };

  const handleDeleteFriendRequest = async () => {
    console.log("delete");
    console.log("user id " + user?.id);
    console.log("friend id " + friendID);
    try {
      await deleteFriendship({
        variables: {
          userID: user ? user.id : "",
          friendID: friendID,
        },
      }).then((response) => {
        console.log("Mutation response:", response);
        requestRefetch();
        setFriendID("");
      });
    } catch (error) {
      console.log("errornya: " + error);
    }
  };

  const handleCreateFriendRequest = async () => {
    try {
      await createFriendship({
        variables: {
          userID: user ? user.id : "",
          friendID: friendID,
        },
      }).then((response) => {
        console.log("Mutation response:", response);
        requestRefetch();
        setFriendID("");
      });
    } catch (error) {
      console.log("errornya: " + error);
    }
  };

  const handleDeleteFriendSugesstion = async () => {};

  const handleDeleteFriendship = async () => {
    console.log("delete");
    console.log("user id " + user?.id);
    console.log("friend id " + friendID);
    try {
      await deleteFriendship({
        variables: {
          userID: user ? user.id : "",
          friendID: friendID,
        },
      }).then((response) => {
        console.log("Mutation response:", response);
        allRefetch();
        suggestRefetch();
        setFriendID("");
      });
    } catch (error) {
      console.log("errornya: " + error);
    }
  };

  const handleRedirectProfile = () => {
    navigate("/profile/" + friendID);
  };

  return (
    <>
      <div className={css.container}>
        <NavigationBar />
        <FriendsSidebar setDisplayState={setDisplayState} />
        <div className={css.content}>
          {(displayState === 0 || displayState === 3) && (
            <DisplayLayout
              datas={all}
              text="All Friends"
              primaryButtonProps={{ text: "Profile", color: "#4077f2", backgroundColor: "#e6f4ff", onClick: handleRedirectProfile }}
              secondaryButtonProps={{ text: "Remove", color: "#ffffff", backgroundColor: "#3c74e3", onClick: handleDeleteFriendship }}
              key={"all"}
              setFriendID={setFriendID}
            />
          )}
          {(displayState === 0 || displayState === 1) && (
            <DisplayLayout
              datas={request}
              text="Friend Request"
              primaryButtonProps={{ text: "Confirm", onClick: handleConfirmFriendRequest, color: "#ffffff", backgroundColor: "#3c74e3" }}
              secondaryButtonProps={{ text: "Delete", onClick: handleDeleteFriendRequest, color: "#030303", backgroundColor: "#e4e6ea" }}
              key={"request"}
              setFriendID={setFriendID}
            />
          )}
          {(displayState === 0 || displayState === 2) && (
            <DisplayLayout
              datas={suggest}
              text="People You May Know"
              primaryButtonProps={{ text: "Add Friend", onClick: handleCreateFriendRequest, color: "#4077f2", backgroundColor: "#e6f4ff" }}
              secondaryButtonProps={{ text: "Remove", onClick: handleDeleteFriendSugesstion, color: "#030303", backgroundColor: "#e4e6ea" }}
              key={"suggest"}
              setFriendID={setFriendID}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
