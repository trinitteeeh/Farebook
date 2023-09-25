import css from "./style.module.css";

interface NotificatoinProps {
  notification: Notification;
}

const NotificationDisplay: React.FC<NotificatoinProps> = ({ notification }) => {
  return (
    <div className={css.container}>
      <div className={css.profilePicture}>
        <img src={notification.profile.profileURL !== "" ? notification.profile.profileURL : "/assets/blank-profile.png"} alt="" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "0.3rem", justifyContent: "center" }}>
        <div className={css.profileDescription}>
          <h6>{notification.profile.firstName + " " + notification.profile.surename} </h6>
          <h6 style={{ fontWeight: "400" }}>{notification.text}</h6>
        </div>
        <h6 style={{ color: " #4077f2" }}>{notification.createdAt}</h6>
      </div>
    </div>
  );
};

export default NotificationDisplay;
