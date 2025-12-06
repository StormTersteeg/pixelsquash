export default interface CompressionQuality {
  name: string;
  value: number;
}

export const CompressionQualityRange: CompressionQuality[] = [
  ...Array(10).keys(),
]
  .reverse()
  .map((n) => {
    return {
      name: `${(n + 1) * 10}%`,
      value: parseFloat((n / 10 + 0.1).toFixed(1)),
    };
  });
