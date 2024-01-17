"use client";

import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import styles from "./AddNewRaid.module.css";
import SelectComponent from "../Select";
import { DefaultRaidBossInfo, raidBossList } from "@/app/data/raidBossList";
import moment from "moment";
import { setNewRespawn } from "@/app/raid/api";
import { useRouter } from "next/navigation";
import { CalendarItem } from "@/app/raid/types";

type AddRaidInfoProps = {
  data: CalendarItem[]
};

export type RaidRequestData = {
  name?: string;
  respawnTimeStart?: moment.Moment | null;
};

export enum DayPicker {
  today = "today",
  tomorrow = "tomorrow",
}

const AddRaidInfo: FC<AddRaidInfoProps> = ({data}) => {
  const router = useRouter();
  const [isOpened, setOpened] = useState<boolean>(false);
  const [finalized, setFinalized] = useState<boolean>(false);
  const [raidInfo, setRaidInfo] = useState<RaidRequestData>();
  const [day, setDay] = useState<DayPicker>(DayPicker.today);
  const formattedData = [
    { name: "", lvl: 0, type: 1, drop: "" } as DefaultRaidBossInfo,
    ...raidBossList,
  ].filter(item1 => 
    !data.some(item2 => item2.name === item1.name)
  )
  .map((el: DefaultRaidBossInfo) => ({
    label: el.name,
    value: el.name,
  }));

  useEffect(() => {
    setRaidInfo({})
  },[])

  const handleSetName = (el: string) =>
    setRaidInfo((prev) => ({ ...prev, name: el }));

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    const momentTime = day === DayPicker.today
    ? moment(timeValue, "HH:mm")
    : moment(timeValue, "HH:mm").add(1, "days");
    setRaidInfo((prev) => ({ ...prev, respawnTimeStart: momentTime }));
    setFinalized(true)
  };

  const handleAddNewRespawn = () => {
    if(raidInfo){
      setNewRespawn(raidInfo)
      setRaidInfo({
        name: '',
        respawnTimeStart: null
      })
      setOpened(false);
      setFinalized(false);
    }
    router.refresh();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={() => setOpened(!isOpened)}>
        <FaPlusCircle size={40} />
        <p>Press to add new Raid Tracker</p>
      </div>

      {isOpened && (
        <div className={styles.body}>
          <SelectComponent
            label={"Select Raid Boss"}
            options={formattedData}
            value={raidInfo?.name}
            onChange={handleSetName}
          />
        </div>
      )}

      {raidInfo?.name && (
        <div className={styles.body} style={{ flexDirection: "column" }}>
          <p>Next resp time:</p>
          <form onChange={(e:ChangeEvent<HTMLFormElement>)=>setDay(e.target.value)}>
            <div className={styles.radio}>
              {Object.keys(DayPicker).map((el, index) => {
                return (
                  <label key={index} className={day === el ? styles.radioActive: ''}>
                    <input type="radio" value={el} checked={day === el} />
                    {el}
                  </label>
                );
              })}
            </div>
          </form>
          
          <input
            type="time"
            className={styles.datePicker}
            onBlur={handleSetValue}
          />
        </div>
      )}

      {moment(raidInfo?.respawnTimeStart).isValid() && finalized && (
        <button className={styles.submitButton} onClick={handleAddNewRespawn}>SEND</button>
      )}
    </div>
  );
};

export default AddRaidInfo;
