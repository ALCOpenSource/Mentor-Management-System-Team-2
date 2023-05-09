import { useRouter } from "next/router";
import { Button } from "../atoms/Button";
import { CustomTab } from "./CustomTab";
import styles from "./styles/mentor_details.module.scss";

export const MentorDetails = ({ data, children }) => {
  const router = useRouter();
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
    <>
      {console.log(data)}
      <div
        className={`flex flex-align-center flex-justify-between ${styles.wrapper}`}>
        <div className="flex">
          <div className={styles.user_img}></div>
          <div className="flex flex-justify-center flex-column">
            <h2
              className={
                styles.user_name
              }>{`${data.first_name} ${data.last_name}`}</h2>
            <p className={styles.designation}>
              {data.isAdmin
                ? "Admin"
                : data.isMentorManager
                ? "Mentor Manager"
                : "Mentor"}
            </p>
          </div>
        </div>

        <div className={`flex ${styles.cta_wrapper}`}>
          <Button variant="normal" size="large">
            Send Message
          </Button>
          <Button variant="normal" size="large">
            Close
          </Button>
        </div>
      </div>
      <CustomTab tabs={subPages}>{children}</CustomTab>
    </>
  );
};
