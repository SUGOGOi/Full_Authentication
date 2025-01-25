import React from "react";
import style from "./page.module.scss";
const Loading = () => {
  return (
    <div className={style.loadingCon}>
      <div className={style.spinner}></div>
    </div>
  );
};

export default Loading;
