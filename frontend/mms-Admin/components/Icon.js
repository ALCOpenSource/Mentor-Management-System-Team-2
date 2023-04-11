import React from "react";
import Image from "next/image"

function Icon({ icon , height, width}) {

    console.log(icon)
  return <Image src={icon} width={width} height={height} />;
}

export default Icon;
