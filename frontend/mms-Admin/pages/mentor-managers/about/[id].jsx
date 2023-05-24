import React from "react";
import { useRouter } from "next/router";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchMentorManagerData } from "pages/api/user";

function AboutMentorManager() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(["about_mentor_manager"], () =>
    fetchMentorManagerData(router.query.id),
  );

  if (isLoading) return "loading...";

  if (isError) return "An error occured";

  console.log(data);

  return <>About mentor manager content here</>;
}

AboutMentorManager.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default AboutMentorManager;
