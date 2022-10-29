import clsx from 'clsx';

import { Link } from '../../components/link';
import styles from './mdx.module.scss';

export const MDXComponents: Record<string, React.ReactNode> = {
  a: MDXLink,
  pre: Pre,
} as unknown as Record<string, React.ReactNode>;

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

interface PreProps {
  children: React.ReactNode;
  className?: string;
}

function Pre({ children, className, ...restProps }: PreProps): JSX.Element {
  return (
    <pre
      {...restProps}
      className={clsx(
        'not-prose whitespace-normal break-all',
        styles.blockPre,
        className,
      )}
    >
      {children}
    </pre>
  );
}
