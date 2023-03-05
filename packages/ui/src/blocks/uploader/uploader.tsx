import clsx from 'clsx';
import * as React from 'react';

import { Avatar, getInputStyles, IconUploadCloud } from '../../components';
import { borderHover } from '../../styles/common';
import { logger, trpcClient } from '../../utilities';

export type UploaderProps = Pick<
  React.ComponentProps<'input'>,
  'name' | 'accept' | 'className' | 'onChange'
>;

export function Uploader(props: UploaderProps): JSX.Element {
  const inputId = React.useId();
  const { data: url } = trpcClient.image.uploadUrl.useQuery(undefined, {
    refetchOnWindowFocus: false,
    // URL is valid for 30 minutes
    refetchInterval: 25 * 60 * 1000,
  });
  return (
    <section className="flex flex-1 gap-5">
      <Avatar src={''} alt="Site logo" name="logo" size="xl" />
      <div
        className={clsx(
          'cursor-pointer py-4 px-6',
          borderHover,
          props.className,
          getInputStyles(),
        )}
      >
        <input
          accept="image/png, image/jpeg, image/jpg, image/webp, image/svg, image/gif"
          {...props}
          type="file"
          className={'hidden'}
          id={inputId}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file && url) {
              const formData = new FormData();
              formData.append('file', file);
              fetch(url, {
                method: 'POST',
                body: formData,
              }).then((res) => {
                if (res.ok) {
                  props.onChange?.(event);
                }
              });
            } else {
              logger.warn('No file or upload URL', {
                file,
                url,
              });
            }
          }}
        />
        <label
          htmlFor={inputId}
          className="flex flex-1 cursor-pointer flex-col items-center text-gray-1100"
        >
          <span className="rounded-full border-8 border-gray-200 bg-gray-400 p-2.5">
            <IconUploadCloud size={20} />
          </span>
          <div className="flex-1">
            <span className="font-semibold text-primary-900">
              Click to upload
            </span>
          </div>
          <p>{`SVG, PNG, JPG or WebP (max. 300 x 300px)`}</p>
        </label>
      </div>
    </section>
  );
}
