import React from "react";
import styles from "../../../styles/mentors/about.module.scss";

const MentorsList = () => {
  return (
    <div style={{ width: "25%", padding: "1rem" }}>
      <div className={styles.mentors_list_header}>Header</div>
      <div className={styles.mentors_list}>
        {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map(
          () => (
            <div
              className="flex flex-align-center flex-justify-between"
              style={{
                borderRadius: "5px",
                backgroundColor: "#ffffff",
                border: "1px solid #F2F2F2",
                display: "flex",
                padding: "0.5rem",
              }}>
              <div className="flex">
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}></div>
                <div
                  className="flex flex-justify-center flex-column"
                  style={{ padding: "0 1rem" }}>
                  <p style={{ padding: 0, margin: 0 }}>Anna Jane</p>
                  <p style={{ padding: 0, margin: 0 }}>Added 0ct. 10 2022</p>
                </div>
              </div>
              <div>
                <button>View</button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

const MentorDetails = () => {
  return (
    <div style={{ width: "75%", padding: "1rem" }}>
      <div
        className="flex flex-align-center flex-justify-between"
        style={{
          backgroundColor: "#ffffff",
          display: "flex",
          padding: "2rem 0",
        }}>
        <div className="flex">
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "1px solid black",
            }}></div>
          <div
            className="flex flex-justify-center flex-column"
            style={{ padding: "0 1rem" }}>
            <h4 style={{ padding: 0, margin: 0 }}>Anna Jane</h4>
            <p style={{ padding: 0, margin: 0 }}>
              <small>Mentor</small>
            </p>
          </div>
        </div>
        <div className="flex">
          <button>Send Message</button>
          <button>Close</button>
        </div>
      </div>
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
    </div>
  );
};

const MentorsData = () => {
  return (
    <div className="flex">
      <MentorsList />
      <MentorDetails />
    </div>
  );
};

export default MentorsData;
