import type { Site } from '@chirpy-dev/trpc';
import { useState } from 'react';

import {
  Button,
  IconExternalLink,
  IconLoader,
  Link,
  Text,
  useToast,
} from '../../../../components';
import { trpcClient } from '../../../../utilities';

type DomainData = Pick<Site, 'customDomain' | 'id'>;

interface DomainCardProps<T = DomainData> {
  data: T;
}

export function CustomDomainCard({ data }: DomainCardProps) {
  const {
    data: valid,
    isFetching,
    refetch: reCheckCustomDomain,
  } = trpcClient.site.checkDomain.useQuery(data.customDomain || '', {
    refetchInterval: 10_000,
  });
  const [recordType, setRecordType] = useState('CNAME');
  const subdomain = // if domain is a subdomain
    data.customDomain && data.customDomain.split('.').length > 2
      ? data.customDomain.split('.')[0]
      : '';
  const { isLoading: isDeleting, mutateAsync: deleteDomain } =
    trpcClient.site.deleteDomain.useMutation();
  const { showToast } = useToast();
  const trpcCtx = trpcClient.useContext();
  const handleClickDelete = async () => {
    try {
      await deleteDomain({
        siteId: data.id,
        // We have aleady made sure it's not null
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        customDomain: data.customDomain!,
      });
      void trpcCtx.site.byId.invalidate(data.id);
    } catch {
      showToast({
        title: 'Error deleting domain',
        description: 'Delete domain failed, please try again later',
        type: 'error',
      });
    }
  };
  return (
    <div className="mt-10 w-full max-w-2xl rounded-lg border py-10">
      <div className="flex flex-col justify-between space-y-4 px-10 sm:flex-row sm:space-x-4">
        <Link
          className="flex items-center justify-center text-xl font-semibold text-gray-1200 sm:justify-start"
          href={`https://${data.customDomain}`}
          variant="plain"
        >
          {data.customDomain}
          <span className="ml-2 inline-block">
            <IconExternalLink size={18} />
          </span>
        </Link>
        <div className="flex space-x-3">
          <Button
            onClick={async () => {
              await reCheckCustomDomain();
            }}
            disabled={isFetching}
            variant="default"
          >
            {isFetching && (
              <IconLoader size={20} className="animate-spin text-white" />
            )}
            <span>Refresh</span>
          </Button>
          <Button
            onClick={handleClickDelete}
            disabled={isDeleting}
            variant="solid"
            color="red"
          >
            {isDeleting ? (
              <IconLoader className="animate-spin text-white" />
            ) : (
              'Remove'
            )}
          </Button>
        </div>
      </div>
      <div className="my-3 flex items-center space-x-3 px-10">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          shapeRendering="geometricPrecision"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill={
              valid
                ? 'hsl(var(--tw-colors-blue-900))'
                : 'hsl(var(--tw-colors-red-900))'
            }
          />
          {valid ? (
            <>
              <path
                d="M8 11.8571L10.5 14.3572L15.8572 9"
                fill="none"
                stroke="white"
              />
            </>
          ) : (
            <>
              <path d="M15 9l-6 6" stroke="white" />
              <path d="M9 9l6 6" stroke="white" />
            </>
          )}
        </svg>
        <Text
          className={`${
            valid ? 'font-normal text-gray-1100' : 'font-medium text-red-900'
          } text-sm`}
        >
          {valid ? 'Valid' : 'Invalid'} Configuration
        </Text>
      </div>

      {!valid && (
        <>
          <div className="mt-5 mb-8 w-full border-t border-gray-100" />
          <div className="px-10">
            <div className="flex justify-start space-x-4">
              <button
                onClick={() => setRecordType('CNAME')}
                className={`${
                  recordType == 'CNAME'
                    ? 'border-gray-1200 text-gray-1200'
                    : 'border-gray-100 text-gray-1100'
                } ease border-b-2 pb-1 text-sm transition-all duration-150`}
              >
                CNAME Record (subdomains)
              </button>
              {/* if the custom domain is a subdomain, only show CNAME record */}
              {!subdomain && (
                <button
                  onClick={() => setRecordType('A')}
                  className={`${
                    recordType == 'A'
                      ? 'border-gray-1200 text-gray-1200'
                      : 'border-gray-100 text-gray-1100'
                  } ease border-b-2 pb-1 text-sm transition-all duration-150`}
                >
                  A Record (apex domain)
                </button>
              )}
            </div>
            <div className="my-3 text-left">
              <p className="my-5 text-sm">
                Set the following record on your DNS provider to continue:
              </p>
              <div className="bg-gray-50 flex items-center justify-start space-x-10 rounded-md p-2">
                <div>
                  <p className="text-sm font-bold">Type</p>
                  <p className="mt-2 font-mono text-sm">{recordType}</p>
                </div>
                <div>
                  <p className="text-sm font-bold">Name</p>
                  {/* if the custom domain is a subdomain, the CNAME record is the subdomain */}
                  <p className="mt-2 font-mono text-sm">
                    {recordType === 'A'
                      ? '@'
                      : recordType == 'CNAME' && subdomain
                      ? subdomain
                      : 'www'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold">Value</p>
                  <p className="mt-2 font-mono text-sm">
                    {recordType == 'CNAME' ? `cname.chirpy.dev` : `76.76.21.21`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
