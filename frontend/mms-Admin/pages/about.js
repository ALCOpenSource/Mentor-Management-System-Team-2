import { Avatar, Button, Col, Row } from "antd";
import React from "react";
import styles from "../styles/admin/about.module.css";
import Icon from "../components/Icon.js";
import { NG } from 'country-flag-icons/react/3x2'

function About() {
  return (
    <>
      <Row className={styles.about}>
        <Col span={18}>
          <div className={styles.about_header}>
            <Avatar
              size={90}
              icon={
                <Icon
                  icon={"/assets/images/admin_avatar.png"}
                  width={"90px"}
                  height={"90px"}
                />
              }
            />
            <div className={styles.profile}>
              <p className={styles.about_name}>Peculiar Umeh
              <span> <NG title="Nigeria" style={{width:"20px"}}/></span>
              </p>
              <p className={styles.about_role}>Admin</p>
             
            </div>
          </div>
        </Col>
        <Col span={5} className={styles.t_align}>
          <Button className={styles.button}>Edit</Button>
        </Col>
      </Row>
      <Row className={styles.profile_description}>
        <Col span={24}>1</Col>
        <Col span={24}>2</Col>
        <Col span={24}>3</Col>
      </Row>
    </>
  );
}

export default About;
