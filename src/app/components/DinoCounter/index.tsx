// DinoCounter.js

import React, { FC, useEffect, useState } from "react";
import styles from "./DinoCounter.module.css";
import { FaRedo } from "react-icons/fa";
import Image from "next/image";
import tyrosIcons from '@/assets/tyros.webp'

type DinoCounterProps = {
  minutes: number; 
  index: number;
};

const DinoCounter: FC<DinoCounterProps> = ({ index, minutes }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(minutes * 60);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, secondsLeft]);

  const handleReset = () => {
    setSecondsLeft(minutes * 60);
    setIsActive(true);
  };

  return (
    <div className={styles.counter}>
      <div className={styles.tyros}>
        <Image alt="Tyros image" src={tyrosIcons} className={styles.image}/>
        <p>{index + 1}</p>
      </div>
      
      <div className={styles.time}>
        {Math.floor(secondsLeft / 60)}:{secondsLeft % 60 < 10 ? "0" : ""}
        {secondsLeft % 60}
      </div>

      <div className={styles.buttons}>
        <button onClick={handleReset} className={styles.reset}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export default DinoCounter;
