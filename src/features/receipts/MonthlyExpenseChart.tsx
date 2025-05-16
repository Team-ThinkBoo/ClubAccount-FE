import { useLoadExpenseChart } from "@/hooks/useChart";
import { ParamsIds } from "@/types/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
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

const MonthlyExpenseChart = () => {
  const [year, setYear] = useState(2025);
  const { link } = useParams<ParamsIds>();
  const { data } = useLoadExpenseChart(link || "", year);
  const namedData = data?.map((item) => ({ ...item, month: item.month + "월" }));

  return (
    <div className="relative w-[328px] h-[300px] md:w-[346px] md:h-[240px] lg:min-w-[346px] lg:max-w-[414px] lg:w-full">
      <div className="absolute z-10 left-1/2 right-1/2">
        <div className="flex gap-5 ">
          <button className="cursor-pointer" onClick={() => setYear((pre) => pre - 1)}>
            {"<"}
          </button>
          <span>{year}</span>
          <button className="cursor-pointer" onClick={() => setYear((pre) => pre + 1)}>
            {">"}
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={namedData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <XAxis dataKey="month" tickLine={false} interval={0} fontSize={10} />
          <YAxis
            fontSize={10}
            padding={{ top: 40 }}
            domain={[
              0,
              (dataMax: number) => {
                const max = Math.ceil(dataMax / 10000) * 10000;
                return max === 0 ? 10000 : max;
              }
            ]}
            tickCount={5}
            tickLine={false}
            tickFormatter={(v) => {
              if (v === 0) return "";
              return v >= 10000 ? `${Math.round(v / 10000)}만원` : `${v.toLocaleString()}원`;
            }}
          />
          <Tooltip formatter={(value) => `${value.toLocaleString()}원`} />
          <Legend verticalAlign="top" wrapperStyle={{ fontSize: "14px" }} />
          <CartesianGrid strokeDasharray="1" vertical={false} />
          <Line
            type="monotone"
            dataKey="totalExpense"
            name="지출"
            stroke="#F4C16E"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseChart;
