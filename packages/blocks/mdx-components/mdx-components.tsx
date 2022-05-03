import { Link } from '@chirpy/components';

const MDXComponents = {
  a: MDXLink,
};

type MDXLinkProps = {
  children?: React.ReactNode;
  href?: string;
};
function MDXLink(props: MDXLinkProps): JSX.Element {
  return (
    <Link href={props.href || ''} variant="solid">
      {props.children}
    </Link>
  );
}

export { MDXComponents };
