import useCurrentVisitors from '../hooks/use-current-visitors';

export default function CurrentVisitors() {
  const currentVisitors = useCurrentVisitors();
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-green-700" />
      <p className="truncate text-gray-1200">{`${currentVisitors} current visitor${
        currentVisitors === 1 ? '' : 's'
      }`}</p>
    </div>
  );
}
