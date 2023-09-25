import { FaFacebookF, FaImages } from "react-icons/fa";
import css from "./style.module.css";
import { ImTextColor } from "react-icons/im";
import { AiOutlineClose } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { useContext, useState } from "react";
import CustomSelect from "./components/FontSelect";
import BackgroundPicker from "./components/BackgroundPicker";
import DiscardDialog from "./components/DiscardDialog";
import { AuthContext } from "../../../setup/context-manager/AuthContextProvider";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../mutation";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateStories() {
  const [isModeChoosen, setIsModeChoosen] = useState(false);
  const [isTextStory, setIsTextStory] = useState(true);
  const [background, setBackgound] = useState<CssStyle | null>(null);
  const [text, setText] = useState("");
  const [selectedFont, setSelectedFont] = useState<FontType | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [load, setLoad] = useState(false);

  const [createStory] = useMutation(CREATE_STORY);

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const navigate = useNavigate();

  const handleShowCreateTextStory = () => {
    setIsModeChoosen(true);
    setIsTextStory(true);
  };

  const handleShowCreateImageStory = () => {
    setIsModeChoosen(true);
    setIsTextStory(false);
  };

  const handleCloseCreate = () => {
    setImage(null);
    setText("");
    setIsModeChoosen(false);
    setBackgound(null);
    setSelectedFont(null);
    setShowDialog(false);
  };

  const handleSubmitStory = async () => {
    try {
      const newStory = {
        userID: user?.id,
        text: text,
        fontType: selectedFont ? selectedFont.value : "Helvetica",
        pictureURL: "",
        backgroundStyle: isTextStory && background !== null ? JSON.stringify(background) : "background-color: #6449ed;",
      };
      setLoad(true);
      console.log(newStory);
      if (isTextStory) {
        await createStory({
          variables: {
            newStory: newStory,
          },
        }).then(() => {
          setLoad(false);
        });
      } else {
        const formData = new FormData();
        formData.append("file", image ? image : "");
        formData.append("upload_preset", "pdrrobxc");

        await Axios.post("https://api.cloudinary.com/v1_1/dmqhud5tb/image/upload", formData).then((response) => {
          newStory.pictureURL = response.data.secure_url;
          createStory({
            variables: {
              newStory: newStory,
            },
          }).then((response) => {
            console.log("Mutation response:", response);
            setLoad(false);
          });
        });
      }
    } catch (error) {
      console.log("errornya: " + error);
    }
    handleCloseCreate();
    navigate("/");
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
        <DiscardDialog dialogVisible={showDialog} setDialogVisible={setShowDialog} handleCloseCreate={handleCloseCreate} />
        <div className={css.sidebar}>
          <div className={css.sidebarIconContainer}>
            <div
              className={css.icon}
              style={{ backgroundColor: "#a3a3a3", cursor: "pointer" }}
              onClick={() => {
                handleCloseCreate();
                navigate("/");
              }}
            >
              <AiOutlineClose />
            </div>
            <div className={css.icon} style={{ background: "linear-gradient(to bottom, #4caefe, #3d73e7)", padding: 0 }}>
              <FaFacebookF />
            </div>
          </div>
          <div className={css.sidebarProfileContainer}>
            <div className={css.profileTopContainer}>
              <h2 className={css.profileHeader}>Your Story</h2>
              <div className={css.icon}>
                <IoSettings color="#1c1f24" />
              </div>
            </div>
            <div className={css.profileBottomContainer}>
              <div className={css.icon} style={{ width: "3.5rem", height: "3.5rem", backgroundColor: "#4caefe" }}>
                <BsPersonCircle />
              </div>
              <h3>Trinity</h3>
            </div>
          </div>
          {isModeChoosen && isTextStory && (
            <>
              <div className={css.sidebarContent}>
                <div className={css.sidebarActionContainer}>
                  <div className={css.textareaContainer}>
                    <textarea cols={30} rows={10} placeholder="Start typing" onChange={(e) => setText(e.target.value)}></textarea>
                  </div>
                  <CustomSelect selectedFont={selectedFont} setSelectedFont={setSelectedFont} />
                  <BackgroundPicker setBackgound={setBackgound} />
                </div>
              </div>
              <div className={css.sidebarSubmitContainer}>
                <button style={{ backgroundColor: "#e4e6ea", flex: 1, color: "#000000" }} onClick={() => setShowDialog(true)}>
                  Discard
                </button>
                <button style={{ backgroundColor: "#3c74e3", flex: 2, color: "#ffffff" }} onClick={handleSubmitStory}>
                  Share to story
                </button>
              </div>
            </>
          )}
          {isModeChoosen && !isTextStory && (
            <>
              <div className={css.sidebarContent}>
                <div className={css.sidebarActionContainer}>
                  {/* <div className={css.textareaContainer}>
                    <textarea cols={30} rows={10} placeholder="Start typing" onChange={(e) => setText(e.target.value)}></textarea>
                  </div> */}
                </div>
              </div>
              <div className={css.sidebarSubmitContainer}>
                <button style={{ backgroundColor: "#e4e6ea", flex: 1, color: "#000000" }} onClick={() => setShowDialog(true)}>
                  Discard
                </button>
                <button style={{ backgroundColor: "#3c74e3", flex: 2, color: "#ffffff" }} onClick={handleSubmitStory}>
                  Share to story
                </button>
              </div>
            </>
          )}
        </div>
        <div className={css.canvasContainer}>
          {!isModeChoosen && (
            <>
              <div className={`${css.createBtn} ${css.imageStoryBtn}`}>
                <div className={css.iconBtn}>
                  <label htmlFor="fileInput" className={css.iconBtn} style={{ cursor: "pointer" }}>
                    <FaImages />
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    className={css.inputHidden}
                    onChange={(e) => {
                      setImage(e.target.files ? e.target.files[0] : null);
                      handleShowCreateImageStory();
                    }}
                  />
                </div>
                <h4 className={css.iconName}>Create a photo story</h4>
              </div>
              <div className={`${css.createBtn} ${css.textStoryBtn}`}>
                {" "}
                <div className={css.iconBtn} onClick={handleShowCreateTextStory}>
                  <ImTextColor />
                </div>
                <h4 className={css.iconName}>Create a text story</h4>
              </div>
            </>
          )}
          {isModeChoosen && isTextStory && (
            <>
              <div className={css.editorContainer}>
                <h3 style={{ textAlign: "start", margin: "2vh 0" }}>Overview</h3>
                <div className={css.editor}>
                  <div style={{ ...background }} className={css.canvas}>
                    <p className={css.storyText} style={{ fontFamily: selectedFont ? selectedFont.value : "Helvetica" }}>
                      {text === "" ? "Start typing" : text}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          {isModeChoosen && !isTextStory && (
            <>
              <div className={css.editorContainer}>
                <h3 style={{ textAlign: "start", margin: "2vh 0" }}>Overview</h3>
                <div className={css.editor}>
                  <div
                    style={{
                      backgroundImage: image ? `url(${URL.createObjectURL(image)})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className={css.canvas}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateStories;
