import ChevronLeft from '@geist-ui/react-icons/chevronLeft';
import ChevronRight from '@geist-ui/react-icons/chevronRight';
import ChevronsLeft from '@geist-ui/react-icons/chevronsLeft';
import ChevronsRight from '@geist-ui/react-icons/chevronsRight';
import React, { useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import 'twin.macro';

import { Button } from '$/components/button';
import { Select } from '$/components/select';
import { Text } from '$/components/text';
import { PAGE_SIZE_OPTIONS } from '$/lib/constants';

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
                      tw="px-5 py-3 border-b-2 border-gray-200 bg-primary-900 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
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
        <div tw="flex items-center justify-end space-x-4">
          <Text tw="mr-4">
            Page
            <strong tw="ml-4">
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Text>
          |
          <Text tw="flex items-center space-x-2">
            Go to page:
            <div tw="p-2 flex bg-gray-400 items-center ml-4 rounded-md border-white border-2">
              <input
                tw="w-10 bg-gray-400 outline-none ml-1"
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
              />
            </div>
          </Text>
          <Button
            variant="solid"
            color="primary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="solid"
            color="primary"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="solid"
            color="primary"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="solid"
            color="primary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <ChevronsRight />
          </Button>
          <Select
            tw="w-28 text-white bg-primary-900 rounded-md"
            value={pageSize}
            onChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            {PAGE_SIZE_OPTIONS.map((pageSize) => (
              <Select.Option key={pageSize} value={pageSize}>
                Show {pageSize}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}
    </>
  );
}
