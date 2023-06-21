import { SUPPORT_LINK } from '@chirpy-dev/utils';
import { Card, Title } from '@tremor/react';
import { ReactNode } from 'react';

import { QueryStatus } from '../types/api';
import { cx } from '../utils';
import Loader from './Loader';

type WidgetProps = {
  children?: ReactNode;
};

function Widget({ children }: WidgetProps) {
  return (
    <section role="region" className="h-full">
      <Card className="h-full">{children}</Card>
    </section>
  );
}

type WidgetTitleProps = {
  children?: ReactNode;
  isVisuallyHidden?: boolean;
};

function WidgetTitle({ children, isVisuallyHidden }: WidgetTitleProps) {
  return (
    <div className={isVisuallyHidden ? 'sr-only' : ''}>
      <Title>{children}</Title>
    </div>
  );
}

function WidgetLoading({
  loaderSize,
  height,
}: {
  loaderSize?: number;
  height?: number;
}) {
  return (
    <div
      className="grid h-full w-full place-content-center"
      style={{ height }}
      role="alert"
      aria-busy="true"
      aria-label="Loading"
    >
      <Loader size={loaderSize} />
    </div>
  );
}

type WidgetContentProps = {
  className?: string;
  children?: ReactNode;
  status?: QueryStatus;
  loaderSize?: number;
  warning?: string | null;
  noData?: boolean;
};

function WidgetContent({
  children,
  className,
  status,
  loaderSize,
  warning,
  noData,
}: WidgetContentProps) {
  return (
    <div className={cx(className, 'mt-4 h-full')}>
      {status === 'loading' ? (
        <WidgetLoading loaderSize={loaderSize} />
      ) : status === 'error' ? (
        <WidgetWarning>{warning}</WidgetWarning>
      ) : status === 'success' && noData ? (
        <WidgetNoData />
      ) : (
        children
      )}
    </div>
  );
}

function WidgetWarning({ children }: { children: ReactNode }) {
  return (
    <div className="bg-warning absolute inset-x-0 bottom-0 flex items-start justify-center gap-2 p-8">
      <div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M8.0003 10.6667C7.86845 10.6667 7.73956 10.7058 7.62992 10.779C7.52029 10.8523 7.43484 10.9564 7.38438 11.0782C7.33393 11.2 7.32072 11.3341 7.34645 11.4634C7.37217 11.5927 7.43566 11.7115 7.5289 11.8048C7.62213 11.898 7.74092 11.9615 7.87024 11.9872C7.99956 12.0129 8.13361 11.9997 8.25543 11.9493C8.37724 11.8988 8.48136 11.8134 8.55462 11.7037C8.62787 11.5941 8.66697 11.4652 8.66697 11.3334C8.66697 11.1565 8.59673 10.987 8.47171 10.8619C8.34668 10.7369 8.17711 10.6667 8.0003 10.6667ZM15.1136 11.6467L9.74697 2.31335C9.57351 2.00236 9.32016 1.74332 9.0131 1.563C8.70604 1.38267 8.3564 1.2876 8.0003 1.2876C7.64421 1.2876 7.29457 1.38267 6.98751 1.563C6.68045 1.74332 6.4271 2.00236 6.25364 2.31335L0.920304 11.6467C0.740834 11.9494 0.644399 12.294 0.640734 12.6459C0.637068 12.9978 0.726303 13.3444 0.899428 13.6507C1.07255 13.9571 1.32344 14.2123 1.62676 14.3907C1.93008 14.5691 2.27509 14.6643 2.62697 14.6667H13.3736C13.7283 14.6702 14.0776 14.5793 14.3856 14.4033C14.6936 14.2273 14.9492 13.9726 15.1263 13.6652C15.3034 13.3579 15.3955 13.009 15.3933 12.6542C15.3911 12.2995 15.2946 11.9518 15.1136 11.6467ZM13.9603 12.98C13.9019 13.084 13.8166 13.1704 13.7134 13.2302C13.6102 13.29 13.4929 13.321 13.3736 13.32H2.62697C2.50771 13.321 2.39037 13.29 2.28718 13.2302C2.18399 13.1704 2.09874 13.084 2.0403 12.98C1.98179 12.8787 1.95099 12.7637 1.95099 12.6467C1.95099 12.5297 1.98179 12.4147 2.0403 12.3134L7.37364 2.98002C7.42958 2.87082 7.51458 2.77917 7.61927 2.71518C7.72395 2.65119 7.84427 2.61733 7.96697 2.61733C8.08967 2.61733 8.20999 2.65119 8.31467 2.71518C8.41936 2.77917 8.50436 2.87082 8.5603 2.98002L13.927 12.3134C13.9931 12.4132 14.0311 12.5291 14.037 12.6488C14.0428 12.7684 14.0164 12.8875 13.9603 12.9934V12.98ZM8.0003 5.33335C7.82349 5.33335 7.65392 5.40359 7.5289 5.52861C7.40387 5.65364 7.33364 5.82321 7.33364 6.00002V8.66669C7.33364 8.8435 7.40387 9.01307 7.5289 9.13809C7.65392 9.26311 7.82349 9.33335 8.0003 9.33335C8.17711 9.33335 8.34668 9.26311 8.47171 9.13809C8.59673 9.01307 8.66697 8.8435 8.66697 8.66669V6.00002C8.66697 5.82321 8.59673 5.65364 8.47171 5.52861C8.34668 5.40359 8.17711 5.33335 8.0003 5.33335Z" />
        </svg>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-1100">{children}</h3>
        <div className="text-sm text-gray-1100">
          <p>
            {`Failed to load data, please ask`}
            <a href={SUPPORT_LINK} className="underline underline-offset-2">
              Chirpy support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function WidgetNoData() {
  return (
    <div className="absolute inset-0 grid place-content-center text-gray-1100">
      No data
    </div>
  );
}

export default Object.assign(Widget, {
  Title: WidgetTitle,
  Content: WidgetContent,
  Warning: WidgetWarning,
  NoData: WidgetNoData,
  Loading: WidgetLoading,
});
