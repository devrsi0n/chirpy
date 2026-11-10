import { deserializePageProps, serializePageProps } from '../page-props';

it('round-trips rich props through Next.js JSON serialization', () => {
  const props = {
    projects: [{ createdAt: new Date('2026-11-10T00:00:00.000Z') }],
    values: new Map([['count', 2]]),
    optional: undefined,
    trpcState: { json: { queries: [] } },
  };
  const wireProps = JSON.parse(JSON.stringify(serializePageProps(props)));
  const restored = deserializePageProps(wireProps);

  expect(restored).toEqual(props);
  expect(restored.projects[0].createdAt).toBeInstanceOf(Date);
  expect(restored.values).toBeInstanceOf(Map);
  expect(restored).not.toHaveProperty('__superjson');
});

it('leaves ordinary props unchanged when no metadata is needed', () => {
  const props = { title: 'Chirpy', count: 1 };
  expect(serializePageProps(props)).toEqual(props);
  expect(deserializePageProps(props)).toBe(props);
});
