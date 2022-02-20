import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import 'twin.macro';

import TablePagination from './pagination';

export type TableProps<T> = {
  columns: T[];
  data: T[];
  fetchData(value: T): void;
  loading?: boolean;
  className?: string;
  pageCount?: number;
  pagination?: boolean;
};

export function Table<T>({
  columns,
  data,
  fetchData,
  pagination = false,
  pageCount: controlledPageCount,
}: TableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    usePagination,
  );
  const [params, setParams] = useState({ limit: 10, offset: 0 });

  const onPageChange = (current: any) => {
    const { offset, limit } = params;
    if (current === 'n') {
      // queryList({ offset: offset + limit });
    } else if (current === 'p') {
      // queryList({ offset: offset - limit });
    } else {
      // queryList({ offset: 0 });
    }
  };

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
      <div tw="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div tw="min-w-full shadow rounded-lg overflow-hidden">
          <table tw="min-w-full leading-normal" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                // eslint-disable-next-line
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    // eslint-disable-next-line
                    <th
                      {...column.getHeaderProps()}
                      tw="px-5 py-3 border-b-2 border-gray-200 bg-primary-900 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  // eslint-disable-next-line
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        // eslint-disable-next-line
                        <td
                          {...cell.getCellProps()}
                          tw="px-5 py-5 border-b border-gray-200 bg-white dark:(bg-grayd-300) text-sm text-black"
                        >
                          <div>{cell.render('Cell')}</div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {pagination && (
        <TablePagination
          pageSize={10}
          params={{ limit: 10, offset: 0 }}
          next={false}
          onPageChange={onPageChange}
          onSizeChange={() => {}}
        />
      )}
    </>
  );
}
