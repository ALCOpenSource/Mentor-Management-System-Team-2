import React, { useState, useEffect } from "react";
import styles from "../componentStyles/notifications.module.css";
import { Switch } from "antd";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import ToggleInput from  "components/ToggleInput"
import axios from "pages/api/axios";

function Notifications() {

  const generalInputFields = [
    {
      name: "all",
      label: "All Notifications",
      email: "email",
      push: "push"
    },
    {
      name: "programs",
      label: "Programs",
      email: "email",
      push: "push"
    },
    {
      name: "tasks",
      label: "Tasks",
      email: "email",
      push: "push"
    },
    {
      name: "approval_requests",
      label: "Approval Requests",
      email: "email",
      push: "push"
    },
    {
      name: "reports",
      label: "Reports",
      email: "email",
      push: "push"
    }
  ];
  const [settings, setSettings] = useState({});
  
  const loadNotificationSettings = () => {
      
    const token = 'Mw.SamgyKJGsQjp7z8LIzvDrLDCWpmyqB6fMaf-r1AWksT9A6ExAB-gHFUBOOjs';

    axios.get('notification-settings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const newItems = response?.data?.settings?.general?.notifications;
        setSettings(newItems);
      })
      .catch(error => {
        console.error('Error loading more items:', error);
      });
  };

  useEffect(() => {
    loadNotificationSettings()
  }, [])
  console.log(settings)

  const handleChange = (name,type) => {
    setSettings((prevState) => {
      return {
        ...prevState, [name]: {...prevState[name], [type]:!prevState[name][type]}
      }
    });
    handleUpdate();
  };

  return (
    <div className={styles.main_div}>
      <div className={styles.general_div}>
        <p>General Notifications</p>
        <div className={styles.noti_span}>
          <span className={styles.email_span}>Email</span>
          <span className={styles.inapp_span}>In-app</span>
        </div>
        <div className={styles.main}>
        {generalInputFields.map((field) => (
          <div className={styles.item} key={field.name}>
          <span className={styles.head}>{field.label}</span>
            <div className={styles.toggle_div}>
              <span className={styles.item_span1}>
              <ToggleInput
                key={field.name}
                checked={settings[field.name]?.email}
                handleChange={() => handleChange(field.name,field.email)} />
                </span>
                <span className={styles.item_span2}>
                <ToggleInput
                  key={field.name}
                  checked={settings[field.name]?.push}
                  handleChange={() => handleChange(field.name, field.push)} />
                </span>
            </div>
           </div>
        ))}
      </div>
        
      </div>
      {/* 
      <div className={styles.discussion_div}>
        <p>Discussion Notifications</p>
        <div className={styles.noti_span}>
          <span className={styles.email_span}>Email</span>
          <span className={styles.inapp_span}>In-app</span>
        </div>
        <div className={styles.item_dis}>
          <span className={styles.head}>Comments on my post</span>
          <span className={styles.item_dis_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
          <span className={styles.item_dis_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className={styles.item_dis1}>
          <span className={styles.head}>Posts</span>
          <span className={styles.item_dis1_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
          <span className={styles.item_dis1_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className={styles.item_dis2}>
          <span className={styles.head}>Comments</span>
          <span className={styles.item_dis2_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
          <span className={styles.item_dis2_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className={styles.item_dis3}>
          <span className={styles.head}>Mentions</span>
          <span className={styles.item_dis3_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
          <span className={styles.item_dis3_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className={styles.item_dis4}>
          <span className={styles.head}>Direct Message</span>
          <span className={styles.item_dis4_span1}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
          <span className={styles.item_dis4_span2}>
            <Switch
              checkedChildren={
                <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
              }
              unCheckedChildren={
                <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
              }
              style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
              checked={checked}
              onChange={handleChange}
            />
          </span>
        </div>
      </div>*/}
    </div>
  );
}

export default Notifications;
