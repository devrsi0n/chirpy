import { SUPPORT_LINK } from '@chirpy-dev/utils';
import { Button } from '@tremor/react';

import { colors } from '../styles/theme';
import Modal from './Modal';
import { useAnalytics } from './Provider';

export default function ErrorModal() {
  const { error, setError } = useAnalytics();

  const handleClose = () => {
    setError(null);
  };

  return (
    <Modal isOpen={!!error} onClose={handleClose}>
      <Modal.Content>
        <span className="mb-4 flex items-center gap-2 text-sm font-semibold text-red-600">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="16" height="16" rx="8" fill={colors.error} />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.4991 5.25721C6.15616 4.91426 5.60015 4.91426 5.25721 5.25721C4.91426 5.60015 4.91426 6.15616 5.25721 6.4991L6.78265 8.02455L5.25721 9.54999C4.91427 9.89294 4.91427 10.449 5.25721 10.7919C5.60015 11.1348 6.15617 11.1348 6.49911 10.7919L8.02455 9.26645L9.54999 10.7919C9.89293 11.1348 10.4489 11.1348 10.7919 10.7919C11.1348 10.4489 11.1348 9.89293 10.7919 9.54999L9.26645 8.02455L10.7919 6.49911C11.1348 6.15617 11.1348 5.60015 10.7919 5.25721C10.4489 4.91427 9.89293 4.91427 9.54999 5.25721L8.02455 6.78265L6.4991 5.25721Z"
              fill="white"
            />
          </svg>
          Error
        </span>
        <Modal.Title className="text-2xl">
          {error?.message
            ? `${error.message.charAt(0).toUpperCase()}${error.message.slice(
                1,
              )}`
            : 'Something went wrong'}
        </Modal.Title>
        <div className="my-8">
          <Modal.Description>
            {`Ask `}
            <a
              href={SUPPORT_LINK}
              className="underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Chirpy support
            </a>
          </Modal.Description>
        </div>
        <div className="flex justify-end">
          <Button variant="secondary" color="slate" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
