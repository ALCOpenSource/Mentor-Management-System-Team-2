import React from "react";
import Image from "next/image";

function SplashScreen() {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Image
          src="/assets/images/logo.png"
          width="224.27px"
          height="200px"
          alt="site_logo"
        />
      </div>
      <p
        style={{
          fontWeight: "700",
          fontSize: "32px",
          lineHeight: "53.18px",
          color: "#ffffff",
        }}>
        Mentor Management System
      </p>
    </div>
  );
}

export default SplashScreen;
