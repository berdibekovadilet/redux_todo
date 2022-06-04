import React from "react";
import styles from "../styles/modules/title.module.scss";

const PageTitle = ({ children, ...rest }) => {
  return (
    <>
      <h1 className={styles.title} {...rest}>
        {children}
      </h1>
    </>
  );
};

export default PageTitle;
