export const sampleDisclosure =
  "Development preview. This series is a synthetic layout sample. It is not a treasury balance, price, reward, buyback, or transaction history.";

export type RangeKey = "7D" | "30D" | "90D" | "ALL";

export const rangeKeys: RangeKey[] = ["7D", "30D", "90D", "ALL"];

const shape = (values: number[]) =>
  values.map((value, index) => ({
    label: String(index + 1).padStart(2, "0"),
    value,
  }));

export const sampleSeries: Record<RangeKey, { label: string; value: number }[]> = {
  "7D": shape([18, 22, 21, 28, 26, 34, 33]),
  "30D": shape([16, 20, 24, 22, 30, 28, 36, 33, 41, 39]),
  "90D": shape([12, 14, 18, 17, 22, 26, 24, 31, 29, 35, 38, 36]),
  ALL: shape([8, 11, 10, 16, 21, 19, 27, 34]),
};

export const sampleAllocation = [
  { name: "Sample A", value: 34 },
  { name: "Sample B", value: 26 },
  { name: "Sample C", value: 22 },
  { name: "Sample D", value: 18 },
];
