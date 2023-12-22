import React, { useState, useEffect } from "react";

import styles from "../PopupNotification/PopupNotification.module.css";
export const PopupNotification = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => Math.max(prevProgress - 1, 0));
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (progress === 0) {
      onClose();
    }
  }, [progress, onClose]);

  const handleClick = () => {
    onClose();
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupNotification} onClick={handleClick}>
        <div>{message}</div>
      </div>
      <div className={styles.progressBarWrapper}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
