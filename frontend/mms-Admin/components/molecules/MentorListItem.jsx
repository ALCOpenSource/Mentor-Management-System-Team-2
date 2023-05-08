import React from "react";
import { Button } from "../atoms/Button";
import styles from "./styles/mentor_list_item.module.scss";

export const MentorListItem = () => {
  return (
    <div
      className={`flex flex-align-center flex-justify-between ${styles.wrapper}`}>
      <div className="flex">
        <div className={styles.user_img}></div>
        <div className="flex flex-justify-center flex-column">
          {/* We need to reset padding and margin for p and all heading elements to avoid this */}
          <p className={styles.user_name}>Anna Jane</p>
          <p className={styles.date_joined}>Added 0ct. 10 2022</p>
        </div>
      </div>
      <div>
        <Button variant="normal" size="small" bordered>
          View
        </Button>
      </div>
    </div>
  );
};
