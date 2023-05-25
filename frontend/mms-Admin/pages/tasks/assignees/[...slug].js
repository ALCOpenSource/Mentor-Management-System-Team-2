import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PaginationWithFilter } from "../../../components/molecules/PaginationWithFilter";
import styles from "../../../styles/programs/task_assignees.module.scss";
import { ListItem } from "../../../components/atoms/ListItem";
import { Icons } from "../../../components/atoms/Icons";
import Image from "next/image";
import {
  getMentorManagerssAssignedToATask,
  getMentorsAssignedToATask,
} from "../../api/mentor";

const TaskAssignees = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { slug } = router.query;
  const role = slug?.[0] === "mentor-manager" ? "Mentor Manager" : "Mentor";
  const id = slug?.[1];

  useEffect(async () => {
    if (id && role) {
      if (role === "Mentor Manager") {
        const users = await getMentorManagerssAssignedToATask(id);
        if (users) setUsers(users.data);
      }

      if (role === "Mentor") {
        const users = await getMentorsAssignedToATask(id);
        if (users) setUsers(users.data);
      }
    }
  }, [id, role]);

  return (
    <div>
      <div className="flex flex-justify-between flex-align-center">
        <h1 className={styles.page_title}>
          {role ? `${role}s` : "Mentors"} Assigned to Room Library article
          write...
        </h1>
        <PaginationWithFilter />
      </div>
      <div className={styles.program_reports}>
        {users.length > 0 ? (
          users.map((user) => {
            const userData = user.mentor ? "mentor" : "mentorManager";
            console.log(userData);

            return (
              <ListItem key={user[userData].id}>
                <div className="flex flex-align-center gap-16">
                  <Image
                    width={50}
                    height={50}
                    src={"/assets/images/user_img.svg"}
                    alt="User profile image"
                    className={`circle-img`}
                  />
                  <div className={styles.user_summary}>
                    <h1
                      className={`list_main_text`}>{`${user[userData].first_name} ${user[userData].last_name}`}</h1>
                    <div className={`flex flex-align-center`}>
                      <p className={`list_sub_text`}>{user[userData].bio}</p>
                    </div>
                  </div>
                  <p className={`tag`}>PROGRAM ASST.</p>
                  <p className={`tag`}>MENTOR-GADS</p>
                </div>
                <div className="flex gap-16">
                  <span className={`cursor-pointer`}>
                    <Icons name="comment" />
                  </span>
                </div>
              </ListItem>
            );
          })
        ) : (
          <p>No {role} found for this task</p>
        )}
      </div>
    </div>
  );
};

export default TaskAssignees;
