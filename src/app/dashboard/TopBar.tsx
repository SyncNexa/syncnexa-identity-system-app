import HelpIcon from "@/assets/icons/Help";
import { SyncSearch } from "@/components/Input";
import Stroke from "@/components/Stroke/Stroke";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";
import Image from "next/image";
import React from "react";
import styles from "@/app/dashboard/overview/style/style.module.css";

function TopBar() {
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

export default TopBar;
