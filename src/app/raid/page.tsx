import Calendar from "../components/RaidCalendar";
import { getRaids } from "./api";
import { ToastContainer } from 'react-toastify';
import { RaidResponse } from './types';
import styles from "./raid.module.css";
import '../../../node_modules/react-toastify/dist/ReactToastify.css'

export default async function Raid() {
  const raidBossResponse: RaidResponse | undefined = await getRaids();
  return (
    <main className={styles.main}>
      <ToastContainer/>
      <Calendar data={raidBossResponse}/>
    </main>
  );
}
