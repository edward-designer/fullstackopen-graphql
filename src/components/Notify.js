import React from "react";

const Notify = ({ errorMessage }) => {
  if (errorMessage) return <div>{errorMessage}</div>;
  return null;
};

export default Notify;
