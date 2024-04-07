import { TableRowProps } from "@interfaces/tableComponent.interface";

const TableRow: React.FC<TableRowProps> = ({
  row,
  columns,
  rowIndex,
  isSelected,
  onRowClick,
}) => {
  return (
    <tr
      key={row.id}
      onClick={() => onRowClick && onRowClick(row)}
      className={isSelected ? "selected" : ""}
    >
      <td>{rowIndex + 1}</td>
      {columns.map((col) => {
        return (
          <td
            key={`${row.id}-${col.dataIndex}`}
            className={col.title === "Action" ? "status primary" : ""}
          >
            {col.render
              ? col.render(row.data[col.dataIndex], row, parseInt(row.id))
              : row.data[col.dataIndex].element ||
                row.data[col.dataIndex].value}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
