import { useState } from "react";
import css from "../style.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface ReelsSidebarProps {
  setVideo: (video: File | null) => void;
  video: File | null;
  handleCreateReel: (text: string) => void;
}

const ReelsSidebar: React.FC<ReelsSidebarProps> = ({ setVideo, video, handleCreateReel }) => {
  const [step, setStep] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type.startsWith("video/")) {
        const selectedVideo = document.createElement("video");
        selectedVideo.preload = "metadata";
        selectedVideo.src = URL.createObjectURL(selectedFile);

        selectedVideo.onloadedmetadata = () => {
          if (selectedVideo.duration <= 60) {
            setVideo(selectedFile);
          } else {
            setError("Duration max 60 seconds");
            setTimeout(() => {
              setError("");
            }, 3000);
          }

          URL.revokeObjectURL(selectedVideo.src);
        };
      } else {
        console.log("Invalid file type. Please select a video file.");
      }
    }
  };

  const handleSubmit = () => {
    if (step == 0) {
      setStep(1);
    } else if (step == 1 && description !== "") {
      handleCreateReel(description);
    }
  };

  return (
    <>
      <div className={css.sidebarContainer}>
        <div className={css.sidebarIconContainer}>
          <div className={css.icon} style={{ backgroundColor: "#a3a3a3", cursor: "pointer" }} onClick={() => navigate("/")}>
            <AiOutlineClose />
          </div>
          <div className={css.icon} style={{ background: "linear-gradient(to bottom, #4caefe, #3d73e7)", padding: 0 }}>
            <FaFacebookF />
          </div>
        </div>
        <div className={css.profileTopContainer}>
          <h5 style={{ textAlign: "start", fontWeight: 400 }}>Create a reel</h5>
          <h2 style={{ textAlign: "start" }}>{step === 0 ? "Upload video" : "Add detail"}</h2>
        </div>
        {step === 0 ? (
          <div className={css.addVideoContainer}>
            <div className={css.iconBtn}>
              <label htmlFor="fileInput" className={css.iconBtn} style={{ cursor: "pointer" }}>
                <RiVideoAddFill />
              </label>
              <input type="file" id="fileInput" className={css.inputHidden} onChange={handleFileChange} />
            </div>
            <h3 style={{ margin: 0 }}>Replace Video</h3>
            <h4 style={{ margin: 0, fontWeight: 400 }}>or drag and drop</h4>
          </div>
        ) : (
          <div className={css.addDescriptionContainer}>
            <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Describe your reels"></textarea>
          </div>
        )}

        <div className={css.actionContainer}>
          {error !== "" && (
            <div className={css.error}>
              <h4>{error}</h4>
            </div>
          )}
          <div className={css.progressBar}>
            <div className={`${css.progress} ${css.progressActive}`} />
            <div className={`${css.progress} ${step === 1 ? css.progressActive : ""}`} />
          </div>
          <button
            className={css.submitBtn}
            style={{
              backgroundColor: step === 0 ? (video ? "#3c74e3" : "#e4e6ea") : description ? "#3c74e3" : "#e4e6ea",
              color: step === 0 ? (video ? "#ffffff" : "#bcc0c5") : description ? "#ffffff" : "#bcc0c5",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            {step === 0 ? "Next" : "Publish"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReelsSidebar;
