import { useMediaQuery } from "react-responsive";
import DiagramIcon from "../../icons/DiagramIcon";
import PieChartIcon from "../../icons/PieChartIcon";
import CategoryChart from "./CategoryChart";
import MonthlyExpenseChart from "./MonthlyExpenseChart";
import OverviewCard from "./OverviewCard";

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
            ChartElement={<CategoryChart />}
          />
          <OverviewCard
            title="월별"
            subTitle="지출 내역"
            Icon={DiagramIcon}
            ChartElement={<MonthlyExpenseChart />}
          />
        </div>
      )}

      {!isMobile && (
        <div className="min-w-[568px] w-11/12 max-w-[640px] lg:min-w-[640px] lg:max-w-[740px] md:flex h-[284px] justify-between">
          <div className="flex flex-col items-center justify-end gap-4">
            <CategoryChart />
            <span className="body-bold-14 text-gray-01">카테고리별 지출 내역</span>
          </div>
          <div className="flex flex-col items-center justify-end gap-6 lg:min-w-[346px] lg:max-w-[414px] lg:w-full">
            <MonthlyExpenseChart />
            <span className="body-bold-14 text-gray-01">월별 지출액</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
