import { Button, Input, Space, Form } from "antd";
import React, { useState } from "react";
import Icon from "../Icon";
import styles from "../componentStyles/login.module.css";

const Login = ({ showPassword, setShowPassword }) => {
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Form>
        <div>
          <p className={styles.welcome_header}>Welcome!</p>
          <p className={styles.login_text}>Login to continue</p>
        </div>
        <Input
          className={styles.login_input}
          style={{ marginBottom: "20px" }}
          size="large"
          placeholder="Email"
          type="email"
          required
        />

        <Input.Password
          size="large"
          className={styles.login_input}
          placeholder="Password"
          required
        />
        <div className={styles.login_button_container}>
          <Button size="large" style={{ height:"50px"}} className={styles.login_button}>
            Login
          </Button>
          
        </div>
        <p
            className={styles.forgot_password_text}
            onClick={handleForgotPassword}>
            Forgot Password?
          </p>
        <div className={styles.login_button_container}>
          <Button style={{ height:"50px"}}size="large" className={styles.google_login_button}>
            <Icon
              icon={"/assets/images/google_logo.png"}
              width={"38px"}
              height={"38px"}
            />
            
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "30px",
                color: "#023C40",
               
              }}>
              signin with Google
            </p>
          </Button>
          </div>


          <p className={styles.signup}>New User? Signup</p>
      </Form>
    </div>
  );
};
export default Login;
