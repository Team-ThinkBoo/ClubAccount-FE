import DiagramIcon from "../../icons/DiagramIcon";
import PieChartIcon from "../../icons/PieChartIcon";
import OverviewCard from "./OverviewCard";

const Overview = () => {
  return (
    <div className="flex mt-10 w-[312px] h-[101px] justify-between mx-auto">
      <OverviewCard title="카테고리별" subTitle="지출 내역" Icon={PieChartIcon} />
      <OverviewCard title="월별" subTitle="지출 내역" Icon={DiagramIcon} />
    </div>
  );
};

export default Overview;
