import React from "react";
import DetailsCard from "../components/atoms/DetailsCard";
import styles from "styles/admin/dashboard.module.scss";
import { getDashboardData } from "./api/dashboard/index";
import { fetchPrograms } from "pages/api/program";
import { Button } from "../components/atoms/Button";
import { FlexContainer, Section } from "../components/atoms/HTMLElements";
import { Icons } from "../components/atoms/Icons";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "components/Loader";
import Link from "next/link";

function Dashboard() {
  const { data, isLoading, isError } = useQuery(["dashboard"], () =>
    getDashboardData(),
  );

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  return (
    <div className={`flex flex-column gap-y-6 ${styles.wrapper}`}>
      <h1 className={`text-lg font-bold text-gray-700`}>Dashboard</h1>

      <FlexContainer className="gap-x-8">
        <Section className="px-3 pt-4 bg-mms-teal text-white rounded w-1/6">
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
        </Section>

        <Section className="flex gap-x-4 justify-between p-3 w-5/6 bg-mms-ts-teal rounded">
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
        </Section>
      </FlexContainer>

      <Section className="flex flex-column gap-y-4 justify-between p-3 w-full bg-mms-ts-teal rounded">
        <div className="flex justify-between">
          <h1 className={`text-base font-bold text-gray-600`}>
            Programs Overview
          </h1>
          <h1 className={`bg-white px-4 py-1 text-base`}>6 Active</h1>
        </div>
        <div className="flex gap-x-4 justify-between">
          <ReportCard
            title="GADS Program 2022"
            meta1="30"
            meta2="10%"
            icon={<Icons name="gads" />}
            flip
          />

          <ReportCard
            title="GADS Program 2022"
            meta1="30"
            meta2="10%"
            icon={<Icons name="gads" />}
            flip
          />

          <ReportCard
            title="GADS Program 2022"
            meta1="30"
            meta2="10%"
            icon={<Icons name="gads" />}
            flip
          />
        </div>
        <div className="flex justify-end">
          <Button variant="normal" size="small">
            View all
          </Button>
        </div>
      </Section>

      <Section className="flex flex-column gap-y-4 justify-between p-3 w-full bg-mms-ts-teal rounded">
        <div className="flex justify-between">
          <h1 className={`text-base font-bold text-gray-600`}>
            Reports Overview
          </h1>
          <h1 className={`bg-white px-4 py-1 text-base`}>
            10 reports submitted
          </h1>
        </div>
        <div className="flex gap-x-4 justify-between">
          <ReportCard
            title="Google Africa Scholarship"
            meta1="By Alison Davis -  19th - 25th Oct 22"
            icon={<Icons name="report-sheet" width="35" />}
          />

          <ReportCard
            title="Room Library article write..."
            meta1="By Alison Davis -  19th - 25th Oct 22"
            icon={<Icons name="task" fill="#058B94" />}
          />

          <ReportCard
            title="Google Africa Scholarship"
            meta1="By Alison Davis -  19th - 25th Oct 22"
            icon={<Icons name="report-sheet" width="35" />}
          />
        </div>
        <div className="flex justify-end">
          <Button variant="normal" size="small">
            View all
          </Button>
        </div>
      </Section>

      <Section className="flex flex-column gap-y-4 justify-between p-3 w-full bg-mms-ts-teal rounded">
        <div className="flex justify-between">
          <h1 className={`text-base font-bold text-gray-600`}>
            Tasks Overview
          </h1>
          <h1 className={`bg-white px-4 py-1 text-base`}>6 Active</h1>
        </div>
        <FlexContainer className="gap-x-8">
          <Section className="flex items-center px-3 bg-mms-teal text-white rounded w-1/6">
            <h3 className="text-xl font-bold leading-5">In progress</h3>
          </Section>

          <Section className="flex gap-x-4 justify-between w-5/6">
            <ReportCard
              title="Room liberary article
              write..."
              meta1="30"
              meta2="10%"
              icon={<Icons name="task" fill="#058B94" />}
              flip
            />

            <ReportCard
              title="Room liberary article
              write..."
              meta1="30"
              meta2="10%"
              icon={<Icons name="task" fill="#058B94" />}
              flip
            />

            <ReportCard
              title="Room liberary article
              write..."
              meta1="30"
              meta2="10%"
              icon={<Icons name="task" fill="#058B94" />}
              flip
            />
          </Section>
        </FlexContainer>

        <FlexContainer className="gap-x-8">
          <Section className="flex items-center px-3 bg-mms-teal text-white rounded w-1/6">
            <h3 className="text-xl font-bold leading-5">Completed</h3>
          </Section>

          <Section className="flex gap-x-4 justify-between w-5/6">
            <ReportCard
              title="Room liberary article
              write..."
              meta1="30"
              meta2="10%"
              icon={<Icons name="task" fill="#058B94" />}
              flip
            />

            <ReportCard
              title="Room liberary article
              write..."
              meta1="30"
              meta2="10%"
              icon={<Icons name="task" fill="#058B94" />}
              flip
            />

            <ReportCard
              title="Room liberary article
              write..."
              meta1="30"
              meta2="10%"
              icon={<Icons name="task" fill="#058B94" />}
              flip
            />
          </Section>
        </FlexContainer>
        <div className="flex justify-end">
          <Button variant="normal" size="small">
            View all
          </Button>
        </div>
      </Section>
    </div>
  );
}

function ReportCard({ flip, title, meta1, meta2, icon }) {
  return (
    <FlexContainer className={`bg-mms-light-teal basis-1/2 rounded p-4`}>
      <div
        className={`flex items-center gap-x-4 w-full ${
          flip ? "flex-row-reverse justify-end" : "justify-between"
        }`}>
        <Section>
          <p className="text-xl font-bold text-gray-600">{title}</p>
          <div className="flex items-center gap-x-4">
            <p className="text-lg">{meta1}</p> {meta2 && <p>{meta2}</p>}
          </div>
        </Section>
        {icon}
      </div>
    </FlexContainer>
  );
}

export default Dashboard;
