import { cpDayjs } from '@chirpy-dev/utils';

import { Card, Link, Text } from '../../components';
import { RouterOutputs } from '../../utilities/trpc-client';
import { SiteCardMenu } from './site-card-menu';

export type SiteCardProps = {
  site: RouterOutputs['site']['all'][number];
};

export const cardStyle =
  'block h-[170px] w-[350px] rounded-xl bg-gray-0 p-6 shadow-sm focus-visible:ring focus-visible:ring-gray-700';

export function SiteCard({ site }: SiteCardProps): JSX.Element {
  return (
    <Card
      as={Link}
      href={`/site/${site.subdomain}`}
      key={site.id}
      className={cardStyle}
      variant="plain"
    >
      <div className="flex w-full flex-row items-start gap-4">
        <img
          src="https://via.placeholder.com/50"
          alt="favicon"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <Text className="font-medium">{site.name}</Text>
          <Text size="sm" variant="secondary">
            {site.subdomain}
          </Text>
        </div>
        <SiteCardMenu site={site} />
      </div>
      <div className="mt-6">
        <Text size="sm">Created {cpDayjs(site.createdAt).fromNow()}</Text>
      </div>
    </Card>
  );
}
