import * as React from 'react';

import { useSessionStorage } from '../../hooks';
import { BaseButton } from '../button';
import { IconX } from '../icons';

export type BannerProps = {
  title: string;
  children?: React.ReactNode;
};

export function Banner(props: BannerProps): JSX.Element {
  const [isDismissed, setIsDismissed] = useSessionStorage(
    false,
    props.title.replace(/\s/g, '.').toLowerCase(),
  );
  if (isDismissed) {
    return <></>;
  }
  return (
    <section className="flex items-center rounded-t bg-primary-900">
      <div className="flex flex-1 flex-col justify-center space-y-1 py-2 pl-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-1 sm:pl-0">
        <h4 className="text-base font-semibold leading-none text-white">
          {props.title}
        </h4>
        {props.children && (
          <p className="text-base leading-none text-white/90 [&_a]:underline">
            {props.children}
          </p>
        )}
      </div>
      <BaseButton
        className="mr-2 rounded-full text-white hover:bg-primary-800"
        onClick={() => setIsDismissed(true)}
      >
        <IconX size={18} />
      </BaseButton>
    </section>
  );
}
