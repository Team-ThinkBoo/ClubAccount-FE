import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#B1C29E", "#F0A04B", "#FCE7C8", "#FDD55D"];

interface renderLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: renderLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#323232"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={500}
      pointerEvents="none"
    >
      {(percent * 100).toFixed(1)}%
    </text>
  );
};

interface CategoryChartProps {
  data: { name: string; value: number }[];
}

const CategoryChart = ({ data }: CategoryChartProps) => {
  return (
    <div className="flex items-center justify-center focus:outline-none w-[250px] h-[250px] md:w-[200px] md:h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            className="focus:outline-none"
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            label={renderLabel}
            labelLine={false}
          >
            {data.map((data, index) => (
              <Cell key={data.name} fill={COLORS[index]} className="focus:outline-none" />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value}원`, name]}
            wrapperStyle={{ fontSize: "14px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
