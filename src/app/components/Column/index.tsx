import React, { FC, ReactElement } from "react";
import styles from "./Column.module.css";

type ColumnProps = {
  header?: ReactElement;
  footer?: ReactElement;
  children: ReactElement | ReactElement[];
};

const Column: FC<ColumnProps> = ({ header, footer, children }) => {
  return (
    <div className={styles.container}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Column;
