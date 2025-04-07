import { useMediaQuery } from "react-responsive";
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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      {isMobile && (
        <div className="flex mt-10 min-w-[312px] h-[101px] w-10/12 max-w-[468px] justify-between mx-auto">
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
      )}

      {!isMobile && (
        <div className="min-w-[568px] w-11/12 max-w-[640px] lg:min-w-[640px] lg:max-w-[740px] md:flex h-[284px] justify-between">
          <div className="flex flex-col items-center justify-end gap-11">
            <CategoryChart data={CategoryData} />
            <span className="body-bold-14 text-gray-01">카테고리별 지출 내역</span>
          </div>
          <div className="flex flex-col items-center justify-end gap-6 lg:min-w-[346px] lg:max-w-[414px] lg:w-full">
            <MonthlyExpenseChart data={MonthlyExpenseData} />
            <span className="body-bold-14 text-gray-01">월별 지출액</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
