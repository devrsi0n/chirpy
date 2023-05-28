import useCurrentVisitors from '../lib/hooks/use-current-visitors';

export default function CurrentVisitors() {
  const currentVisitors = useCurrentVisitors();
  return (
    <div className="flex items-center gap-2">
      <span className="bg-success h-2 w-2 rounded-full" />
      <p className="text-neutral-64 truncate">{`${currentVisitors} current visitor${
        currentVisitors === 1 ? '' : 's'
      }`}</p>
    </div>
  );
}
