import React, { useContext, useState, useEffect  } from "react";
import { SearchDataContext } from "../searchDataContext";
import styles from "../componentStyles/archive.module.css";
import Icon from "../Icon";
import moment from 'moment';

function Archive() {
  const searchData = useContext(SearchDataContext);
  const [newData, setNewData] = useState([])

  useEffect(() => {
    if (typeof(searchData) === 'string'){
      setNewData(JSON.parse(searchData))
    }
  }, [])
  
  console.log(newData, "searchData")
  return (
    <div className={styles.main_div}>
     {newData.map(data => (
      <div className={styles.main_sub_div} key={data?.id}>
        <div className={styles.main_sub_icon}>
          <Icon
            icon={"/assets/images/BlackGoogleLogo.svg"}
            width={"48px"}
            height={"48px"}
          />
        </div>
        <div className={styles.main_sub_content}>
          <p>{data?.name}</p>
          <div className={styles.main_sub_con_main}>
            <div className={styles.main_sub_con}>
              <span className={styles.main_sub_content_timeicon}>
                <Icon
                  icon={"/assets/images/ClockLogo.svg"}
                  width={"16.5px"}
                  height={"16.5px"}
                />
              </span>
              <div className={styles.main_sub_content_time}>{moment(data?.DateTime, 'YYYY-MM-DD')}</div>
            </div>
            <div className={styles.main_sub_con}>
              <span className={styles.main_sub_content_timeicon1}>
                <Icon
                  icon={"/assets/images/MainClockLogo.svg"}
                  width={"18px"}
                  height={"18px"}
                />
              </span>
              <div className={styles.main_sub_content_time}>{moment(data?.DateTime, 'HH:mm:ss')}</div>
            </div>
            <div className={styles.main_sub_con}>
              <span className={styles.main_sub_content_archor}>
                <Icon
                  icon={"/assets/images/Archor.svg"}
                  width={"20px"}
                  height={"20px"}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}

export default Archive;
