import React, { FC } from "react";
import styles from "./RaidBossInfo.module.css";
import { RaidBossFullData } from "../RaidInfo";
import { DATA_ITEM } from "@/app/api/raidData/route";
import { DefaultRaidBossInfo, raidBossList } from "@/app/data/raidBossList";
import { deleteInfoData } from "@/app/raid/api";
import { useRouter } from "next/navigation";
import Column from "../Column";
import RaidBossInfoHeader from "./RaidBossInfoHeader";
import Divider from "../Divider";

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
   
      <Column header={<RaidBossInfoHeader data={data} baseInfo={baseInfo}/>} footer={<button className={styles.deleteButton} onClick={handleDeleteItem}>DELETE</button>}>
      <Divider text="Drop List">
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
      </Divider>
      </Column>
  ) : null;
};

export default RaidBossInfo;
