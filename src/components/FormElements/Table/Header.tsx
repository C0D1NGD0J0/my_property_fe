import Select from "../Select";

export interface TableHeaderProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  onSearch,
  onFilterChange,
}) => {
  return (
    <div className="table-header">
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-btn">
          <i className="bx bx-search"></i>
        </button>
      </div>
      <div className="filter-options">
        <Select
          name="filter"
          value={""}
          placeholder="All"
          className="filter-select"
          onChange={onFilterChange}
          options={[
            { label: "All", value: "all" },
            { label: "Vacant", value: "vacant" },
            { label: "Occupied", value: "occupied" },
          ]}
        />
      </div>
    </div>
  );
};

export default TableHeader;
