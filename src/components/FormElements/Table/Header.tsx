import React, { ReactNode, useState, useEffect } from "react";
import { Select, FormInput } from "@components/FormElements";
import useDebounce from "@hooks/useDebounce";
import { TableHeaderProps } from "@interfaces/tableComponent.interface";

const TableHeader: React.FC<TableHeaderProps> = ({
  searchQuery,
  filterValue,
  filterOptions,
  setSearchQuery,
  onFilterChange,
}) => {
  const [query, setQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      //update external query state with debounced value
      setSearchQuery(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <div className="table-header">
      <div className="search-bar">
        <FormInput
          required
          value={query}
          name="query"
          type="search"
          disabled={false}
          placeholder="Search..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn">
          <i className="bx bx-search"></i>
        </button>
      </div>

      {filterOptions?.length && (
        <div className="filter-options">
          <Select
            name="filter"
            value={filterValue}
            placeholder="All"
            className="filter-select"
            onChange={(field, value) => {
              onFilterChange(value);
            }}
            options={filterOptions}
          />
        </div>
      )}
    </div>
  );
};

export default TableHeader;
