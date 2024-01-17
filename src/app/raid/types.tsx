import moment from "moment";

export type RaidResponse = {
    raidBosses: RaidResponseItem[];
  };
  
  export type RaidGroup = 1 | 2 | 3 | 4;
  
  export type RaidResponseItem = {
    _id: string;
    name: string;
    group: RaidGroup;
    respawnTimeStart: Date;
    respawnTimeEnd: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
  
  export type CalendarItem = {
    name: string;
    _id: string;
    id: number;
    group: RaidGroup;
    title: string;
    start_time: moment.Moment;
    end_time: moment.Moment;
  };