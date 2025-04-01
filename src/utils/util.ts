export const formatAmount = (amount: number): string => {
  return amount.toLocaleString() + "원";
};

export const formatDate = (date: Date | null) => {
  return date ? date.toISOString().split("T")[0] : "";
};
