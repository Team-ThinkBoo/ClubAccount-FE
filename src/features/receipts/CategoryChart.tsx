import { useLoadCategoryChart } from "@/hooks/useChart";
import { ParamsIds } from "@/types/types";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#FCE7C8", "#FDD55D", "#F0A04B", "#B1C29E", "#D3D3D3"]; // 순서에 맞게 조정

const CATEGORY_ORDER = ["물품 구매비", "정기 구독비", "회식비", "대관비", "기타"];

const CATEGORY = {
  supplyPurchaseExpense: "물품 구매비",
  subscriptionExpense: "정기 구독비",
  groupDiningExpense: "회식비",
  venueRentalExpense: "대관비",
  otherExpense: "기타"
};

const CategoryChart = () => {
  const { link } = useParams<ParamsIds>();
  const { data } = useLoadCategoryChart(link || "");

  const chartData = Object.entries(data || {})
    .map(([key, value]) => ({
      name: CATEGORY[key as keyof typeof CATEGORY],
      value: Number(Number(value).toFixed(2))
    }))
    .sort((a, b) => CATEGORY_ORDER.indexOf(a.name) - CATEGORY_ORDER.indexOf(b.name));

  const total = chartData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-[200px] h-[200px] md:w-[200px] md:h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`${value}원`, name]}
              wrapperStyle={{ fontSize: "14px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col items-center gap-2 text-xs text-[#333]">
        <div className="flex gap-x-6">
          {chartData.slice(0, 2).map((entry, index) => {
            const percent = total > 0 ? ((entry.value / total) * 100).toFixed(1) : "0.00";
            return (
              <div key={entry.name} className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span>{entry.name}</span>
                <span>{percent}%</span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-x-4">
          {chartData.slice(2).map((entry, index) => {
            const percent = total > 0 ? ((entry.value / total) * 100).toFixed(1) : "0.00";
            const colorIndex = index + 2;
            return (
              <div key={entry.name} className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[colorIndex % COLORS.length] }}
                ></span>
                <span>{entry.name}</span>
                <span>{percent}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
