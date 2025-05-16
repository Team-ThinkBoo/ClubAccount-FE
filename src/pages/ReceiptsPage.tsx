import ProfileOverview from "../features/receipts/ProfileOverview";
import TimelineContents from "../features/receipts/TimelineContents";
import TimelineHeader from "../features/receipts/TimelineHeader";
import { useParams } from "react-router-dom";
import { ParamsIds } from "../types/types";
import { setLink } from "../utils/util";
import { DateValueType } from "react-tailwindcss-datepicker";
import { useState } from "react";

const ReceiptsPage = () => {
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null
  });

  const handleDateChange = (newValue: DateValueType) => setDate(newValue);

  const { link } = useParams<ParamsIds>();
  setLink(link);

  return (
    <div className="flex flex-col h-full">
      <ProfileOverview />
      <div className="w-full md:px-[76px] lg:px-[100px] flex flex-col items-center">
        <TimelineHeader date={date} onChangeDate={handleDateChange} />
        <TimelineContents date={date} />
      </div>
    </div>
  );
};

export default ReceiptsPage;
