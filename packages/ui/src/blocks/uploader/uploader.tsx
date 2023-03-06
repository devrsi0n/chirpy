import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import * as React from 'react';

import {
  Avatar,
  getInputStyles,
  IconUploadCloud,
  Spinner,
  useToast,
} from '../../components';
import { trpcClient } from '../../utilities';

export type UploaderProps = Pick<
  React.ComponentProps<'input'>,
  'name' | 'accept' | 'className'
> & {
  value?: string;
  onChange?: (value: string) => void;
  onError?: (message: string) => void;
  onValidate?: (file: File) => Promise<void>;
  description: string;
};

export function Uploader({
  value,
  onChange,
  onError,
  description,
  onValidate,
  ...inputProps
}: UploaderProps): JSX.Element {
  const inputId = React.useId();
  const { data: url } = trpcClient.image.uploadUrl.useQuery(undefined, {
    refetchOnWindowFocus: false,
    // URL is valid for 30 minutes
    refetchInterval: 25 * 60 * 1000,
    refetchOnReconnect: false,
  });
  const { mutateAsync: deleteImage, status: deleteStatus } =
    trpcClient.image.delete.useMutation();
  const { showToast } = useToast();
  const { mutateAsync: upload, status: uploadStatus } = useMutation(
    async (file: File) => {
      if (value) {
        // Delete the stale image
        try {
          await deleteImage(value);
        } catch {
          // Ignore, we already save the log in backend
        }
      }
      const formData = new FormData();
      formData.append('file', file);
      if (!url) {
        showToast({
          type: 'error',
          title: 'No upload URL provided',
          description:
            'Please refresh the page and try again, or contact Chirpy support.',
        });
        throw new Error('No upload URL');
      }
      const resp = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const data: UploadResponse = await resp.json();
      return data;
    },
    {
      onSuccess(data) {
        onError?.('');
        onChange?.(data.result.variants[0]);
      },
      onError() {
        showToast({
          title: 'Upload failed',
          type: 'error',
          description: 'Please try again later, or contact Chirpy support.',
        });
        onError?.('Upload failed');
      },
    },
  );
  const isLoading = uploadStatus === 'loading' || deleteStatus === 'loading';
  return (
    <section className="flex flex-1 gap-5">
      {isLoading ? (
        <Spinner />
      ) : value ? (
        <picture className="w-30">
          <img src={value} alt="Upload image" />
        </picture>
      ) : (
        <Avatar src={''} alt="Placeholder image" name="image" size="xl" />
      )}
      <div
        className={clsx(
          'cursor-pointer py-4 px-6',
          inputProps.className,
          getInputStyles(undefined, isLoading),
        )}
      >
        <input
          {...inputProps}
          type="file"
          className={'hidden'}
          id={inputId}
          onChange={async (event) => {
            if (isLoading) {
              return;
            }
            const file = event.target.files?.[0];
            if (!file) {
              return;
            }
            try {
              await onValidate?.(file);
              onError?.('');
            } catch (error) {
              if (error instanceof Error) {
                onError?.(error.message);
                return;
              }
            }
            await upload(file);
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
          <p>{description}</p>
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
