interface App {
  id: string;
  appName: string | React.ReactNode;
  developer: string;
  permissionCount: number;
  permissionSummary: string;
  lastAccessed: string;
}

interface AuditTrail {
  id: string;
  timestamp: string;
  actionPerformed: string;
  ip_device: string;
  result: string;
}
