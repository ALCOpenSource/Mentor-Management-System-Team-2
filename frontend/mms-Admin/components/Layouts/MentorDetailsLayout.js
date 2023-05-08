import React from "react";
import { MentorsList } from "../organisms/MentorList";
import { MentorDetails } from "../organisms/MentorDetails";

const MentorDetailsLayout = ({ children }) => {
  const mentors = [];

  return (
    <div className="flex">
      <div style={{ width: "25%", padding: "1rem" }}>
        <MentorsList />
      </div>
      <div style={{ width: "75%", padding: "1rem" }}>
        <MentorDetails>{children}</MentorDetails>
      </div>
    </div>
  );
};

export default MentorDetailsLayout;
