import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import * as React from 'react';

import { Avatar, getInputStyles, IconUploadCloud } from '../../components';
import { trpcClient } from '../../utilities';

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
    refetchOnReconnect: false,
  });
  const { data: uploadedRsp, mutate } = useMutation(async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    if (!url) {
      throw new Error('No upload URL');
    }
    const resp = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data: UploadResponse = await resp.json();
    return data;
  });
  return (
    <section className="flex flex-1 gap-5">
      {uploadedRsp?.result.variants[0] ? (
        <picture className="w-30">
          <img src={uploadedRsp.result.variants[0]} alt="Upload image" />
        </picture>
      ) : (
        <Avatar src={''} alt="Placeholder image" name="image" size="xl" />
      )}
      <div
        className={clsx(
          'cursor-pointer py-4 px-6',
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
            if (!file) {
              return;
            }
            mutate(file);
          }}
        />
        <label
          htmlFor={inputId}
          className="flex flex-1 cursor-pointer flex-col items-center text-gray-1100"
        >
          <span className="rounded-full border-8 border-gray-200 bg-gray-400 p-2.5">
            <IconUploadCloud size={20} />
          </span>
          <div>
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

interface UploadResponse {
  result: UploadResult;
  success: boolean;
  errors: any[];
  messages: any[];
}

interface UploadResult {
  id: string;
  filename: string;
  // Date string
  uploaded: string;
  requireSignedURLs: boolean;
  // Public accessible URL
  variants: string[];
}
