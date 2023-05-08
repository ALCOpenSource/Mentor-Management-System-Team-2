import styles from "./styles/custom_tab.module.scss";
import Link from "next/link";

export const CustomTab = ({ children }) => {
  return (
    <div>
      <div
        className={`${styles.tab_header} flex flex-justify-around`}
        style={{ borderBottom: "1px solid #CCCCCC" }}>
        <div className={styles.tab_title}>
          <Link href="about">About</Link>
        </div>
        <div className={styles.tab_title}>
          <Link href="programs">Programs</Link>
        </div>
        <div className={styles.tab_title}>
          <Link href="tasks">Tasks</Link>
        </div>
        <div className={styles.tab_title}>
          <Link href="certificates">Certificates</Link>
        </div>
      </div>
      <div
        className="flex flex-justify-center flex-align-center"
        style={{ height: "50vh" }}>
        {children}
      </div>
    </div>
  );
};
