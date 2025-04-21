import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import Selector from "../../components/Selector";
import ReceiptCapture from "./ReceiptCapture";
import Input from "../../components/Input";
import { CATEGORY, categoryKeys } from "../../constants/constants";
import {
  LoadReceiptDetailResponseType,
  ReceiptItemsType,
  ReceiptRequestType
} from "../../types/receipt";
import { ChangeEvent, FormEvent, useState } from "react";
import { formatDate, getLink } from "../../utils/util";
import ReceiptDetailsList from "./ReceiptDetailsList";
import { useUpdateReceipt } from "../../hooks/useReceipts";

interface UpdateModalContentProps {
  data: LoadReceiptDetailResponseType;
  onCloseModal: () => void;
}

const UpdateModalContent = ({ data, onCloseModal }: UpdateModalContentProps) => {
  const [date, setDate] = useState<DateValueType>({
    startDate: new Date(data.date),
    endDate: new Date(data.date)
  });
  const [value, setValue] = useState<ReceiptRequestType["request"]>(data);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const link = getLink();

  const { mutate: updateMutate } = useUpdateReceipt(link, onCloseModal);

  const handleChangeValue = (
    key: keyof ReceiptRequestType["request"],
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue((prev) => {
      return { ...prev, [key]: e.target.value };
    });
  };

  function handleShowDetiles() {
    setShowDetails((pre) => !pre);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      value.businessName.trim() === "" ||
      !value.amount ||
      value.amount === 0 ||
      !value.category ||
      value.date.trim() === ""
    ) {
      setError("메모를 제외한 비어있는 항목을 모두 채워주세요!");
      return;
    }

    updateMutate({ id: data.id, datas: value });
  };

  const handleUpdateItems = (items: ReceiptItemsType[]) => {
    setValue((prev) => ({ ...prev, receiptItems: items }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[312px] md:w-[368px] rounded-2xl bg-white flex flex-col justify-center items-center py-8 px-5 gap-6 h-[582px]"
    >
      {!showDetails && (
        <>
          <h1 className="title-extra-18 text-gray-01">수정하기</h1>
          <div className="flex flex-col w-full gap-5 pt-4">
            <div className="flex flex-col items-center w-full gap-3">
              <ReceiptCapture onFileChange={() => {}} />
              <Selector
                selectTitle={"카테고리"}
                selectList={categoryKeys}
                dataTitle={(data) => CATEGORY[data]}
                dataValue={(data) => data}
                value={value.category}
                onChange={(e) => handleChangeValue("category", e)}
                name="category"
              />
              <Datepicker
                maxDate={new Date()}
                inputName="date"
                containerClassName="w-[272px] md:w-[312px] h-[41px] relative w-full text-gray-700"
                inputClassName="w-[272px] md:w-[312px] h-[41px] gap-1 px-4 border body-med-14 text-gray-01 rounded-xl border-gray-05 focus:outline-0"
                popoverDirection="down"
                readOnly
                i18n={"ko"}
                placeholder="날짜"
                useRange={false}
                asSingle={true}
                primaryColor="amber"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                  setValue((prev) => ({
                    ...prev,
                    date: formatDate(!newValue?.startDate ? null : new Date(newValue.startDate))
                  }));
                }}
              />
              <Input
                placeholder="상호명"
                name="store_name"
                value={value.businessName}
                onChange={(e) => handleChangeValue("businessName", e)}
              />
              <Input
                placeholder="금액"
                name="amount"
                type="number"
                className="appearance-none no-spinner"
                value={value.amount === 0 ? "" : value.amount}
                onChange={(e) => handleChangeValue("amount", e)}
              />
              <Input
                placeholder="메모"
                name="etc"
                value={value.etc}
                onChange={(e) => handleChangeValue("etc", e)}
              />
              <button
                type="button"
                onClick={handleShowDetiles}
                className="text-center underline cursor-pointer text-gray-03 body-med-14"
              >
                영수증 상세내역
              </button>
              {error && <p className="text-red-400 caption-med-12">{error}</p>}
            </div>
            <footer className="flex flex-col w-full gap-3">
              <button className="px-4 py-3 text-center rounded-lg bg-primary body-bold-16 text-gray-01">
                저장하기
              </button>
              <button
                type="button"
                onClick={onCloseModal}
                className="px-4 py-3 text-center rounded-lg bg-gray-05 body-bold-16 text-gray-03"
              >
                취소
              </button>
            </footer>
          </div>
        </>
      )}
      {showDetails && (
        <ReceiptDetailsList
          receiptItems={value.receiptItems}
          onBack={handleShowDetiles}
          onUpdate={handleUpdateItems}
        />
      )}
    </form>
  );
};

export default UpdateModalContent;
