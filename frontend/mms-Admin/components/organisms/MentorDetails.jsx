import { Button } from "../atoms/Button";
import { CustomTab } from "./CustomTab";
import styles from "./styles/mentor_details.module.scss";

export const MentorDetails = ({ mentorData }) => {
  return (
    <>
      <div
        className={`flex flex-align-center flex-justify-between ${styles.wrapper}`}>
        <div className="flex">
          <div className={styles.user_img}></div>
          <div className="flex flex-justify-center flex-column">
            <h2 className={styles.user_name}>Alison Davis</h2>
            <p className={styles.designation}>Mentor</p>
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
      <CustomTab />
    </>
  );
};
