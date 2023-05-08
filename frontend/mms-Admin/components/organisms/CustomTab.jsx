import styles from "../../styles/mentors/about.module.scss";

export const CustomTab = ({ tabData }) => {
  return (
    <div>
      <div
        className={`${styles.tab_header} flex flex-justify-around`}
        style={{ borderBottom: "1px solid #CCCCCC" }}>
        <div className={styles.tab_title}>About</div>
        <div className={styles.tab_title}>Programs</div>
        <div className={styles.tab_title}>Tasks</div>
        <div className={styles.tab_title}>Certificates</div>
      </div>
      <div>Tab content</div>
    </div>
  );
};
