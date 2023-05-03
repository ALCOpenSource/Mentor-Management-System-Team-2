import React, { useState, useEffect } from "react";
import styles from "../componentStyles/notifications.module.css";
import ToggleInput from  "components/ToggleInput";
import { fetchNotificationSettings , updateNotificationSettings } from "pages/api/setting";
import { Loader } from "components/Loader";
import debounce from "lodash.debounce";
import { useStateValue } from "store/context";
import SuccessMessage from "components/SuccessMessage";

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

  const discussionInputFields = [
    {
      name: "comments_on_post",
      label: "Comments on post",
      email: "email",
      push: "push"
    },
    {
      name: "posts",
      label: "Posts",
      email: "email",
      push: "push"
    },
    {
      name: "comments",
      label: "Comments",
      email: "email",
      push: "push"
    },
    {
      name: "mentions",
      label: "Mentions",
      email: "email",
      push: "push"
    },
    {
      name: "direct_message",
      label: "Direct Message",
      email: "email",
      push: "push"
    }
  ];

  const [settings, setSettings] = useState({});
  const [disSettings, setDisSettings] = useState({});
  const [_, dispatch] = Object.values(useStateValue());
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  const loadNotificationSettings = async () => {
    setLoading(true)
    try {
      setLoading(true)
      const { data: {settings} } = await fetchNotificationSettings()
      setSettings(settings?.general?.notifications);
      setDisSettings(settings?.discussion?.notifications)
      setLoading(false)
    } catch (error) {
      console.error("An error occurred while loading data:", error);
      setLoading(false)
    }
  };

  useEffect(() => {
    loadNotificationSettings()
  }, [])

  const handleUpdateGen = debounce(async (updatedSettings) => {
    const payload = {
      general: { notifications: updatedSettings },
    };
    console.log(payload);
    try {
      const response = await updateNotificationSettings(payload);
      if (response.status === 200) {
        setModalOpen(true);
        dispatch({
          type: "UPDATE_NOTIFICATION_SETTINGS",
          payload: response?.data,
        });
      }
    } catch (error) {}
  }, 2000);
  

  const handleUpdateDis = debounce(async (updatedSettings) => {
    const payload = {
      discussion: { notifications: updatedSettings }
    };
    try {
      const response = await updateNotificationSettings(payload);
      if (response.status === 200) {
        setModalOpen(true);
        dispatch({
          type: "UPDATE_NOTIFICATION_SETTINGS",
          payload: response?.data
        });
      }
    } catch (error) {}
  }, 2000);

  const handleChange = ({ name, type, action }) => {
    setSettings((prevState) => {
      const updatedSettings = {
        ...prevState,
        [name]: {
          ...prevState[name],
          [type]: action,
        },
      };
      handleUpdateGen(updatedSettings);
      return updatedSettings;
    });
  };

  const handleChangeDis = ({ name, type, action }) => {
    setDisSettings((prevState) => {
      const updatedSettings = {
        ...prevState,
        [name]: {
          ...prevState[name],
          [type]: action,
        },
      };
      handleUpdateDis(updatedSettings);
      return updatedSettings;
    });
  };  

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  if (loading) {
    return (
      <div className={styles.spin}>
        <Loader size="large" />
      </div>
    );
  }

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
                handleChange={(action) => handleChange({...field, action, type: field.email})} />
                </span>
                <span className={styles.item_span2}>
                <ToggleInput
                  key={field.name}
                  checked={settings[field.name]?.push}
                  handleChange={(action) => handleChange({...field, action, type: field.push})} />
                </span>
            </div>
           </div>
        ))}
      </div>
        <SuccessMessage
        image={"/assets/images/success.png"}
          message={"Notification Settings Saved Successfully"}
          isModalOpen={modalOpen}
          setIsModalOpen={handleModal}
        />
      </div>
      <div className={styles.discussion_div}>
        <p>Discussion Notifications</p>
        <div className={styles.noti_span}>
          <span className={styles.email_span}>Email</span>
          <span className={styles.inapp_span}>In-app</span>
        </div>
        <div className={styles.main}>
        {discussionInputFields.map((field) => (
          <div className={styles.item} key={field.name}>
          <span className={styles.head}>{field.label}</span>
            <div className={styles.toggle_div}>
              <span className={styles.item_span1}>
              <ToggleInput
                key={field.name}
                checked={disSettings[field.name]?.email}
                handleChange={(action) => handleChangeDis({...field, action, type: field.email})} />
                </span>
                <span className={styles.item_span2}>
                <ToggleInput
                  key={field.name}
                  checked={disSettings[field.name]?.push}
                  handleChange={(action) => handleChangeDis({...field, action, type: field.push})} />
                </span>
            </div>
           </div>
        ))}
      </div>
        <SuccessMessage
          image={"/assets/images/user_phone.svg"}
            message={"Notification Settings Saved Successfully"}
            isModalOpen={modalOpen}
            setIsModalOpen={handleModal}
        />
      </div>
    </div>
  );
}

export default Notifications;
