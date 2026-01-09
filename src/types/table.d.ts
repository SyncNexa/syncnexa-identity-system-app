interface DocumentTable {
  title: string;
  cells: DocumentTableCell[];
}

interface DocumentTableCell {
  id: string;
  title: string;
  status: {
    value: "VERIFIED" | "PENDING" | "REJECTED" | "NOT_UPLOADED";
    label: string;
  };
  replace?: (id: string) => void;
  view?: (id: string) => void;
  upload?: (id: string) => void;
}

interface TableHeader {
  key: string;
  label: string;
  render?: (value: any, row: any, rowIndex: number) => React.ReactNode;
}

interface TableProps {
  headers: TableHeader[];
  data: any[];
  rowKey?: string | ((row: any, index: number) => string);
  onRowClick?: (row: any, rowIndex: number) => void;
  className?: string;
}

// interface ConnectedApp {
//   id: string;
//   appName: string;
//   icon?: React.ReactNode;
//   developer: string;
//   permissionCount: number;
//   permissionSummary: string;
//   lastAccessed: string;
//   onAction?: (id: string, action: string) => void;
// }

// interface ConnectedAppsTable {
//   apps: ConnectedApp[];
//   onRowAction?: (appId: string, action: string) => void;
// }
