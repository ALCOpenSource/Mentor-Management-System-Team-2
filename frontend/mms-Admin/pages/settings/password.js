import React from 'react'
import SettingsLayout from "../../components/SettingsLayout";
import { Layout, Row } from "antd";
import styles from "../../styles/settings/sidebar.module.css";
const password = () => {
  return (
    <Row className={styles.main_container}>
    <Layout className={styles.sidebar}>
    <SettingsLayout>password</SettingsLayout>
    </Layout>
  </Row>
  )
}

export default password