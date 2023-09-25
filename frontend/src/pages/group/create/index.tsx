import { useContext, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import css from "./style.module.css";
import { AuthContext } from "../../../setup/context-manager/AuthContextProvider";
import Preview from "./components/preview/Preview";

interface CreateGroupProps {}

const CreateGroup: React.FC<CreateGroupProps> = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [display, setDisplay] = useState(0);

  if (!user) {
    return;
  }

  return (
    <div className={css.container}>
      <Sidebar user={user} />
      <Preview display={display} setDisplay={setDisplay} name="" privacy="" />
    </div>
  );
};

export default CreateGroup;
