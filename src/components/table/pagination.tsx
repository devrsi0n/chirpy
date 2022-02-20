import ChevronLeft from '@geist-ui/react-icons/chevronLeft';
import ChevronRight from '@geist-ui/react-icons/chevronRight';
import React, { useEffect } from 'react';
import 'twin.macro';

import { Button } from '$/components/button';
import { Select } from '$/components/select';
import { PAGE_SIZE_OPTIONS } from '$/lib/constants';

type PaginationProps = {
  pageSize: number;
  next: boolean;
  params: {
    offset: number;
    limit: number;
  };
  onPageChange: (val: number | string) => void;
  onSizeChange: () => void;
};

export default function TablePagination({
  pageSize = 10,
  next,
  params,
  onPageChange,
  onSizeChange,
}: PaginationProps) {
  return (
    <div tw="flex justify-end mt-2">
      <Button
        tw="mr-2"
        size="sm"
        color="primary"
        variant="solid"
        onClick={() => onPageChange(1)}
        disabled={params.offset === 0}
      >
        first page
      </Button>
      <Button
        tw="border-r-2 rounded-r-none"
        size="sm"
        color="primary"
        variant="solid"
        onClick={() => onPageChange('p')}
        disabled={params.offset === 0}
      >
        <ChevronLeft />
        Prev
      </Button>
      <Button
        tw="rounded-l-none"
        variant="solid"
        size="sm"
        color="primary"
        onClick={() => onPageChange('n')}
        disabled={!next}
      >
        Next
        <ChevronRight />
      </Button>
      <Select
        tw="ml-2 w-28 text-white bg-primary-900 rounded-md"
        value={pageSize}
        onChange={onSizeChange}
      >
        {PAGE_SIZE_OPTIONS.map((pageSize) => (
          <Select.Option key={pageSize} value={pageSize}>
            Show {pageSize}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
