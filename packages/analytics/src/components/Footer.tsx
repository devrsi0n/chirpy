import useAuth from '../lib/hooks/use-auth';

export default function Footer() {
  const { token } = useAuth();

  return (
    <footer className="flex w-full flex-col gap-2 text-center text-sm">
      <p>
        Built with speed and privacy in mind using{' '}
        <a
          href="https://tinybird.co"
          target="_blank"
          rel="noreferrer"
          className="text-primary font-semibold"
        >
          Tinybird
        </a>
      </p>
      {!!token && (
        <a
          className="text-primary text-sm underline"
          href="https://github.com/tinybirdco/web-analytics-starter-kit"
          target="blank"
          rel="noreferrer"
        >
          Customize this dashboard
        </a>
      )}
    </footer>
  );
}
