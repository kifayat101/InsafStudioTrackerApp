export function Card({ children, ...props }) {
  return <div className="rounded-xl border p-4 shadow-sm bg-white" {...props}>{children}</div>;
}
export function CardContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}