import React, { useState, useEffect, useRef } from 'react'
import ChatComponent from '../components/ChatComponent';
import styles from "../styles/messages.module.css";
import { Avatar } from "antd";
import { fetchUsers } from "./api/user"
import Icon from "../components/Icon";
import NotificationIcon from '../components/NotificationIcon';
import SocketProvider from 'Context/socket';

function Messages() {
  
  const [selectedUser, setSelectedUser] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [items, setItems] = useState([]);
  const containerRef = useRef(null);

  const loadMore = async () => {
    const query = { page, limit }
    try {
      const { data } = await fetchUsers(convertToURLQuery(query))
      console.log(data)
      const newItems = data?.data;
      setItems(newItems);
      setPage(page + 1);
    } catch (error) {}
  };
  
  
  useEffect(() => {
    loadMore()
  }, [])

  const handleScroll = () => {
    const element = containerRef.current;
    if (!element) return;
    const { scrollTop, scrollHeight, clientHeight } = element;
    if (scrollTop + clientHeight >= scrollHeight) {
      loadMore();
      setPage(currentPage += 1);
    } else if (scrollTop === 0 && page > 1) {
      setPage(page -= 1);
    }
  };
  
  useEffect(() => {
    const element = containerRef.current;
    if (element) element.addEventListener('scroll', handleScroll);
    return () => {
      if (element) element.removeEventListener('scroll', handleScroll);
    };

  }, []);
  const [isMobile, setIsMobile] = useState(false);
  
  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    if (window.innerWidth <= 992) {
        setIsMobile(true);
    }
  };
  
  const handleUserClose = () => {
    setIsMobile(false)
  };

  return (
    <div className={styles.main_div}>
        {!isMobile && (
            <div className={styles.side_div} ref={containerRef}>
                {items.length > 0 ? (
                  items.map(user => (
                        <div className={styles.side_div_sub} key={user.id} onClick={() => handleUserClick(user.id)}>
                            Helo
                        </div>
                    ))
                ) : (
                    <div className={styles.side_div_sub} onClick={handleUserClick}>
                        <div className={styles.side_div_sub_chat}>
                            <Avatar
                                size={43}
                                icon={
                                    <Icon
                                        icon={"/assets/images/admin_avatar.png"}
                                        width={"43px"}
                                        height={"43px"}
                                    />
                                }
                            />
                        </div>
                        <div className={styles.side_div_sub_desc}>
                            <div className={styles.side_div_sub_detail}>
                                <div className={styles.name}>
                                    Alison Davis
                                </div>
                                <div className={styles.detail}>
                                    Can we go ahead to join the ...
                                </div>
                            </div>
                            <div className={styles.side_div_sub_detail2}>
                                <div className={styles.time}>
                                    30m
                                </div>
                                <div className={styles.notic}>
                                    <NotificationIcon count={3}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}
        <div className={styles.chat_div}>
            {<ChatComponent userId={selectedUser} />}
        </div>
        {isMobile && selectedUser && (
            <div className={styles.chat_div_mobile}>
                <ChatComponent userId={selectedUser} isModelChatClose={handleUserClose}/>
            </div>
        )}
    </div>
  )

}


export default Messages