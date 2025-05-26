export function Button({ children, onClick, variant = 'default', ...props }) {
  const styles = variant === 'secondary'
    ? 'bg-gray-300 text-black'
    : 'bg-blue-600 text-white hover:bg-blue-700';
  return <button onClick={onClick} className={`px-4 py-2 rounded ${styles}`} {...props}>{children}</button>;
}