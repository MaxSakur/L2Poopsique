import React, { FC } from "react";
import styles from "./RaidBossInfo.module.css";
import { RaidBossFullData } from "../RaidInfo";
import moment from "moment";
import { DATA_ITEM } from "@/app/api/raidData/route";
import Image from "next/image";
import { generateRBPathByName } from "@/assets/raidBosses";
import { calculateTimeRemaining, replaceNpcWithLoc } from "@/utils";
import { DefaultRaidBossInfo, raidBossList } from "@/app/data/raidBossList";
import { deleteInfoData } from "@/app/raid/api";
import { useRouter } from "next/navigation";

type RaidBossInfoProps = {
  data: RaidBossFullData;
  id?: string;
};

const RaidBossInfo: FC<RaidBossInfoProps> = ({
  data = {} as RaidBossFullData,
  id }) => {
  const baseInfo:DefaultRaidBossInfo = raidBossList.filter(el=>el.name === data.name)[0];
  const router = useRouter();

  const handleDeleteItem = async () => {
    try {
      const res = await deleteInfoData(id)
      if(res.success) {
        router.refresh();
      } 
    } catch (error) {
      console.log(error);
    }

  }

  return data.name ? (
    <div className={styles.container}>
      <div className={styles.header}>
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
              Respawn {moment().isSame(data.start_time, "day")
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
          {baseInfo && <a className={styles.location} href={replaceNpcWithLoc(baseInfo.drop)} target="_blank">Show location</a>}
        </div>
      </div>

      <div className={styles.divider}>
        <strong className={styles.level}>Drop List</strong>
      </div>
      <div className={styles.dropList}>
        <ul>
          {data.drop &&
            data.drop.map((item: DATA_ITEM, index: number) => (
              <li key={index}>
                <p>{item.itemName}</p>
                <p>{item.dropChance}</p>
              </li>
            ))}
        </ul>
      </div>

      <button onClick={handleDeleteItem} className={styles.location}>DELETE</button>
    </div>
  ) : null;
};

export default RaidBossInfo;
