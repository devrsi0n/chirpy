import { Link } from '$/components/Link';

const MDXComponents = {
  a: MDXLink,
};

type MDXLinkProps = {
  children: React.ReactNode;
  href: string;
};
function MDXLink(props: MDXLinkProps): JSX.Element {
  return (
    <Link href={props.href} variant="primary">
      {props.children}
    </Link>
  );
}

export { MDXComponents };
