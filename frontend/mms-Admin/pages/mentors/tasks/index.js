import React from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";

function MentorTasks() {
  return <>tasks here</>;
}

MentorTasks.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default MentorTasks;
