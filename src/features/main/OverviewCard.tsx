import { ElementType } from "react";

interface OverviewCardProps {
  title: string;
  subTitle: string;
  Icon: ElementType;
}

const OverviewCard = ({ title, subTitle, Icon }: OverviewCardProps) => {
  return (
    <div className="relative h-full p-4 bg-warm-gray-03 w-36 rounded-xl">
      <p className="body-bold-16 text-gray-01">{title}</p>
      <p className="body-med-14 text-gray-01">{subTitle}</p>
      <Icon className="absolute right-4 bottom-4 text-warm-gray-01" />
    </div>
  );
};

export default OverviewCard;
