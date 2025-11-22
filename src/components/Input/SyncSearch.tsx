import React from "react";
import Styles from "./style/Style.module.css";

function SyncSearch({
  placeholder = "Search here...",
}: {
  placeholder?: string;
}) {
  return (
    <div className={Styles.syncsearch}>
      <span></span>
      <input type="search" placeholder={placeholder} />
    </div>
  );
}

export default SyncSearch;
