interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className = "" }: ProgressBarProps) {
  return (
    <div className={`h-1.5 w-full rounded-full bg-[rgba(0,0,0,0.08)] ${className}`}>
      <div
        className="h-full rounded-full bg-[#F04A8A] transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
