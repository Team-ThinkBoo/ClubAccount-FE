export interface LoadExpenseChartItems {
  id: string;
  year: number;
  month: number;
  totalExpense: number;
}
export type LoadExpenseChartResponse = LoadExpenseChartItems[];
