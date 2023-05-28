import { useRouter } from 'next/router';

export default function useParams<T extends string>({
  key,
  defaultValue,
  values,
}: {
  key: string;
  defaultValue?: T;
  values: T[];
}): [T, (param: T) => void] {
  const router = useRouter();
  const param = router.query[key] as T;
  const value =
    typeof param === 'string' && values.includes(param)
      ? param
      : defaultValue ?? values[0];

  const setParam = (param: T) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, param);
    router.push(
      {
        query: searchParams.toString(),
      },
      undefined,
      { scroll: false },
    );
  };

  return [value, setParam];
}
