export const formatAmount = (amount: number): string => {
  return amount.toLocaleString() + "원";
};

export const formatDate = (date: Date | null) => {
  return date ? date.toISOString().split("T")[0] : "";
};

export function setLink(link?: string) {
  if (link) localStorage.setItem("link", link);
}

export function getLink() {
  const link = localStorage.getItem("link");
  return link || "";
}
