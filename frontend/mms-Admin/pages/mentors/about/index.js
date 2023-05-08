import React from "react";
import { MentorsList } from "../../../components/organisms/MentorList";
import { MentorDetails } from "../../../components/organisms/MentorDetails";

const MentorsData = ({ mentorsData }) => {
  return (
    <div className="flex">
      <div style={{ width: "25%", padding: "1rem" }}>
        <MentorsList />
      </div>
      <div style={{ width: "75%", padding: "1rem" }}>
        <MentorDetails />
      </div>
    </div>
  );
};

export default MentorsData;
