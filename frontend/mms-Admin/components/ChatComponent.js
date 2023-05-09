import React, { useState, useRef, useEffect } from 'react'
import styles from "./componentStyles/chatcomponent.module.css";
import { CustomInput } from './formInputs/CustomInput';
import EmojiPicker from 'emoji-picker-react';
import Pusher from "pusher-js";
import Icon from './Icon';
import { authChatChannel, authChatUser, saveChat, getAllChat } from "pages/api/chat";
import moment from "moment";
import { useLogin } from '../hooks/useLogin';



function ChatComponent({receiverId,isModelChatClose}) {
  const [messages, setMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedfile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInput = useRef(null);
  const chatBoxRef = useRef(null);
  const {user} = useLogin()
  let allMessages = [];
  const today = new Date().toLocaleDateString();
    React.useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 992px)");
      setIsMobile(mediaQuery.matches);
    }, []);

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      // userAuthentication: {
      //   endpoint: authChatUser,
      // },
      // channelAuthorization: {
      //   endpoint: authChatChannel,
      // },
      cluster: 'eu'
    });
    
    const formData = new FormData();
    let channelName = '';
    if (receiverId) {
      channelName = `${receiverId}-${user?.id}`;
      if (selectedfile === null){
        const payload = { message, senderId: user?.id, channelName, recipientId:receiverId };
        for (const key in payload) {
          if (payload[key]) {
            formData.append(key, payload[key]);
          }
        }
      }
      if (selectedfile !== null){
        const payload = { message, senderId: user?.id, channelName, recipientId:receiverId, imageUrl:selectedfile };
        for (const key in payload) {
          if (payload[key]) {
            formData.append(key, payload[key]);
          }
        }
      }
      
    }
    

    useEffect(() => {
      if (!receiverId) {
        return;
      }
      Pusher.logToConsole = true;
      const channel = pusher.subscribe(channelName);
      channel.bind(channelName, (data) => {
        // allMessages.push(data?.chat);
        // setMessages(allMessages);
        console.log(data)
        setMessages((prevState) => [
          ...prevState,data?.chat,
        ]);
      });
  }, [receiverId]);
    

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileName(file?.name);
    };

    const [showPicker, setShowPicker] = useState(false);
 
    const onEmojiClick = (emoji) => {
        setMessage(prevInput => prevInput + emoji.emoji);
        setShowPicker(false);
    };

   const handleKeyDown = async (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      setMessage((prevInput) => prevInput + "\n");
    } else if (event.key === "Enter") {
        event.preventDefault();
        try{
          const response = await saveChat(receiverId, formData)
          console.log(response)
        } catch (e) {
            console.log(e)
        }
        finally {
          setMessage('')
          setSelectedFile(null)
          setFileName('')
        }
        
    }
  };

  

  useEffect(() => {
    chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.main_container}>
      <div className={styles.chatBox}>
      {isMobile ? (
        <span onClick={isModelChatClose}>
        <Icon
        icon={"/assets/images/close.svg"}
        width={"20px"}
        height={"20px"}
        />
      </span>
      ): ""}

        <div className={styles.line_div}>
            <hr className={styles.line1}/>
            <span className={styles.started}>Conversation Started, {moment(today).format("DD MMM")}</span>
            <hr className={styles.line2}/>
        </div>
        <div className={styles.chatBox_main}>
        {messages.length > 0 ? (
            messages.map((msg) => (
                <>
                <div
                  key={msg?.id}
                  className={`${styles.message} ${msg?.sender_id === user?.id ? styles.sent : ''}`}
                >
                <div>{msg?.message}</div>
                <div className={styles.time}>{moment(msg?.sent_at).format('lll')}</div>
                </div>
                </>
              ))
        ): (
            
            <>
            <div className={styles.message}>
                Start a chat with a user
            </div>  
            </>
        )}
        <div ref={chatBoxRef} />
        </div>
        <>
          <div className={styles.input_div}>
              <div className={styles.input_icon}>
                <div className={styles.input_icon1} onClick={() => setShowPicker(val => !val)}>
                  <Icon
                  icon={"/assets/images/smiley.svg"}
                  width={"20px"}
                  height={"20px"}
                  />
                </div>
                <div className={styles.input_icon2} onClick={() => fileInput.current.click()}>
                  <Icon
                  icon={"/assets/images/attachment_clip.svg"}
                  width={"20px"}
                  height={"20px"}
                  />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      ref={fileInput}
                  />
                  {fileName && <span>{fileName}</span>}
                </div>
              </div>
              <div className={styles.input}>
                  <CustomInput
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.input_chat}
                    placeholder="Type a message..."
                    onKeyDown={handleKeyDown}
                    />
              </div>
          </div>
          {showPicker &&  <EmojiPicker onEmojiClick={onEmojiClick} />}     
          </>
      </div>
    </div>
  )
}

export default ChatComponent
