import React from "react";
import styles from "./styles/list_item.module.scss";

export const ListItem = ({ children }) => {
  return (
    <div className={`${styles.wrapper} ${styles.list_item}`}>{children}</div>
  );
};
