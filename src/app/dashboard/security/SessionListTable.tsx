"use client";
import SyncButton from "@/components/Button";
import Table from "@/components/Tables/Table";
import React from "react";

function SessionListTable() {
  const sessionList: Session[] = [
    {
      id: "1",
      device: "This Device   •  Chrome on Windows",
      ip: "102.89.xxx.xxx • Lagos, NG",
      lastActivity: "Just Now",
    },
    {
      id: "2",
      device: "iPhone 13     •  Safari on iOS",
      ip: "41.58.xxx.xxx • Abuja, NG",
      lastActivity: "2 hours ago",
    },
    {
      id: "3",
      device: "iPhone 13     •  Safari on iOS",
      ip: "41.58.xxx.xxx • Abuja, NG",
      lastActivity: "2 hours ago",
    },
    {
      id: "4",
      device: "iPhone 13     •  Safari on iOS",
      ip: "41.58.xxx.xxx • Abuja, NG",
      lastActivity: "2 hours ago",
    },
  ];
  const tableHeaders = [
    { key: "device", label: "Device" },
    { key: "ip", label: "IP Address" },
    { key: "lastActivity", label: "Last activity" },

    {
      key: "id",
      label: "Action",
      render: (value: any, row: any) => (
        <SyncButton variant="light" color="red" label="Log Out" />
      ),
    },
  ];
  return <Table headers={tableHeaders} data={sessionList} rowKey="id" />;
}

export default SessionListTable;
