"use client";

import { FC, useEffect, useState } from "react";
import "react-calendar-timeline/lib/Timeline.css";
import Timeline, { Id, TodayMarker } from "react-calendar-timeline";
import moment from "moment";
import { CalendarItem, RaidResponseItem } from "../../raid/types";
import RaidInfo from "../RaidInfo";
import AddRaidInfo from "../AddNewRaid";
import DinoTracker from "../DinoTracker";
import { sendMessageToTelegram } from "@/app/raid/api";



const baseSettings = {
  canMove: false,
  canResize: false,
  canChangeGroup: false,
};

// DISABLE WARNING react-calendar-timeline
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const groups = [
  {
    id: 1,
    title: "ALL",
    ...baseSettings,
  },
  { id: 2, title: "ALLIANCE", ...baseSettings },
  { id: 3, title: "SUB-CLASS", ...baseSettings },
  { id: 4, title: "NOBLESSE", ...baseSettings },
];

type CalendarProps = {
  data?: {raidBosses: RaidResponseItem[]};
};

const Calendar: FC<CalendarProps> = ({ data }) => {
  const [items, setItems] = useState<CalendarItem[]>([]);
  const [activeRaidIndex, setActiveRaidIndex] = useState<Id | null>(null);

  useEffect(() => {
    if (data) {
      setItems(
        data.raidBosses.map((el, index) => ({
          ...el,
          _id: el._id,
          id: index + 1,
          group: el.group,
          title: el.name,
          start_time: moment(new Date(el.respawnTimeStart).toISOString()),
          end_time: moment(new Date(el.respawnTimeEnd).toISOString()).add(
            1,
            "hour"
          ),
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      items.forEach(item => {
        const itemStart = moment(item.start_time);
        const tenMinutesBeforeStart = itemStart.subtract(10, 'minutes');

        if (now.isSame(tenMinutesBeforeStart, 'minute')) {
          sendMessageToTelegram(`Начало респа РБ ${item.name} начнется через через 10 минут`);
        }
      });
    }, 60000);
  
    return () => clearInterval(interval);
  }, [items]);

  console.log('items', items);
  console.log('data', data);

  return (
    <>
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-6, "hour")}
      defaultTimeEnd={moment().add(6, "hour")}
      visibleTimeStart={moment().add(-12, "hour").valueOf()}
      visibleTimeEnd={moment().add(12, "hour").valueOf()}
      onItemSelect={(id) => setActiveRaidIndex(id)}
      >
      <TodayMarker date={new Date()}>
        {({ styles }) => {
          const customStyles = {
            ...styles,
            backgroundColor: "deeppink",
            width: "4px",
          };
          return <div style={customStyles} />;
        }}
      </TodayMarker>
    </Timeline>

    <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 16}}>
      <RaidInfo activeItem={items.find(el=> el.id === activeRaidIndex)}/>
      <AddRaidInfo data={items}/>
      <DinoTracker />
    </div>
    </>
  );
};

export default Calendar;
