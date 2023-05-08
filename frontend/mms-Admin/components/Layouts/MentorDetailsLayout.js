import React from "react";
import { MentorsList } from "../organisms/MentorList";
import { MentorDetails } from "../organisms/MentorDetails";
import { useRouter } from "next/router";

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
      <div style={{ width: "25%", padding: "1rem" }}>
        <MentorsList />
      </div>
      <div style={{ width: "75%", padding: "1rem" }}>
        <MentorDetails subPages={subPages}>{children}</MentorDetails>
      </div>
    </div>
  );
};

export default MentorDetailsLayout;
