// DinoTracker.js

import React, { FC, useState } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import styles from "./DinoTracker.module.css";
import DinoCounter from "../DinoCounter";

type DinoTrackerProps = {};

const DinoTracker: FC<DinoTrackerProps> = () => {
  const [counters, setCounters] = useState<Array<number>>([]);

  const handleAddNewCounter = () => {
    if (counters.length <= 4) {
      setCounters([...counters, 5]);
    }
  };

  const handleRemoveCounter = (index: number) => {
    const newCounters = [...counters];
    newCounters.splice(index, 1);
    setCounters(newCounters);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={handleAddNewCounter}>
          <FaPlusCircle size={40} />
        </div>

        <p>Press to add dino counter</p>

        {counters.length > 0 && (
          <div onClick={() => handleRemoveCounter(counters.length - 1)}>
            <FaTrash size={40} />
          </div>
        )}
      </div>
      {counters.map((minutes, index) => (
        <DinoCounter key={index} index={index} minutes={minutes} />
      ))}
    </div>
  );
};

export default DinoTracker;
