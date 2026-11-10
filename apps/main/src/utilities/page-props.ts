import superjson, { type SuperJSONResult } from 'superjson';

type PagePropsMetadata = { __superjson?: SuperJSONResult['meta'] };

// Keep Date/Map props working without a compiler plugin tied to a Next.js version.
export function serializePageProps<T extends object>(props: T): T {
  const { json, meta } = superjson.serialize(props);
  return { ...(json as T), ...(meta && { __superjson: meta }) };
}

export function deserializePageProps<T extends object>(props: T): T {
  const { __superjson, ...json } = props as T & PagePropsMetadata;
  return __superjson
    ? superjson.deserialize<T>({
        json: json as SuperJSONResult['json'],
        meta: __superjson,
      })
    : props;
}
