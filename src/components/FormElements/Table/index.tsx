import React, { useState, useMemo, useEffect } from "react";
import TableRow from "./Row";
import TableHeader from "./Header";
import {
  TableColumn,
  TableComponentProps,
  TableRowData,
} from "@interfaces/tableComponent.interface";
import Pagination from "@components/FormElements/Table/Pagination";

// TableComponent
const TableComponent: React.FC<TableComponentProps> = ({
  data,
  columns,
  onRowClick,
  customFilter,
  filterOptions,
  style,
  pagination,
  showCheckbox = false,
  displayHeaderSection = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const filteredData = useMemo<TableRowData[]>(() => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter((row) => {
        return row.data.property
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    }

    if (filter !== "all") {
      filtered = filtered.filter((row) => {
        return row.data.status.value === filter;
      });
    }

    if (customFilter) {
      filtered = filtered.filter(customFilter);
    }

    if (sortConfig) {
      const column = columns.find((col) => col.dataIndex === sortConfig.key);
      const sorter =
        column?.columSorter ||
        ((a, b) => {
          if (a.data[sortConfig.key] < b.data[sortConfig.key])
            return sortConfig.direction === "ascending" ? -1 : 1;
          if (a.data[sortConfig.key] > b.data[sortConfig.key])
            return sortConfig.direction === "ascending" ? 1 : -1;
          return 0;
        });
      filtered = [...filtered].sort(sorter);
    }

    return filtered;
  }, [data, searchQuery, filter, sortConfig?.direction, customFilter, columns]);

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

  const handleRowSelect = (id: string) => {
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

  const direction = sortConfig?.direction === "ascending" ? "up" : "down";

  const visibleColumns = useMemo(() => {
    return columns.filter((col) => {
      return !col.hidden;
    });
  }, [columns]);

  const modifiedColumns: TableColumn[] = useMemo(() => {
    return showCheckbox
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
          ...visibleColumns, // Include other columns
        ]
      : visibleColumns;
  }, [visibleColumns]);

  return (
    <div className="table-container">
      {displayHeaderSection && (
        <TableHeader
          filterValue={filter}
          searchQuery={searchQuery}
          onFilterChange={setFilter}
          filterOptions={filterOptions}
          setSearchQuery={setSearchQuery}
        />
      )}
      <table className="table" style={style}>
        <thead>
          <tr>
            <th>#</th>
            {showCheckbox && ( // Conditionally render checkbox column header
              <th key="selection">
                <input
                  type="checkbox"
                  name="selectAll"
                  onChange={handleSelectAll}
                  checked={
                    selectedRows.size === filteredData.length &&
                    filteredData.length > 0
                  }
                  disabled={filteredData.length === 0}
                />
              </th>
            )}
            {columns.map((col) => {
              return !col.hidden ? (
                <th key={col.dataIndex}>
                  <div className="th-content-box">
                    {col.title}
                    {col.showSorterIcon && (
                      <span
                        role="button"
                        className="filter-icon"
                        onClick={() => handleSort(col.dataIndex)}
                      >
                        <i className={`bx bx-caret-${direction}`}></i>
                      </span>
                    )}
                  </div>
                </th>
              ) : null;
            })}
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((row, rowIndex) => {
              return (
                <TableRow
                  row={row}
                  key={row.id}
                  rowIndex={rowIndex}
                  onRowClick={onRowClick}
                  columns={modifiedColumns}
                  isSelected={selectedRows.has(row.id)}
                />
              );
            })}
        </tbody>
      </table>
      <div className="table-footer">
        <Pagination
          onPageChange={pagination?.onPageChange}
          currentPage={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages}
          hasMoreResource={pagination?.hasMoreResource || false}
        />
      </div>
    </div>
  );
};

export default TableComponent;
