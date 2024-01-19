import React, { FC } from "react";
import styles from "./RaidBossInfo.module.css";
import { RaidBossFullData } from "../RaidInfo";
import moment from "moment";
import Image from "next/image";
import { generateRBPathByName } from "@/assets/raidBosses";
import { calculateTimeRemaining, replaceNpcWithLoc } from "@/utils";
import { DefaultRaidBossInfo } from "@/app/data/raidBossList";

type Props = {
  data: RaidBossFullData;
  baseInfo: DefaultRaidBossInfo;
};

const RaidBossInfoHeader: FC<Props> = ({ data, baseInfo }) => {
  return (
    <div className={styles.raidBossInfoHeader}>
      <Image
        className={styles.raidImage}
        src={generateRBPathByName(data.name)}
        alt="Raid Boss image"
      />
      <div className={styles.headerInfo}>
        <div className={styles.nameLvl}>
          <span className={styles.level}>Lv. {data.lvl}</span>
          <span className={styles.name}>{data.name}</span>
        </div>
        <>
          <span className={styles.respawn}>
            Respawn{" "}
            {moment().isSame(data.start_time, "day")
              ? "Today"
              : moment(data.start_time).format("DD.MM")}
            {" at "}
            {moment(data.start_time).format("HH:mm")}
          </span>
        </>

        <>
          <span className={styles.respawn}>
            Remain {calculateTimeRemaining(data.start_time)}
          </span>
        </>
        {baseInfo && (
          <a
            className={styles.location}
            href={replaceNpcWithLoc(baseInfo.drop)}
            target="_blank"
          >
            Show location
          </a>
        )}
      </div>
    </div>
  );
};

export default RaidBossInfoHeader;
