import { Column, Hr, Link, Section, Tailwind } from '@react-email/components';

export default function Footer() {
  return (
    <Tailwind>
      <Hr className="border-grey-400 mx-0 my-6 w-full border-t" />
      <Section>
        <Column>
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}`}
            className="text-slate-500 m-0 text-xs leading-6"
          >
            &copy; {new Date().getFullYear()} Chirpy
          </Link>
        </Column>
        <Column align="right">
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/docs`}
            className="text-slate-500 text-xs"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/devrsi0n/chirpy"
            className="text-slate-500 ml-3 text-xs"
          >
            GitHub
          </Link>
          <Link
            href="https://twitter.com/ChirpyHQ"
            className="text-slate-500 ml-3 text-xs"
          >
            Twitter
          </Link>
        </Column>
      </Section>
      <Section className="mt-3">
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/account`}
          className="text-slate-500 text-xs"
        >
          Unsubscribe
        </Link>
      </Section>
    </Tailwind>
  );
}
