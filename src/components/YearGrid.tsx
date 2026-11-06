function level(index: number) {
  const n = Math.sin(index * 12.9898) * 43758.5453;
  const fraction = n - Math.floor(n);
  if (fraction > 0.84) return 4;
  if (fraction > 0.66) return 3;
  if (fraction > 0.46) return 2;
  if (fraction > 0.28) return 1;
  return 0;
}

export function YearGrid() {
  const cells = Array.from({ length: 16 * 7 }, (_, index) => level(index));
  return (
    <div className="year" role="img" aria-label="A drawn sketch of days at the desk. It is not live activity.">
      {cells.map((value, index) => (
        <i key={index} data-level={value} />
      ))}
    </div>
  );
}
