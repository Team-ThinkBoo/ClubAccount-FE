import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

interface MonthlyExpenseChartProps {
  data: { month: string; income: number; expense: number }[];
}

const MonthlyExpenseChart = ({ data }: MonthlyExpenseChartProps) => {
  return (
    <div className="w-[328px] h-[300px] md:w-[346px] md:h-[240px] lg:min-w-[346px] lg:max-w-[414px] lg:w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <XAxis dataKey="month" tickLine={false} interval={0} fontSize={10} />
          <YAxis
            fontSize={10}
            padding={{ top: 40 }}
            domain={[0, (dataMax: number) => Math.ceil(dataMax / 10000) * 10000]}
            tickCount={7}
            tickLine={false}
            tickFormatter={(v) => (v === 0 ? "" : `${Math.round(v / 10000)}만원`)}
          />
          <Tooltip formatter={(value) => `${value.toLocaleString()}원`} />
          <Legend verticalAlign="top" wrapperStyle={{ fontSize: "14px" }} />
          <CartesianGrid strokeDasharray="1" vertical={false} />
          <Line type="monotone" dataKey="expense" name="지출" stroke="#F4C16E" strokeWidth={2} />
          <Line type="monotone" dataKey="income" name="수입" stroke="#ADCFC4" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseChart;
