export function Progress({ value }) {
  return (
    <div className="w-full bg-gray-200 h-4 rounded">
      <div className="h-4 bg-green-500 rounded" style={{ width: `${value}%` }}></div>
    </div>
  );
}