export interface SiteIconProps {
  name: string;
  domain: string;
}
export function SiteIcon({ domain, name }: SiteIconProps) {
  return (
    <img
      src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
      referrerPolicy="no-referrer"
      className="mr-2 inline h-4 w-4"
      alt={`Site icon of ${name}`}
    />
  );
}
