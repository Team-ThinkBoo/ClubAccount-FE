import DiagramIcon from "../../icons/DiagramIcon";
import PieChartIcon from "../../icons/PieChartIcon";
import CategoryChart from "./CategoryChart";
import MonthlyExpenseChart from "./MonthlyExpenseChart";
import OverviewCard from "./OverviewCard";

const CategoryData = [
  { name: "카테고리1", value: 400 },
  { name: "카테고리2", value: 300 },
  { name: "카테고리3", value: 300 },
  { name: "카테고리4", value: 200 }
];

const MonthlyExpenseData = [
  { month: "1월", expense: 100000, income: 50000 },
  { month: "2월", expense: 150000, income: 100000 },
  { month: "3월", expense: 130000, income: 110000 },
  { month: "4월", expense: 180000, income: 140000 },
  { month: "5월", expense: 200000, income: 170000 },
  { month: "6월", expense: 170000, income: 160000 },
  { month: "7월", expense: 190000, income: 180000 },
  { month: "8월", expense: 210000, income: 190000 },
  { month: "9월", expense: 170000, income: 160000 },
  { month: "10월", expense: 180000, income: 170000 },
  { month: "11월", expense: 200000, income: 180000 },
  { month: "12월", expense: 190000, income: 170000 }
];

const Overview = () => {
  return (
    <div className="flex mt-10 w-[312px] h-[101px] justify-between mx-auto md:hidden">
      <OverviewCard
        title="카테고리별"
        subTitle="지출 내역"
        Icon={PieChartIcon}
        ChartElement={<CategoryChart data={CategoryData} />}
      />
      <OverviewCard
        title="월별"
        subTitle="지출 내역"
        Icon={DiagramIcon}
        ChartElement={<MonthlyExpenseChart data={MonthlyExpenseData} />}
      />
    </div>
  );
};

export default Overview;
