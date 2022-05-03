import { Text } from '@chirpy/components';

export function ErrorFallback() {
  return (
    <div role="alert" className="bg-yellow-300 px-4 py-2">
      <Text className="text-yellow-1100">
        Sorry, something went wrong in our side. Try again later.
      </Text>
    </div>
  );
}
