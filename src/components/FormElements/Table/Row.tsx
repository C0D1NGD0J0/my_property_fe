export interface TableRowData {
  id: number;
  [key: string]: any; // Other dynamic keys
}

const TableRow: React.FC<{ row: TableRowData }> = ({ row }) => {
  return (
    <tr>
      <td>{row.id}</td>
      <td>{row.property}</td>
      <td>{row.status}</td>
      <td>{row.rent}</td>
      <td>{row.rentalType}</td>
      <td className="status primary">
        {/* Actions like view, edit can be added here */}
      </td>
    </tr>
  );
};

export default TableRow;
