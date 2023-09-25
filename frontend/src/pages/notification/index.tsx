import { useContext } from "react";
import NavigationBar from "../../common/NavigationBar/NavigationBar";
import css from "./style.module.css";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";
import { useQuery } from "@apollo/client";
import { GET_ALL_NOTIFICATION } from "./query";
import LoadingPage from "../loading";
import NotificationDisplay from "./components/Notification";

interface NotificationPageProps {}

const NotificationPage: React.FC<NotificationPageProps> = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { data: notificationData, loading: notificationLoading } = useQuery(GET_ALL_NOTIFICATION, {
    variables: { userID: user?.id },
  });

  if (notificationLoading) {
    return <LoadingPage />;
  }

  if (!user || !notificationData) {
    return;
  }

  return (
    <div className={css.container}>
      <NavigationBar />
      <div className={css.displayContainer}>
        <h4>Notification</h4>
        <div className={css.notificationContainer}>
          {notificationData.getAllNotification.map((notification: Notification) => (
            <NotificationDisplay notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
