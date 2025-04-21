import ProfileOverview from "../features/main/ProfileOverview";
import TimelineContents from "../features/main/TimelineContents";
import TimelineHeader from "../features/main/TimelineHeader";
import { Await, useLoaderData, useParams } from "react-router-dom";
import { ParamsIds, ReceiptType } from "../types/types";
import { Suspense } from "react";
import SpinnerIcon from "../icons/SpinnerIcon";
import { setLink } from "../utils/util";

const ReceiptsPage = () => {
  const { link } = useParams<ParamsIds>();
  setLink(link);
  const { data } = useLoaderData<{ data: Promise<ReceiptType[]> }>();

  return (
    <div className="flex flex-col h-full">
      <ProfileOverview />
      <div className="w-full md:px-[76px] lg:px-[100px] flex flex-col items-center">
        <TimelineHeader />
        <Suspense fallback={<SpinnerIcon />}>
          <Await
            errorElement={<p className="m-auto">데이터를 불러오는데 실패하였습니다.</p>}
            resolve={data}
          >
            {(receipts) => <TimelineContents receipts={receipts} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ReceiptsPage;
