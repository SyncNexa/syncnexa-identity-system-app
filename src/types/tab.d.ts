interface TabHeader {
  id?: string;
  label: string;
  value: string;
}

interface TabContent {
  id?: string;
  value: string;
  content: React.ReactNode;
}

interface Tab {
  headers: TabHeader[];
  contents: TabContent[];
  defaultTab?: string;
}
