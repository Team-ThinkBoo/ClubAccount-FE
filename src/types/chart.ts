export interface LoadExpenseChartItems {
  id: string;
  year: number;
  month: number;
  totalExpense: number;
}
export type LoadExpenseChartResponse = LoadExpenseChartItems[];

export interface LoadCategoryChartResponse {
  groupDiningRatio: number;
  supplyPurchaseRatio: number;
  subscriptionRatio: number;
  venueRentalRatio: number;
  otherRatio: number;
}
