import React, { memo, useState } from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";
import { Icons } from "../../../components/atoms/Icons";
import styles from "../../../styles/mentors/certificates.module.scss";
import { Button } from "../../../components/atoms/Button";
import Image from "next/image";
import { Accordion } from "../../../components/molecules/Accordion";
import { Select } from "antd";
import { useRouter } from "next/router";
import { fetchMentorCertificates } from "pages/api/user";
import { useQuery } from "@tanstack/react-query";
function MentorCertificates() {
  const [downloadFormat, setDownloadFormat] = useState("PDF");
  const router = useRouter();
  const {
    data: certificates,
    isLoading,
    isError,
  } = useQuery(["fetch_certificates"], () =>
    fetchMentorCertificates(router.query.mentorID),
  );

  if (isLoading) return "loading certificates...";

  if (isError) return "An error occured";

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  console.log(certificates);

  return (
    <div className={styles.wrapper}>
      {[
        {
          title: "GADS CLOUD 2022 - COMPLETION",
          image: "/assets/images/certificate-img.svg",
          downloadURL: "",
        },
        {
          title: "GADS CLOUD 2022 - COMPLETION",
          image: "/assets/images/certificate-img.svg",
          downloadURL: "",
        },
        {
          title: "GADS CLOUD 2022 - COMPLETION",
          image: "/assets/images/certificate-img.svg",
          downloadURL: "",
        },
      ].map((item, idx) => (
        <Accordion
          key={idx}
          header={
            <div className="flex flex-justify-between flex-align-center">
              <div className="flex flex-align-center gap-10">
                <Image
                  src={item.image}
                  width="50"
                  height="50"
                  alt={item.title}
                />
                <h1 className={styles.task_title}>{item.title}</h1>
              </div>
              <Icons name="arrow-up" fill="#058B94" />
            </div>
          }
          body={
            <div className={`flex flex-justify-center `}>
              <div className={styles.certificate_info}>
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="responsive"
                  width={400}
                  height={300}
                />
                <div className="flex flex-justify-end flex-align-center gap-10">
                  <p>Download as: </p>
                  <Select
                    className={styles.download_format_options}
                    defaultValue={downloadFormat}
                    onChange={handleChange}
                    options={[
                      {
                        value: "PDF",
                        label: "PDF",
                      },
                      {
                        value: "JPG",
                        label: "JPG",
                      },
                    ]}
                  />
                  <Button variant="normal" size="large">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          }
        />
      ))}
    </div>
  );
}

MentorCertificates.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default MentorCertificates;
