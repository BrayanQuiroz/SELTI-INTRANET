
interface Column<T> {
  header: string;
  key: keyof T;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

function Table<T>({ columns, data }: TableProps<T>) {
  return (
    <div className=" border border-gray-200 ">
      <table className="min-w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              scope="col"
              className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              {col.header}
            </th>
          ))}
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="hover:bg-gray-50 transition-colors duration-150"
          >
            {columns.map((col) => (
              <td
                key={String(col.key)}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
              >
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
