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
      {columns.map((col) => (
        <>
          <td
            key={`${row.id}-${col.dataIndex}`}
            className={col.title === "Action" ? "status primary" : ""}
          >
            {col.render
              ? col.render(row[col.dataIndex], row, parseInt(row.id))
              : row[col.dataIndex]}
          </td>
        </>
      ))}
    </tr>
  );
};

export default TableRow;
