import Calendar from "../components/RaidCalendar";
import { getRaids } from "./api";
import { RaidResponse } from './types';
import styles from "./raid.module.css";


export default async function Raid() {
  const raidBossResponse: RaidResponse | undefined = await getRaids();
  return (
    <main className={styles.main}>
      <Calendar data={raidBossResponse}/>
    </main>
  );
}
