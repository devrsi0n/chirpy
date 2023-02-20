import clsx from 'clsx';
import * as React from 'react';

import {
  BaseButton,
  BaseButtonProps,
  Button,
  IconArrowLeft,
  IconArrowRight,
} from '../../../../components';

export type PaginationProps = {
  onClickPrevious: () => void;
  onClickNext: () => void;
  onClickPage: (page: number) => void;
  totalPage: number;
  currentPage: number;
};

export function Pagination(props: PaginationProps): JSX.Element {
  return (
    <section className="flex justify-between">
      <Button
        disabled={props.currentPage === 1}
        onClick={props.onClickPrevious}
        className="gap-2"
        size="sm"
      >
        <IconArrowLeft size={20} />
        <span>Previous</span>
      </Button>
      <div className="flex gap-0.5">
        {Array.from({ length: props.totalPage }, (_, i) => i + 1).map(
          (page) => (
            <PaginationButton active={page === props.currentPage} key={page}>
              {page}
            </PaginationButton>
          ),
        )}
      </div>
      <Button
        disabled={props.currentPage === props.totalPage}
        onClick={props.onClickNext}
        className="gap-2"
        size="sm"
      >
        <span>Next</span>
        <IconArrowRight size={20} />
      </Button>
    </section>
  );
}

type PaginationButtonProps = BaseButtonProps & {
  active?: boolean;
};
function PaginationButton({
  active,
  ...restProps
}: PaginationButtonProps): JSX.Element {
  return (
    <BaseButton
      {...restProps}
      className={clsx(
        'h-10 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-1100 hover:bg-gray-400',
        active && `bg-gray-300`,
        restProps.className,
      )}
    />
  );
}
