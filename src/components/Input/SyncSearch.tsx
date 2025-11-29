import React from "react";
import Styles from "./style/Style.module.css";
import SearchIcon from "@/assets/icons/Search";

function SyncSearch({
  placeholder = "Search here...",
}: {
  placeholder?: string;
}) {
  return (
    <div className={Styles.syncsearch}>
      <SearchIcon />
      <input type="search" placeholder={placeholder} />
    </div>
  );
}

export default SyncSearch;
