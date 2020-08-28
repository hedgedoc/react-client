import React from 'react'

export interface CsvTableProps {
  index: number
  code: string
  delimiter: string
  showHeader: boolean
  tableRowClassName?: string
  tableColumnClassName?: string
}

const parseCsvToRowsAndColumn = (csvText: string, csvColumnDelimiter: string): string[][] => {
  const rows = csvText.split('\n');
  if (!rows || rows.length === 0) {
    return [];
  }

  return rows.map(row => row.split(csvColumnDelimiter));
}

export const CsvTable: React.FC<CsvTableProps> = ({ index, code, delimiter, showHeader, tableRowClassName, tableColumnClassName}) => {

  const rowsWithColumns = parseCsvToRowsAndColumn(code.trim(), delimiter);
  let headerRow: string[] = [];
  if (showHeader) {
    headerRow = rowsWithColumns.splice(0, 1)[0];
  }

  const renderTableHeader = (row: string[]) => {
    if (row !== []) {
      return (
        <thead>
        <tr>
          {
            row.map((column, columnNumber) => (
              <th
                key={`${index}-header-${columnNumber}`}
              >
                {column}
              </th>
            ))
          }
        </tr>
        </thead>
      );
    }
  }

  const renderTableBody = (rows: string[][]) => {
    return (
      <tbody>
      {
        rows.map((row, rowNumber) => (
          <tr className={tableRowClassName} key={`${index}-row-${rowNumber}`}>
            {
              row.map && row.map((column, columnIndex) => (
                <td
                  className={tableColumnClassName}
                  key={`${index}-cell-${rowNumber}${columnIndex}`}
                >
                  {column}
                </td>
              ))
            }
          </tr>
        ))
      }
      </tbody>
    )
  };

  return (
    <table className={'csv-html-table'}>
      {renderTableHeader(headerRow)}
      {renderTableBody(rowsWithColumns)}
    </table>
  )
}
