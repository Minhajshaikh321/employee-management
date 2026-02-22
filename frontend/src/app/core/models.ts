export interface Employee {
  id?: number;
  name: string;
  email: string;
  department: string;
  role: string;
  doj: string;
}

export interface EmployeeListResponse {
  results: Employee[];
  count: number;
  num_pages: number;
  current_page: number;
}

export interface TokenPair {
  access: string;
  refresh: string;
}
