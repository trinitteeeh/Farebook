import { AiFillCloseCircle } from "react-icons/ai";
import css from "../style.module.css";

interface DiscardDialogProps {
  handleCloseCreate: () => void;
  dialogVisible: boolean;
  setDialogVisible: (dialogVisible: boolean) => void;
}

const DiscardDialog: React.FC<DiscardDialogProps> = ({ dialogVisible, setDialogVisible, handleCloseCreate }) => {
  const handleDialogClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className={`${css.dialogOverlay} ${dialogVisible ? css.active : ""}`} onClick={() => setDialogVisible(false)}>
        <div className={css.dialogContent} onClick={handleDialogClick}>
          <div className={css.closeBtn}>
            <AiFillCloseCircle className={css.closeIcon} onClick={() => setDialogVisible(false)} />
          </div>
          <div className={css.dialogTitle}>Discard Story</div>
          <div className={css.postContainer}>
            <h5 style={{ fontWeight: "400" }}>Are you sure you want to discard this story? Your story won't be saved.</h5>
          </div>
          <div className={css.actionContainer}>
            <button className={css.submitBtn} onClick={() => setDialogVisible(false)} style={{ color: "#000000" }}>
              Continue editing
            </button>
            <button className={css.submitBtn} onClick={handleCloseCreate} style={{ backgroundColor: "#3c74e3", color: "#ffffff" }}>
              Discard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscardDialog;
