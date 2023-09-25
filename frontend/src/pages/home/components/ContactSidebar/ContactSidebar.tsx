import { BsCameraReelsFill, BsSearch } from "react-icons/bs";
import css from "./style.module.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../setup/context-manager/AuthContextProvider";
import { useQuery } from "@apollo/client";
import { GET_ALL_FRIENDS } from "../../../stories/query";
import ProfilePicture from "../MenuItem/ProfilePicture";

export function ContactSidebar() {
  const authContext = useContext(AuthContext);
  const [all, setAll] = useState<[User] | null>(null);

  const { user } = authContext;

  const { data: allData } = useQuery(GET_ALL_FRIENDS, {
    variables: { userID: user ? user.id : "" },
    skip: !user,
  });

  useEffect(() => {
    if (allData && allData.getAllFriends) {
      setAll(allData.getAllFriends);
    }
  }, [allData]);

  if (!allData) return null;

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h5>Contacts</h5>
          <div className={css.headerIconContainer}>
            <BsCameraReelsFill />
            <BsSearch />
            <FiMoreHorizontal />
          </div>
        </div>
        {all?.map((contact) => (
          <ProfilePicture text={contact.firstName + " " + contact.surename} pictureURL={contact.profileURL ? contact.profileURL : ""} key={contact.id} id={contact.id} />
        ))}
      </div>
    </>
  );
}
