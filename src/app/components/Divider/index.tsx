import styles from "./Divider.module.css";
import React, { FC, ReactNode } from "react";

type Props = {
  text?: string;
  children?: ReactNode;
  style?: string;
};

const Divider: FC<Props> = ({ text, children, style }) => {
  const conditionalStyles = style
    ? `${styles.dividerBody} ${style}`
    : styles.dividerBody;
  return (
    <div className={styles.dividerContainer}>
      <div className={styles.dividerLabel}>
        {text && <p className={styles.dividerText}>{text}</p>}
      </div>
      <div className={conditionalStyles}>{children}</div>
    </div>
  );
};

export default Divider;
