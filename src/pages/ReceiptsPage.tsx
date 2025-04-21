import ProfileOverview from "../features/receipts/ProfileOverview";
import TimelineContents from "../features/receipts/TimelineContents";
import TimelineHeader from "../features/receipts/TimelineHeader";
import { useParams } from "react-router-dom";
import { ParamsIds } from "../types/types";
import { setLink } from "../utils/util";

const ReceiptsPage = () => {
  const { link } = useParams<ParamsIds>();
  setLink(link);

  return (
    <div className="flex flex-col h-full">
      <ProfileOverview />
      <div className="w-full md:px-[76px] lg:px-[100px] flex flex-col items-center">
        <TimelineHeader />
        <TimelineContents />
      </div>
    </div>
  );
};

export default ReceiptsPage;
