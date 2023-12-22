import { CSSProperties } from "react";

export interface TableComponentProps {
  data: TableRowData[];
  style?: CSSProperties;
  columns: TableColumn[];
  showCheckbox?: boolean;
  displayHeaderSection: boolean;
  onRowClick?: (rowData: TableRowData) => void;
  customFilter?: (row: TableRowData) => boolean;
  filterOptions: { label: string; value: string }[] | [];
}

export interface TableColumn {
  title: string;
  dataIndex: string;
  showSorterIcon?: boolean;
  sorter?: (a: TableRowData, b: TableRowData) => number;
  columSorter?: (a: TableRowData, b: TableRowData) => number;
  render?: (text: any, record: TableRowData, index: number) => React.ReactNode;
}

export interface TableHeaderProps {
  searchQuery: string;
  filterValue: string;
  setSearchQuery: (query: string) => void;
  onFilterChange: (filter: string) => void;
  filterOptions: { label: string; value: string }[] | [];
}

export interface TableRowData {
  id: number;
  [key: string]: any; // Other dynamic keys
}

export interface TableRowProps {
  row: TableRowData;
  rowIndex: number;
  isSelected: boolean;
  columns: TableColumn[];
  onRowClick?: (rowData: TableRowData) => void;
}
