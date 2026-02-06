"use client";
import SyncButton from "@/components/Button";
import Loading from "@/components/Loading/Loading";
import Table from "@/components/Tables/Table";
import { API_ROUTES } from "@/routes/paths";
import React, { useEffect, useState } from "react";

function SessionListTable() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(API_ROUTES.USER_SECURITY);
        if (res.ok) {
          const result = await res.json();
          const sessionData = (result.data.sessions || []).map(
            (session: SessionInfo) => ({
              id: session.id,
              device: `${session.device_name || "Unknown Device"} • ${session.browser || "Unknown Browser"}`,
              ip: `${session.ip_address || "Unknown"} • ${session.location || "Unknown"}`,
              lastActivity: new Date(session.last_activity).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
              ),
            }),
          );
          setSessions(sessionData);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const tableHeaders = [
    { key: "device", label: "Device" },
    { key: "ip", label: "IP Address" },
    { key: "lastActivity", label: "Last activity" },
    {
      key: "id",
      label: "Action",
      render: (value: any, row: any) => (
        <SyncButton
          variant="light"
          color="red"
          label="Log Out"
          onClick={() => {}}
        />
      ),
    },
  ];

  if (loading) {
    return <Loading size="medium" />;
  }

  return <Table headers={tableHeaders} data={sessions} rowKey="id" />;
}

export default SessionListTable;
