import React from "react";
import { MentorsList } from "../organisms/MentorList";
import { MentorDetails } from "../organisms/MentorDetails";
import { useRouter } from "next/router";
import styles from "../../styles/mentors/mentors.module.scss";

const MentorDetailsLayout = ({ children }) => {
  const router = useRouter();

  const mentors = [];
  const subPages = [
    { name: "About", link: `/mentors/about/${router.query.mentorID}` },
    { name: "Programs", link: `/mentors/programs/${router.query.mentorID}` },
    {
      name: "Tasks",
      link: `/mentors/tasks/${router.query.mentorID}`,
    },
    {
      name: "Certificates",
      link: `/mentors/certificates/${router.query.mentorID}`,
    },
  ];

  return (
    <div className="flex">
      <div className={styles.mentor_list_container}>
        <MentorsList />
      </div>
      <div className={styles.mentor_details_container}>
        <MentorDetails subPages={subPages}>{children}</MentorDetails>
      </div>
    </div>
  );
};

export default MentorDetailsLayout;
