import React from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";
import { Icons } from "../../../components/atoms/Icons";
import styles from "../../../styles/mentors/tasks.module.scss";
import { Button } from "../../../components/atoms/Button";
import { Accordion } from "../../../components/molecules/Accordion";

function MentorTasks() {
  return (
    <div class={styles.wrapper}>
      {[1, 2, 3, 4, 5].map(() => (
        <Accordion
          header={
            <div className="flex flex-justify-between flex-align-center">
              <div className="flex flex-align-center">
                <Icons name="task" fill="#058B94" margin="0 1rem 0 0" />
                <div
                  className={`flex flex-justify-center flex-column ${styles.title_area}`}>
                  <h1 className={styles.task_title}>
                    Room liberary article write...
                  </h1>
                  <div className="flex flex-align-center">
                    <Icons name="calendar" />
                    <p className={styles.brief_description}>3 days from now</p>
                  </div>
                </div>
              </div>
              <Icons name="arrow-up" fill="#058B94" />
            </div>
          }
          body={
            <>
              <p className={styles.task_description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices mauris.
                Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                amet. Pellentesque
              </p>
              <div
                className={`flex flex-justify-between flex-align-center ${styles.task_stats}`}>
                <div className="flex flex-align-center">
                  <Icons name="report-sheet" />

                  <div
                    className={`flex flex-align-center ${styles.report_stat}`}>
                    <h1 className={styles.number_of_reports}>18</h1>
                    <p className={styles.stat_text}>Task reports</p>
                  </div>
                </div>

                <div>
                  <Button variant="normal" size="small">
                    View
                  </Button>
                </div>
              </div>
            </>
          }
          footer={
            <Button variant="transparent" size="large" bordered>
              Unassign from Task
            </Button>
          }
        />
      ))}
    </div>
  );
}

MentorTasks.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default MentorTasks;
