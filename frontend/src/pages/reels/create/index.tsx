import { useContext, useState } from "react";
import ReelsSidebar from "./components/Sidebar";
import css from "./style.module.css";
import Reels from "./components/Reels";
import { AuthContext } from "../../../setup/context-manager/AuthContextProvider";
import { useMutation } from "@apollo/client";
import { CREATE_REEL } from "../mutation";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateReels = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const navigate = useNavigate();
  const [video, setVideo] = useState<File | null>(null);
  const [load, setLoad] = useState(false);

  const [createReel] = useMutation(CREATE_REEL);

  const handleCreateReel = async (text: string) => {
    try {
      setLoad(true);

      const newReel = {
        userID: user?.id,
        text: text,
        mediaURL: "",
      };

      const formData = new FormData();
      formData.append("file", video || ""); 
      
      formData.append("upload_preset", "pdrrobxc");

      const response = await Axios.post("https://api.cloudinary.com/v1_1/dmqhud5tb/video/upload", formData);

      if (response.status === 200) {
        newReel.mediaURL = response.data.secure_url;
        const mutationResponse = await createReel({
          variables: {
            newReel: newReel,
          },
        });
        console.log("Mutation response:", mutationResponse);
      } else {
        console.log("Cloudinary upload failed with status:", response.status);
      }
    } catch (error) {
      console.log("Error uploading or creating reel:", error);
    } finally {
      setLoad(false);
      navigate("/");
    }
  };

  return (
    <>
      <div className={css.container}>
        {load && (
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <img src="/assets/load.gif" width={"75px"} height={"75px"} alt="loading"></img>
          </div>
        )}
        <ReelsSidebar setVideo={setVideo} video={video} handleCreateReel={handleCreateReel} />
        <div className={css.canvasContainer}>
          <div className={css.editorContainer}>
            <h3 style={{ textAlign: "start", margin: "2vh 0" }}>Overview</h3>
            <div className={css.editor} style={{ backgroundColor: video ? "#000000" : "#f0f2f6" }}>
              <Reels video={video} setVideo={setVideo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReels;
