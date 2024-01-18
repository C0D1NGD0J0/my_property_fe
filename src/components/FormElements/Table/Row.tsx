import { TableRowProps } from "@interfaces/tableComponent.interface";

const TableRow: React.FC<TableRowProps> = ({
  row,
  columns,
  isSelected,
  onRowClick,
}) => {
  return (
    <tr
      onClick={() => onRowClick && onRowClick(row)}
      className={isSelected ? "selected" : ""}
    >
      {columns.map((col) => (
        <td
          key={`${row.id}-${col.dataIndex}`}
          className={col.title === "Action" ? "status primary" : ""}
        >
          {col.render
            ? col.render(row[col.dataIndex], row, row.id)
            : row[col.dataIndex]}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
