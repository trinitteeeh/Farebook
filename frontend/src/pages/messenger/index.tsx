import { useContext, useState } from "react";
import ChatLayout from "./components/chat-layout/ChatLayout";
import Sidebar from "./components/sidebar/Sidebar";
import css from "./style.module.css";
import NavigationBar from "../../common/NavigationBar/NavigationBar";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";

interface MessengerPageProps {}

const MessengerPage: React.FC<MessengerPageProps> = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
  const [chatHeader, setChatHeader] = useState("");

  if (!user) return;

  return (
    <div className={css.container}>
      <NavigationBar />
      <Sidebar id={user?.id} setSelectedFriend={setSelectedFriend} selectedFriend={selectedFriend} setChatHeader={setChatHeader} />
      <ChatLayout friend={selectedFriend} headerID={chatHeader} user={user} />
    </div>
  );
};

export default MessengerPage;
