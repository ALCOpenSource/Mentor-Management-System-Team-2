import React from "react";
import SettingsLayout from "../../components/SettingsLayout";
import { Layout, Row } from "antd";
import ProfileImage from "../../components/settings/ProfileImage";

import styles from "../../styles/settings/sidebar.module.css";

function settingsGeneral() {

  return (
    <Row className={styles.main_container}>
      <Layout className={styles.sidebar}>
        <SettingsLayout>
         <ProfileImage/>
        </SettingsLayout>
      </Layout>
    </Row>
  );
}

export default settingsGeneral;
