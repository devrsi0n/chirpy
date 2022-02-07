import { FallbackProps } from 'react-error-boundary';

import { Text } from '$/components/text';

export function ErrorFallback(props: FallbackProps) {
  return (
    <div role="alert" tw="bg-yellow-300 px-4 py-2">
      <Text tw="text-yellow-1100">Sorry, something went wrong in our side. Try again later.</Text>
    </div>
  );
}
