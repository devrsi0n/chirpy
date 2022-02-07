import 'twin.macro';

export interface SiteIconProps {
  name: string;
  domain: string;
}
export function SiteIcon({ domain, name }: SiteIconProps) {
  return (
    <img
      src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
      referrerPolicy="no-referrer"
      tw="h-4 w-4 mr-2 inline"
      alt={`Site icon of ${name}`}
    />
  );
}
