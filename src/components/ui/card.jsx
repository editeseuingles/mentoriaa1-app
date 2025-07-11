
export function Card({ children }) {
  return <div className="bg-gray-800 rounded-lg shadow">{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
