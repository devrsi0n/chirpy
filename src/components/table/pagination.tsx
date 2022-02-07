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

const PAGE_NUMS = [10, 20, 30, 40, 50];

type paginationProps = {
  pageIndex: number;
  pageOptions?: [];
  gotoPage: () => void;
  canPreviousPage?: boolean;
  previousPage: () => void;
  pageCount: number;
  canNextPage: boolean;
  nextPage: () => void;
  pageSize: number;
};

export default function Pagination({
  pageIndex,
  pageOptions,
  gotoPage,
  canPreviousPage,
  previousPage,
  pageCount,
  canNextPage,
  nextPage,
  pageSize,
}: paginationProps) {
  return (
    <div tw="flex items-center justify-end space-x-4">
      <Text tw="block mr-4">
        Page
        <strong tw="ml-4">
          {pageIndex + 1} of {pageOptions?.length}
        </strong>
      </Text>
      |
      <Text tw="flex items-center space-x-2">
        Go to page:
        <div tw="p-2 flex bg-gray-400 items-center ml-4 rounded-md border-white border-2">
          <input
            tw="w-10 bg-gray-400 outline-none ml-1 block"
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
      <Button variant="solid" color="primary" onClick={() => nextPage()} disabled={!canNextPage}>
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
        {PAGE_NUMS.map((pageSize) => (
          <Select.Option key={pageSize} value={pageSize}>
            Show {pageSize}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
