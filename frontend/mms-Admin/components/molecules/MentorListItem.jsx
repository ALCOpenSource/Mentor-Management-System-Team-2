import React from "react";
import { Button } from "../atoms/Button";
import styles from "./styles/mentor_list_item.module.scss";
import Link from "next/link";

export const MentorListItem = ({ data }) => {
  return (
    <div
      className={`flex flex-align-center flex-justify-between ${styles.wrapper}`}>
      <div className="flex">
        <UserAvatar />
        <UserDetails />
      </div>
      <Link href={`/mentors/about/${data.id}`}>
        <Button variant="normal" size="small" bordered>
          View
        </Button>
      </Link>
    </div>
  );
};

function UserDetails(name, createdAt) {
  return (
    <div className="flex flex-justify-center flex-column">
      {/* We need to reset padding and margin for p and all heading elements to avoid this */}
      <p className={styles.user_name}>Anna Jane</p>
      <p className={styles.date_joined}>Added 0ct. 10 2022</p>
    </div>
  );
}

function UserAvatar({ imgURL }) {
  return <div className={styles.user_img}></div>;
}
