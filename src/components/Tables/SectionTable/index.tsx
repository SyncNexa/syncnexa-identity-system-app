import Tooltip from "@/components/Tooltip";
import React from "react";
import styles from "./styles/SectionTable.module.css";
import Info from "@/assets/icons/Info";

interface SectionTableProps {
  title: string;
  info?: string;
  cells: Array<{
    header: string;
    label: string;
    rightNode?: React.ReactNode;
  }>;
  footer?: React.ReactNode;
}
function SectionTable({ title, info, cells, footer }: SectionTableProps) {
  return (
    <section className={styles.section_table}>
      <div className={styles.header}>
        <p>{title}</p>
        {info && (
          <Tooltip
            content={info}
            position="right"
            node={<Info />}
            className={styles.tooltip}
          />
        )}
      </div>
      {cells.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className={styles.wrapper}>
          {cells.map((cell, index) => (
            <div key={index} className={styles.cell}>
              <div className={styles.left}>
                <small>{cell.header}</small>
                <p>{cell.label}</p>
              </div>
              {cell.rightNode}
            </div>
          ))}
          {footer && <div>{footer}</div>}
        </div>
      )}
    </section>
  );
}

export default SectionTable;
