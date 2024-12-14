import { useState } from 'react'; // esto se agrego inicia
// Importa useState para manejar el estado de la paginación
// esto se agrego final

interface Column<T> {
  header: string;
  key: keyof T;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

function Table<T>({ columns, data }: TableProps<T>) {
  // esto se agrego inicia
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const itemsPerPage = 10; // Número máximo de elementos por página

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Generar un rango de páginas para mostrar en la paginación
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // esto se agrego final

  return (
    <div className="border border-gray-200">
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
        {currentData.map((row, rowIndex) => (
          <tr
            key={startIndex + rowIndex}
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

      {/* esto se agrego inicia */}
      {/* Controles de Paginación */}
      <div className="flex justify-between items-center py-2 px-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Anterior
        </button>

        <div className="flex space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageClick(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Siguiente
        </button>
      </div>
      {/* esto se agrego final */}
    </div>
  );
}

export default Table;
