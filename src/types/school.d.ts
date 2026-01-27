interface SchoolList {
  availableRegions: string[];
  availableCountries: string[];
  count: number;
  items: School[];
}

interface School {
  label: string;
  value: string;
  short: string;
  code: string;
  country: string;
  countryCode: string;
  region: string;
}

interface FacultyList {
  institutionCode: string;
  count: number;
  faculties: Faculty[];
}

interface Faculty {
  code: string;
  name: string;
  departments: string[];
}
