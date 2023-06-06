import React from "react";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";
import { Inputs } from "../../../components/atoms/Inputs";
import { Icons } from "../../../components/atoms/icons";
import { ListItem } from "../../../components/atoms/ListItem";
import Link from "next/link";
import Image from "next/image";

function MentorManagerMentors() {
  return (
    <>
      <div className="flex pt-4 pb-4 justify-between items-center">
        <p>All mentors</p>
        <div className="w-full lg:max-w-[40%]">
          <Inputs
            icon={<Icons name="search" fill="#cbcbcb" width={20} />}
            type="search"
            placeholder="search here"
          />
        </div>
      </div>
      <div>
        <Link
          href={`/mentors/about/${1}?fullName=${"John"} ${"Doe"}&designation=mentor`}>
          <ListItem>
            <div className="flex flex-align-center gap-16">
              <Image
                width={50}
                height={50}
                src={"/assets/images/user_img.svg"}
                alt="User profile image"
                className={`circle-img`}
              />
              <div className="flex gap-x-8 me-4">
                <div>
                  <h1 className={`list_main_text`}>{`${"John"} ${"Doe"}`}</h1>
                  <p className={`list_sub_text`}>
                    {true &&
                      `${"Lorem ipsum is a very usefull placeholder text".substring(
                        0,
                        16,
                      )}...`}
                  </p>
                </div>

                <div className={`flex flex-column gap-10 flex-justify-center`}>
                  <div className="flex gap-x-10">
                    <p className={`tag`}>PROGRAM ASST.</p>
                    <p className={`tag`}>MENTOR-GADS</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-column gap-16">
              <span className={`cursor-pointer`}>
                <Icons name="comment" />
              </span>
            </div>
          </ListItem>
        </Link>
      </div>
    </>
  );
}

MentorManagerMentors.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default MentorManagerMentors;
