import React, { useState } from "react";
import format from "date-fns/format";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import styles from "../../styles/programs/programs.module.scss";
import { Icons } from "../../components/atoms/Icons";
import { ListItem } from "../../components/atoms/ListItem";
import { Button } from "../../components/atoms/Button";
import { Stats } from "../../components/molecules/Stats";
import NoItemSelected from "../../components/organisms/NoItemSelected";
import { fetchPrograms } from "pages/api/program";

const Programs = () => {
  const [program, setProgram] = useState(null);
  const {
    data: programs,
    isLoading,
    isError,
  } = useQuery(["programs"], fetchPrograms);

  if (isLoading) return "loading...";

  if (isError) return "An error occured";

  return (
    <div className={`flex`}>
      <div className={`${styles.list_area}`}>
        <div className="flex flex-justify-between flex-align-center mb-1">
          <h1 className={styles.page_title}>Programs</h1>
          <div className={`flex flex-align-center gap-10`}>
            <Icons name="search" width="24" fill="#058B94" />
            <Icons name="filter" />
          </div>
        </div>

        <div className={`${styles.list_wrapper}`}>
          {programs.map((item) => (
            <ListItem
              onClick={() => setProgram(item)}
              className="cursor-pointer"
              key={item.id}>
              <div className={`flex gap-16 flex-align-center`}>
                <div>
                  <Icons name="gads" />
                </div>
                <div>
                  <p className={`list_main_text`}>{item.name}</p>
                  <div className={`flex gap-10`}>
                    <p className="flex flex-align-center gap-10 list_sub_text">
                      <Icons name="calendar" />
                      {format(new Date(item.created_at), "MMM dd, yyyy")}
                    </p>
                    <p className="flex flex-align-center gap-10 list_sub_text">
                      <Icons name="timer" />
                      {format(new Date(item.created_at), "p")}
                    </p>
                  </div>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
      </div>

      <div className={styles.program_details}>
        <div className={`flex flex-justify-end ${styles.compose_button_area}`}>
          <Button
            variant="normal"
            size="large"
            type="link"
            url="/programs/create">
            Create New Program
          </Button>
        </div>
        <div className={styles.program_details_content}>
          {program ? (
            <div>
              <div
                className={`flex flex-justify-between flex-align-center ${styles.details_header}`}>
                <div className={`flex gap-16 flex-align-center`}>
                  <Icons name="gads" />
                  <div>
                    <p className={`list_main_text`}>{program.name}</p>
                    <div className={`flex gap-10`}>
                      <p className="flex flex-align-center gap-10 list_sub_text">
                        <Icons name="calendar" />{" "}
                        {format(new Date(program.created_at), "MMM dd, yyyy")}
                      </p>
                      <p className="flex flex-align-center gap-10 list_sub_text">
                        <Icons name="timer" />{" "}
                        {format(new Date(program.created_at), "p")}
                      </p>
                    </div>
                  </div>
                </div>
                <Icons onClick={() => setProgram(null)} name="close" />
              </div>

              <div className={styles.details_body}>
                <section>
                  <h1>About:</h1>
                  <p>{program.description}</p>

                  <Stats
                    icon={<Icons name="mentor-manager" />}
                    number={12}
                    text="Mentor Managers assigned to this program"
                  />

                  <Stats
                    icon={<Icons name="mentor" />}
                    number={80}
                    text="Mentors assigned to this program"
                  />

                  <Stats
                    icon={<Icons name="report-sheet" />}
                    number={35}
                    text="Program reports"
                  />
                </section>

                <section className="flex flex-align-center flex-justify-end gap-16">
                  <Link href="#">
                    <span className={`cursor-pointer ${styles.remove_program}`}>
                      Delete/Archive Program
                    </span>
                  </Link>
                  <Button
                    type="link"
                    url={`/programs/edit?${program.id}`}
                    variant="normal"
                    size="large">
                    Edit Program
                  </Button>
                </section>
              </div>
            </div>
          ) : (
            <NoItemSelected />
          )}
        </div>
      </div>
    </div>
  );
};

export default Programs;
