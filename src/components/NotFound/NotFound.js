import React from "react";
import NotFoundImg from "../../images/404.jpeg";
import NotFoundCSS from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={NotFoundCSS.container}>
      <img src={NotFoundImg} alt="404" style={{ width: "50vw" }} />
    </div>
  );
};

export default NotFound;
