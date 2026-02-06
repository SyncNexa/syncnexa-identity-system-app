"use client";

import React from "react";
import styles from "./styles/Table.module.css";

const Table: React.FC<TableProps> = ({
  headers,
  data,
  rowKey = "id",
  onRowClick,
  className = "",
}) => {
  const getRowKey = (row: any, index: number): string => {
    if (typeof rowKey === "function") {
      return rowKey(row, index);
    }
    return row[rowKey] || `row-${index}`;
  };

  const getCellValue = (
    row: any,
    header: TableHeader,
    rowIndex: number
  ): React.ReactNode => {
    if (header.render) {
      return header.render(row[header.key], row, rowIndex);
    }
    return row[header.key];
  };

  const renderCellContent = (content: React.ReactNode): React.ReactNode => {
    // Check if content is a React element
    if (React.isValidElement(content)) {
      return content;
    }
    // Wrap strings and primitives in a p tag
    return <p className={styles.cell_content}>{content}</p>;
  };

  return (
    <div className={`${styles.table_container} ${className}`}>
      {/* Header Row */}
      <div className={styles.header_row}>
        {headers.map((header) => (
          <div key={header.key} className={styles.header_cell}>
            <p className={styles.header_text}>{header.label}</p>
          </div>
        ))}
      </div>

      {/* Data Rows */}
      {data.map((row, rowIndex) => (
        <div
          key={getRowKey(row, rowIndex)}
          className={styles.data_row}
          onClick={() => onRowClick?.(row, rowIndex)}
        >
          {headers.map((header) => (
            <div key={header.key} className={styles.data_cell}>
              {renderCellContent(getCellValue(row, header, rowIndex))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
