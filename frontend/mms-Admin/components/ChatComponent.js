import React, { useState, useRef, useEffect } from 'react'
import styles from "./componentStyles/chatcomponent.module.css";
import { CustomInput } from './formInputs/CustomInput';
import EmojiPicker from 'emoji-picker-react';
import Pusher from "pusher-js";
import Icon from './Icon';
import { authChatChannel, authChatUser, saveChat, getAllChat } from "pages/api/chat";
import moment from "moment";


function ChatComponent({receiverId,isModelChatClose}) {
  const [messages, setMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState(Number(''))
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

    const channelName = `${receiverId}-${senderId}`;
    useEffect(() => {
      const sender = localStorage.getItem('userid');
      setSenderId(sender)
      Pusher.logToConsole = true;
      const channel = pusher.subscribe(channelName);
      channel.bind('message', function (data) {
          allMessages.push(data);
          setMessages(allMessages);
      });
  }, [receiverId]);

    const [selectedfile, setSelectedFile] = useState(null);
    const fileInput = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setMessage(file.name);
    };

    const [showPicker, setShowPicker] = useState(false);
 
    const onEmojiClick = (emoji) => {
        setMessage(prevInput => prevInput + emoji.emoji);
        setShowPicker(false);
    };

   const handleKeyDown = async (event) => {
    const payload = { message , receiverId, senderId, channelName }
    if (event.key === "Enter" && event.shiftKey) {
      setMessage((prevInput) => prevInput + "\n");
    } else if (event.key === "Enter") {
        event.preventDefault();
        try{
          console.log("Hello")
          const response = await saveChat(receiverId, payload)
          console.log(response)
          setMessage('')
        } catch (e) {
            console.log(e)
        }
        
    }
  };

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
        {messages.length > 0 ? (
            messages.map((message) => (
                <>
                <div
                  key={message.id}
                  className={`${styles.message} ${message.sent ? styles.sent : ''}`}
                >
                {message.message}
                </div>
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
                          selectedfile={selectedfile}
                          />
                    </div>
                  </div>
                  {showPicker &&  <EmojiPicker onEmojiClick={onEmojiClick} />}
                </>
              ))
        ): (
            
            <>
            <div className={styles.message}>
                Start a chat
            </div>
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
                     selectedfile={selectedfile}
                     />
               </div>
            </div>
            {showPicker &&  <EmojiPicker onEmojiClick={onEmojiClick} />}     
            </>
        )}
      </div>
    </div>
  )
}

export default ChatComponent