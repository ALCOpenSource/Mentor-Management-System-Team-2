import React from "react";
import DetailsCard from "../components/atoms/DetailsCard";
import styles from "styles/admin/dashboard.module.scss";
import { getDashboardData } from "./api/dashboard/index";
import { fetchPrograms } from "pages/api/program";
import { Button } from "../components/atoms/Button";
import { Icons } from "../components/atoms/Icons";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "components/Loader";
import Link from "next/link";
const createArray = (length) => [...Array(length)];

function Badge({ text }) {
  return <div className={styles.program_badge}>{text}</div>;
}

function Dashboard() {
  const { data, isLoading, isError } = useQuery(["dashboard"], () =>
    getDashboardData(),
  );

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  return (
    <>
      <div className={`my-2 ${styles.header_text}`}>Dashboard</div>
      <div className="flex gap-x-8">
        <div className="px-3 pt-4 bg-mms-teal text-white rounded w-1/6">
          <div className="flex justify-end">
            <Button variant="white" size="small">
              View
            </Button>
          </div>
          <div className="flex items-center gap-x-4">
            <h1 className="text-7xl">6</h1>
            <h3 className="text-xl font-bold w-1/2 leading-5">
              Active Programs
            </h3>
          </div>
        </div>

        <div className="flex gap-x-4 justify-between p-3 w-5/6 bg-mms-ts-teal rounded">
          <ReportCard
            title="Mentors"
            meta1="30"
            meta2="10%"
            icon={<Icons name="mentor-lg" />}
          />

          <ReportCard
            title="Mentor Managers"
            meta1="30"
            meta2="10%"
            icon={<Icons name="mentor-manager-lg" />}
          />

          <ReportCard
            title="Tasks"
            meta1="30"
            meta2="10%"
            icon={<Icons name="task" fill="#058B94" />}
          />

          <ReportCard
            title="Reports"
            meta1="30"
            meta2="10%"
            icon={<Icons name="report-sheet" width="35" />}
          />
        </div>
      </div>

      {/* <Row className={styles.details_card_row}>
        <Col span={24} className={styles.programs_header_justify}>
          <div className={styles.overview_header}>Programs Overview</div>
          <div>
            <Badge text={data?.data?.active_programs + " Active"} />
          </div>
        </Col>

        <Col xs={24} className={styles.details_column}>
          {data?.data?.program_list?.map((program) => (
            <DetailsCard
              key={program?.id}
              icon="Person"
              text={program?.name.substring(0, 20)}
              program
              subText="Jun 13, 2022 -> Feb 10, 2023"
              marginRight="20px"
              width="332px"
              height="92px"
            />
          ))}
        </Col>
        <Col span={24} className={styles.button_container}>
          <Link href="/programs" passHref>
            <Button size="small" variant="normal">
              View All
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className={styles.details_card_row}>
        <Col span={24} className={styles.programs_header_justify}>
          <div className={styles.overview_header}>Reports Overview</div>
          <div>
            <Badge text={data?.data?.reports + " Reports Submmited"} />
          </div>
        </Col>

        <Col xs={24} className={styles.details_column}>
          {createArray(3).map((report, index) => (
            <ReportCard
              key={index}
              icon="ReportRight"
              text="GADS Program 2022"
              subText="Jun 13, 2022 -> Feb 10, 2023"
              marginRight="20px"
              report
              width="332px"
              height="64px"
            />
          ))}
        </Col>
        <Col span={24} className={styles.button_container}>
          <Link href="/reports" passHref>
            <Button size="small" variant="normal">
              View All
            </Button>
          </Link>
        </Col>
      </Row>

      <div className={styles.details_card_row}>
        <Col span={24} className={styles.programs_header_justify}>
          <p className={styles.overview_header}>Tasks Overview</p>
        </Col>
        <Row span={24}>
          <Col span={3} className={styles.details_in_progress_container}>
            <div className={styles.details_in_progress_header}>In Progress</div>
          </Col>
          <Col span={1}></Col>
          <Col span={20} className={styles.details_column}>
            {data?.data?.completed_task_list?.map((task) => (
              <ReportCard
                key={task?.id}
                icon="TaskRight"
                text={task?.title.substring(0, 28) + "..."}
                subtext={moment(task?.end_date).toNow()}
                marginRight="20px"
                report
                width="283px"
                height="92px"
                task
              />
            ))}
          </Col>
          <Col span={24} className={styles.button_container}>
            <Link href="/tasks" passHref>
              <Button size="small" variant="normal">
                View All
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className={styles.mt}>
          <Col span={3} className={styles.details_in_progress_container}>
            <div className={styles.details_in_progress_header}>Completed</div>
          </Col>
          <Col span={1}></Col>
          <Col span={20} className={styles.details_column}>
            {data?.data?.inprogress_task_list?.map((task) => (
              <ReportCard
                key={task?.id}
                icon="TaskRight"
                text={task?.title.substring(0, 28) + "..."}
                subtext={moment(task?.end_date).toNow()}
                marginRight="20px"
                report
                width="283px"
                height="92px"
                task
              />
            ))}
          </Col>
          <Col span={24} className={styles.button_container}>
            <Link href="/tasks" passHref>
              <Button size="small" variant="normal">
                View All
              </Button>
            </Link>
          </Col>
        </Row>
      </div> */}
    </>
  );
}

function ReportCard({ flip, title, meta1, meta2, icon }) {
  return (
    <div
      className={`flex justify-between items-center bg-mms-light-teal basis-1/2 rounded p-4 ${
        flip && "flex-row-reverse"
      }`}>
      <div>
        <p className="text-xl font-bold text-gray-600">{title}</p>
        <div className="flex items-center gap-x-4">
          <p className="text-lg font-semibold">{meta1}</p>{" "}
          {meta2 && <p>{meta2}</p>}
        </div>
      </div>
      {icon}
    </div>
  );
}

export default Dashboard;
