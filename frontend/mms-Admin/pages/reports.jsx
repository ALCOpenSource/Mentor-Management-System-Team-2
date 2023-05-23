import React, { useEffect, useState } from "react";
import { ListItem } from "../components/atoms/ListItem";
import { Icons } from "../components/atoms/Icons";
import { Button } from "../components/atoms/Button";
import styles from "../styles/reports.module.scss";
import Modal from "../components/molecules/Modal";
import { ShareReportConfirmationDialogue } from "../components/molecules/ShareReportConfirmationDialogue";
import { SuccessModal } from "../components/molecules/SuccessModal";
import NoItemSelected from "../components/organisms/NoItemSelected";
import { fetchTaskReports, fetchProgramReports } from "./api/report/index";
import { format } from "date-fns";

const Reports = () => {
  const [report, setReport] = useState(null);
  const [reportFilterType, setReportFilterType] = useState("program-reports");
  const [showConfirmSharingByEmail, setShowConfirmSharingByEmail] =
    useState(false);
  const [showDownLoadSuccessModal, setShowDownLoadSuccessModal] =
    useState(false);
  const [reports, setReports] = useState([]);

  useEffect(async () => {
    if (reportFilterType === "program-reports") {
      const reportData = await fetchProgramReports();
      setReports((prev) => reportData);
    }

    if (reportFilterType === "task-reports") {
      const reportData = await fetchTaskReports();
      setReports((prev) => reportData);
    }
  }, [reportFilterType]);

  return (
    <div className={`flex`}>
      <div>
        <div
          className={`flex flex-align-center gap-16 ${styles.report_selector}`}>
          <label>
            <input
              name="report_type"
              type="radio"
              onChange={() => setReportFilterType("program-reports")}
              checked={reportFilterType === "program-reports"}
            />
            <div>Program Reports</div>
          </label>
          <label>
            <input
              name="report_type"
              type="radio"
              onChange={() => setReportFilterType("task-reports")}
              checked={reportFilterType === "task-reports"}
            />
            <div>Task Reports</div>
          </label>
        </div>
        <div className={`${styles.list_wrapper}`}>
          {reports.map((item) => (
            <ListItem
              onClick={() => setReport(item)}
              className="cursor-pointer"
              key={item.id}>
              <div className={`flex gap-16 flex-align-center`}>
                <Icons name="report-sheet" />
                <div>
                  <p className={`list_main_text`}>{item.task.title}</p>
                  <div className={`flex gap-16`}>
                    <p className="list_sub_text">
                      By{" "}
                      {`${item.mentorManager.firstName} ${item.mentorManager.lastName}`}
                    </p>
                    <p className="list_sub_text">
                      {`${format(
                        new Date(item.task.startDate),
                        "d",
                      )} - ${format(
                        new Date(item.task.endDate),
                        "dd MMM yyyy",
                      )}`}
                    </p>
                  </div>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
      </div>

      <div className={styles.report_details}>
        {!report && (
          <div
            className={`flex flex-justify-end ${styles.compose_button_area}`}>
            <Button variant="normal" size="large">
              Compose Report
            </Button>
          </div>
        )}
        <div className={styles.report_details_content}>
          {report ? (
            <div>
              <div
                className={`flex flex-justify-between flex-align-center ${styles.details_header}`}>
                <div className="flex gap-16 flex-align-center ">
                  <Icons name="report-sheet" width="30" />
                  <div>
                    <p className={`list_main_text`}>{report.task.title}</p>
                    <div className={`flex gap-16`}>
                      <p className="list_sub_text">
                        By{" "}
                        {`${report.mentorManager.firstName} ${report.mentorManager.lastName}`}
                      </p>
                      <p className="list_sub_text">
                        {`${format(
                          new Date(report.task.startDate),
                          "d",
                        )} - ${format(
                          new Date(report.task.endDate),
                          "dd MMM yyyy",
                        )}`}
                      </p>
                    </div>
                  </div>
                </div>
                <Icons onClick={() => setReport(null)} name="close" />
              </div>

              <div className={styles.details_body}>
                <section>
                  <h1>Major Achievements</h1>
                  <p>{report.achievement}</p>
                </section>

                <section>
                  <h1>Major Blockers</h1>
                  <p>{report.blocker}</p>
                </section>

                <section>
                  <h1>Major Recommendations</h1>
                  <p>{report.recommendation}</p>
                </section>

                <section className="flex flex-justify-between">
                  <Button
                    onClick={() => setShowConfirmSharingByEmail(true)}
                    variant="white"
                    size="large"
                    bordered>
                    Share
                  </Button>
                  <Button
                    onClick={() => setShowDownLoadSuccessModal(true)}
                    variant="normal"
                    size="large">
                    Download
                  </Button>
                </section>
              </div>
            </div>
          ) : (
            <NoItemSelected />
          )}
        </div>
      </div>

      <Modal show={showConfirmSharingByEmail}>
        <ShareReportConfirmationDialogue
          onClose={() => setShowConfirmSharingByEmail(false)}
          onConfirm={() => {
            setShowConfirmSharingByEmail(false);
          }}
        />
      </Modal>
      <Modal show={showDownLoadSuccessModal}>
        <SuccessModal
          onClose={() => setShowDownLoadSuccessModal(false)}
          onConfirm={() => {
            setShowDownLoadSuccessModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Reports;
