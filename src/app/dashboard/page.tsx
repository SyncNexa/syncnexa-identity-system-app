"use client";
import Stroke from "@/components/Stroke/Stroke";
import Image from "next/image";
import "../globals.css";
import SyncSearch from "@/components/Input/SyncSearch";
import styles from "@/app/dashboard/overview/style/style.module.css";
import HelpIcon from "@/assets/icons/Help";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";

function MainPanel() {
  const { toggleOpen } = useCustomNavigation();
  return (
    <section className={styles.top_area}>
      <div className={styles.top_area_left}>
        <Image
          src={"/logo.svg"}
          alt="SyncNexa logo"
          width={100}
          height={20}
          quality={100}
          priority
        />
        <h2>SyncNexa</h2>
      </div>
      <div className={styles.small_view}>
        <div></div>
        <button className={styles.menu_btn} onClick={toggleOpen}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <Stroke direction="vertical" color="var(--color-border)" size={1} />
      <div className={styles.top_area_right}>
        <SyncSearch />
        <div className={styles.top_area_right_right}>
          <button className={styles.green_button}>
            <HelpIcon width={15} height={15} />
            HELP
          </button>
        </div>
      </div>
    </section>
  );
}

export default MainPanel;
