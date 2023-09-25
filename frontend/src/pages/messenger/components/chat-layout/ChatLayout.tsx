import { useEffect, useRef, useState } from "react";
import css from "./style.module.css";
import { AiFillPauseCircle, AiOutlineSend } from "react-icons/ai";
import { CREATE_CHAT_DETAIL } from "../../mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CHAT_DETAIL } from "../../query";
import ChatBubble from "../chat-bubble/ChatBubble";
import { FaImage } from "react-icons/fa";
import { BsFillMicFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Axios from "axios";
import { useReactMediaRecorder } from "react-media-recorder";

interface ChatLayoutProps {
  friend: User | null;
  user: User | null;
  headerID: string;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ friend, user, headerID }) => {
  useEffect(() => {
    // Create and initialize the WebSocket connection
    const ws = new WebSocket("ws://localhost:7778/websocket");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      // Handle the received message
      console.log("Received message:", message);

      // masukin logic refetch msg lu
      await chatRefetch();
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup WebSocket on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const [messege, setMessege] = useState("");
  const [createChatDetail] = useMutation(CREATE_CHAT_DETAIL);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [picture, setPicture] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
    video: false,
    audio: true,
    blobPropertyBag: {
      type: "audio/mp3",
    },
  });

  const {
    data: chatData,
    loading: chatLoading,
    refetch: chatRefetch,
  } = useQuery(GET_ALL_CHAT_DETAIL, {
    variables: { headerID: headerID },
  });
  if (chatLoading) {
    return <p>loading</p>;
  }
  if (!chatData) {
    return;
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      console.log("scroll");
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendChat = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from actually submitting
    let mediaURL = "";

    if (picture !== null) {
      const formData = new FormData();
      console.log("masuk");
      formData.append("file", picture);
      formData.append("upload_preset", "pdrrobxc");

      console.log("sending");
      console.log(picture);

      const response = await Axios.post("https://api.cloudinary.com/v1_1/dmqhud5tb/image/upload", formData);
      mediaURL = response.data.secure_url;
    }

    createChatDetail({
      variables: {
        senderID: user?.id,
        receiverID: friend?.id,
        text: messege,
        headerID: headerID,
        mediaURL: mediaURL,
      },
    })
      .then(() => {
        chatRefetch();
        setMessege("");
        setTimeout(scrollToBottom, 100);
        setPicture(null);
      })
      .catch((error) => {
        console.error("Error creating chat header:", error);
      });
  };

  const handleSelectImage = (files: FileList | null) => {
    if (files && files.length > 0) {
      setPicture(files[0]);
    }
  };

  const handleSelectRecord = async () => {
    if (isRecording) {
      console.log("stop recording");
      stopRecording();
      console.log("ASD");
      const blob = await fetch(mediaBlobUrl).then((r) => r.blob());
      const audioFile = new File([blob], "recorded_audio.wav", { type: "audio/wav" });

      const formData = new FormData();
      formData.append("file", audioFile);
      formData.append("upload_preset", "pdrrobxc");

      console.log("sending");
      console.log(picture);

      const response = await Axios.post("https://api.cloudinary.com/v1_1/dmqhud5tb/video/upload", formData);
      const mediaURL = response.data.secure_url;

      createChatDetail({
        variables: {
          senderID: user?.id,
          receiverID: friend?.id,
          text: messege,
          headerID: headerID,
          mediaURL: mediaURL,
        },
      })
        .then(() => {
          chatRefetch();
          setMessege("");
          setTimeout(scrollToBottom, 100);
          setPicture(null);
        })
        .catch((error) => {
          console.error("Error creating chat header:", error);
        });

      // Do something with the audioFile, like uploading it
      console.log("Audio File:", audioFile);
      clearBlobUrl();
    } else {
      console.log("start recording");
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className={`${css.container} `}>
      <div className={css.profileContainer}>
        {friend === null ? (
          <>
            <h4></h4>
          </>
        ) : (
          <>
            <div className={css.profilePicture}>
              <img src={friend.profileURL ? friend.profileURL : ""} alt="" />
            </div>
            <h4>{friend?.firstName + " " + friend?.surename}</h4>
          </>
        )}
      </div>
      <div className={`${css.chatContainer} ${picture !== null ? css.containerSmall : ""}`} ref={chatContainerRef}>
        {chatData.getAllChat.map((chat: ChatDetail) => {
          if (chat.sender.id === user?.id) {
            return <ChatBubble text={chat.text} user={chat.sender} key={chat.id} currentUserID={user?.id} mediaURL={chat.mediaURL} />;
          }
          return <ChatBubble text={chat.text} user={chat.sender} key={chat.id} currentUserID={user ? user.id : ""} mediaURL={chat.mediaURL} />;
        })}
      </div>
      <div className={css.actionContainer}>
        {picture && (
          <>
            <div className={css.selectedImage}>
              <img src={picture ? URL.createObjectURL(picture) : ""} alt="" />
              <div className={css.closeImageIcom} onClick={() => setPicture(null)}>
                <GrClose style={{ cursor: "pointer" }} />
              </div>
            </div>
          </>
        )}
        <div className={css.actionBottom}>
          <form onSubmit={handleSendChat} className={css.formContainer}>
            <input className={css.postTextArea} id="message" name="message" placeholder={`Start messaging`} value={messege} onChange={(event) => setMessege(event.target.value)} />
            <div className={css.sendIcon} onClick={handleSendChat}>
              <AiOutlineSend />
            </div>
          </form>
          <div className={css.iconContainer}>
            <div className={css.icon}>
              <label htmlFor="fileInput" className={css.optionLabel}>
                <FaImage />
                <input type="file" id="fileInput" className={css.inputHidden} onChange={(e) => handleSelectImage(e.target.files)} />
              </label>
            </div>
            <div className={css.icon} onClick={handleSelectRecord}>
              {isRecording ? <AiFillPauseCircle /> : <BsFillMicFill />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
