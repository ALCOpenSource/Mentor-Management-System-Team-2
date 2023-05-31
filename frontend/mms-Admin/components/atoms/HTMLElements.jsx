import React from "react";

export const FlexContainer = ({ className, children }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export const Section = ({ className, children }) => {
  return <section className={className}>{children}</section>;
};
