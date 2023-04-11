import React, { useState } from "react";
import SplashScreen from "../components/SplashScreen";
import { Col, Row, Button, Input } from "antd";

function NewPassword() {
  return (
    <div style={{ margin: "0 auto" }}>
      <p
        style={{
          fontWeight: "700",
          fontSize: "32px",
          lineHeight: "53.18px",
          color: "#141414",
          height: "53px",
          marginBottom: "20px",
        }}>
        Set New Password?
      </p>

      <Input.Password
        size="large"
        style={{ fontSize: "20px", width: "100%" }}
        placeholder="Password"
        required
      />

      <p
        style={{
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "27px",
          color: "#808080",
          width: "426px",
          height: "120px",
          marginTop: "20px",
        }}>
        *Your new password must be different from previously used password.
      </p>

      <Button
        size="large"
        style={{
          backgroundColor: "#058B94",

          fontWeight: "600",
          height: "50px",
          fontSize: "18px",
          color: "#ffffff",
          width: "100%",
          marginTop: "40px",
        }}>
        Reset Password
      </Button>
    </div>
  );
}

function ForgetPassword({ setForgetPassword, forgetPassword }) {
  const handleChangePassword = (e) => {
    e.preventDefault();
    setForgetPassword(!forgetPassword);
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <p
        style={{
          fontWeight: "700",
          fontSize: "32px",
          lineHeight: "53.18px",
          color: "#141414",
          height: "53px",
          marginBottom: "0",
        }}>
        Forgot Password?
      </p>
      <p
        style={{
          fontWeight: "400",
          fontSize: "24px",
          lineHeight: "40px",
          color: "#808080",
          width: "426px",
          height: "120px",
          marginTop: "3px",
        }}>
        An email has been sent to your registered email. <br />
        Follow the link to reset your password.
      </p>

      <Button
        onClick={handleChangePassword}
        size="large"
        style={{
          backgroundColor: "#058B94",

          fontWeight: "600",
          height: "50px",
          fontSize: "18px",
          color: "#ffffff",
          width: "100%",
          marginTop: "40px",
        }}>
        Done
      </Button>
    </div>
  );
}

function PasswordComponents({
  setForgetPassword,
  showPassword,
  forgetPassword,
}) {
  console.log(showPassword);
  return (
    <>
      {showPassword && forgetPassword == false && (
        <ForgetPassword
          setForgetPassword={setForgetPassword}
          forgetPassword={forgetPassword}
        />
      )}
      {forgetPassword && <NewPassword />}
    </>
  );
}

export default PasswordComponents;
