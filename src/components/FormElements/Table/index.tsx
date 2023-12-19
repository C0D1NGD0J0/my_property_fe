import React, { useState, useMemo } from "react";
import TableRow, { TableRowData } from "./Row";
import TableHeader from "./Header";

interface TableComponentProps {
  data: TableRowData[];
  columns: TableColumn[];
  showCheckbox?: boolean;
  onRowClick?: (rowData: TableRowData) => void;
}

export interface TableColumn {
  title: string;
  icon?: boolean;
  dataIndex: string;
  render?: (text: any, record: TableRowData, index: number) => React.ReactNode;
  sorter?: (a: TableRowData, b: TableRowData) => number;
}

// TableComponent
const TableComponent: React.FC<TableComponentProps> = ({
  data,
  columns,
  onRowClick,
  showCheckbox = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [displayHeader, setDisplayHeader] = useState<boolean>(false);
  const [filter, setFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const filteredData = useMemo<TableRowData[]>(() => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter((row) =>
        row.property.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (filter !== "all") {
      filtered = filtered.filter((row) => row.status === filter);
    }

    if (sortConfig) {
      const sorter = columns.find((col) => col.dataIndex === sortConfig.key)
        ?.sorter;
      if (sorter) {
        filtered = [...filtered].sort(sorter);
      } else {
        // Fallback to basic sorting if no sorter function is provided
        filtered = [...filtered].sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key])
            return sortConfig.direction === "ascending" ? -1 : 1;
          if (a[sortConfig.key] > b[sortConfig.key])
            return sortConfig.direction === "ascending" ? 1 : -1;
          return 0;
        });
      }
    }

    return filtered;
  }, [data, searchQuery, filter, sortConfig]);

  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleRowSelect = (id: number) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(id)) {
        newSelectedRows.delete(id);
      } else {
        newSelectedRows.add(id);
      }
      return newSelectedRows;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allRowIds = new Set(filteredData.map((row) => row.id));
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const dir = sortConfig?.direction === "ascending" ? "up" : "down";
  const modifiedColumns: TableColumn[] = showCheckbox
    ? [
        {
          title: "Select",
          dataIndex: "selection",
          render: (_, record) => (
            <input
              type="checkbox"
              checked={selectedRows.has(record.id)}
              onChange={() => handleRowSelect(record.id)}
            />
          ),
        },
        ...columns, // Include other columns
      ]
    : columns;

  return (
    <div className="table-container">
      {displayHeader && (
        <TableHeader onSearch={setSearchQuery} onFilterChange={setFilter} />
      )}
      <table className="table">
        <thead>
          <tr>
            {showCheckbox && ( // Conditionally render checkbox column header
              <th key="selection">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedRows.size === filteredData.length &&
                    filteredData.length > 0
                  }
                  disabled={filteredData.length === 0}
                />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.dataIndex}>
                <div className="th-content-box">
                  {col.title}
                  {col.icon && (
                    <span
                      role="button"
                      className="filter-icon"
                      onClick={() => handleSort(col.dataIndex)}
                    >
                      <i className={`bx bx-caret-${dir}`}></i>
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => {
            return (
              <tr
                key={row.id}
                onClick={() => onRowClick && onRowClick(row)}
                className={selectedRows.has(row.id) ? "selected" : ""}
              >
                {modifiedColumns.map((col) => {
                  return (
                    <td key={col.dataIndex}>
                      {col.render
                        ? col.render(row[col.dataIndex], row, rowIndex)
                        : row[col.dataIndex]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
