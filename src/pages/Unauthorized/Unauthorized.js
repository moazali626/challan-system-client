import React from "react";
import UnauthorizedCSS from "./Unauthorized.module.scss";
import unauthorizedImg from "../../images/unauthorized.png";

const Unauthorized = () => {
  return (
    <div className={UnauthorizedCSS.container}>
      <img
        className={UnauthorizedCSS.img}
        src={unauthorizedImg}
        alt="unauthorized"
      />
    </div>
  );
};

export default Unauthorized;
