import React from 'react';
import { Link } from 'react-router-dom';

export const DataTable = ({ columns, data }) => {
  const getValue = (row, accessor) => {
    // Handle nested properties like category.name
    if (accessor.includes('.')) {
      const keys = accessor.split('.');
      return keys.reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : '', row);
    }
    return row[accessor];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {column.render
                    ? column.render(row)
                    : column.accessor === 'amount'
                    ? new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                      }).format(row[column.accessor])
                    : getValue(row, column.accessor)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
