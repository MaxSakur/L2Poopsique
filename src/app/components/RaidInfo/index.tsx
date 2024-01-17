"use client";

import React, { FC, useEffect, useState } from "react";
import { CalendarItem } from "../../raid/types";
import { raidBossList } from "../../data/raidBossList";
import { getInfoData } from "../../raid/api";
import RaidBossInfo from "../RaidBossInfo";
import moment from "moment";
import { DATA_ITEM } from "../../api/raidData/route";

type RaidInfoProps = {
  activeItem?: CalendarItem;
};

export type RaidBossFullData = {
  lvl: number;
  name: string;
  start_time: moment.Moment;
  end_time: moment.Moment;
  drop: DATA_ITEM[];
};

const dataPlaceholder: RaidBossFullData = {
    lvl: 0,
    name: "",
    start_time: moment(),
    end_time: moment(),
    drop: []
}

const RaidInfo: FC<RaidInfoProps> = ({ activeItem }) => {
  const [data, setData] = useState<RaidBossFullData>(dataPlaceholder);

  useEffect(() => {
    if (activeItem) {
    
      setData((prev) => ({
        ...prev,
        start_time: activeItem.start_time,
        end_time: activeItem.end_time,
      }));
  
      const raidBoss = raidBossList.find((el) => el.name === activeItem.title);
      if (raidBoss) {
        const { lvl, name } = raidBoss;
        setData((prev) => ({ ...prev, lvl, name }));
      }
  
      (async () => {
        try {
          const dropData = await getInfoData(raidBoss?.drop);
          setData((prev) => ({ ...prev, drop: dropData }));
        } catch (error) {
          console.error("Failed to fetch drop data:", error);
        }
      })();
    }
  }, [activeItem]);
  

  return <RaidBossInfo data={data} id={activeItem?._id} />
};

export default RaidInfo;
