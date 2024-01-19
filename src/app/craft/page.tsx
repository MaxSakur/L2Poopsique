'use client'

import { ToastContainer } from 'react-toastify';
import styles from "./raid.module.css";
import '../../../node_modules/react-toastify/dist/ReactToastify.css'
import CraftCalculator from "../components/CraftCalculator";

export default function Craft() {

  return (
    <main className={styles.main}>
      <ToastContainer/>
      <CraftCalculator/>
    </main>
  );
}
