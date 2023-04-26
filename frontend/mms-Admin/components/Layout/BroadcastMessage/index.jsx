import Broadcast from "../../Messages/Broadcast";
import { useState, useRef, useCallback, useEffect } from "react";
import BroadcastHeader from "components/NavHeader/BroadcastHeader";
import { Mentions } from "antd";
import BroadcastTextArea from "components/formInputs/BroadcastTextArea";
import styles from "../../componentStyles/broadcast.module.css";
import { broadcastService } from "../../../services/broadcast.service";

// TODO: integrate with backend

const BroadcastMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userToken, setUserToken] = useState();
  const ref = useRef();
  const headers = {
    "User-Agent": "request",
  };
  const loadUsers = (key) => {
    if (!key) {
      setUsers([]);
      return;
    }
    fetch(`https://api.github.com/search/users?q=${key}`, { headers })
      .then((res) => res.json())
      .then(({ items = [] }) => {
        if (ref.current !== key) return;

        setLoading(false);
        console.log(items);
        setUsers(items.slice(0, 10));
      });
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userObject = JSON.parse(user);
    setUserToken(userObject.token);

    loadMessages();
  });

  const loadMessages = () =>
    broadcastService.sent(userToken).then((res) => setMessages(res), []);

  const loadUser = useCallback(loadUsers, []);

  const onSearch = (search) => {
    console.log("Search:", search);
    ref.current = search;
    setLoading(!!search);
    setUsers([]);

    loadUser(search);
  };

  const handleSubmit = (text) => {
    const dateInit = new Date();
    const time = dateInit.toLocaleTimeString().replace(/:\d+ /, "");
    const date = dateInit.toISOString().split("T")[0];
    const sender = "John Doe";
    const id = messages[messages.length - 1] + 1 || 1;
    const message = { id, date, time, message: text, sender };
    setMessages([...messages, message]);
    //TODO: upload files and message text
  };
  return (
    <>
      <div>
        <div className={styles.broadcast_panel}>
          <BroadcastHeader />
          <Mentions loading={loading} users={users} onSearch={onSearch} />
          <div className={styles.broadcast_board}>
            {messages.map((message) => (
              <Broadcast
                key={message.id}
                message={message.message}
                sender={message.sender}
                time={message.time}
                date={message.date}
              />
            ))}
          </div>
          <BroadcastTextArea handleSubmit={handleSubmit} />
          {userToken}
        </div>
      </div>
    </>
  );
};

export default BroadcastMessage;
