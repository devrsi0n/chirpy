import {
  IconExternalLink,
  IconGlobe,
  IconLayers,
  IconMoreVertical,
  IconPieChart,
  IconSettings,
  Menu,
} from '../../components';
import { RouterOutputs } from '../../utilities';
import { MenuLink } from '../user-menu/menu-link';

export function SiteCardMenu({
  site,
}: {
  site: RouterOutputs['site']['all'][number];
}): JSX.Element {
  const siteHome = `/site/${site.subdomain}`;
  const links = [
    {
      name: 'Site home',
      href: siteHome,
      // TODO: should be double layer
      icon: IconLayers,
    },
    {
      name: 'Live',
      href: `https://${site.subdomain}.chirpy.dev`,
      icon: IconExternalLink,
    },
    {
      name: 'Analytics',
      href: `${siteHome}/analytics`,
      icon: IconPieChart,
    },
    {
      name: 'Domain',
      href: `${siteHome}/domain`,
      icon: IconGlobe,
    },
    {
      name: 'Settings',
      href: `${siteHome}/settings`,
      icon: IconSettings,
    },
  ];

  return (
    <Menu>
      <Menu.Button className="ml-auto">
        <IconMoreVertical size={20} />
      </Menu.Button>
      <Menu.Items align="start" className="min-w-[200px]">
        {links.map((link) => (
          <Menu.Item
            key={link.name}
            as={MenuLink}
            variant="plain"
            href={link.href}
          >
            {<link.icon size={16} />}
            {link.name}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
