export function coordsToIndex(x: number, y: number, numberOfRows: number): number {
  return x * numberOfRows + y;
}

export function indexToCoords(index: number, numberOfRows: number): { x: number; y: number; } {
  return {
    x: Math.floor(index / numberOfRows),
    y: index % numberOfRows
  };
}