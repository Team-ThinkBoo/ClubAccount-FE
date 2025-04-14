import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Selector from "../../components/Selector";
import { AddModalType, FetchErrorType } from "../../types/types";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import ReceiptCapture from "./ReceiptCapture";
import { createReceipt, parseReceipt } from "../../utils/receipt";
import { useMutation } from "@tanstack/react-query";
import {
  CategoryKeyType,
  ParseReceiptRequestType,
  ParseReceiptResponseType,
  ReceiptItemsType,
  ReceiptRequestType
} from "../../types/receipt";
import { CATEGORY } from "../../constants/constants";
import { formatDate } from "../../utils/util";

const categoryKeys = Object.keys(CATEGORY) as CategoryKeyType[];
interface AddModalProps {
  type: AddModalType;
  open: boolean;
  onCloseModal: () => void;
}

const AddModal = ({ type, open, onCloseModal }: AddModalProps) => {
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null
  });

  const [value, setValue] = useState<ReceiptRequestType>({
    request: {
      amount: Number(""),
      businessName: "",
      date: "",
      etc: "",
      receiptItems: []
    }
  });

  const [preview, setPreview] = useState<string | null>(null);
  const handleChangeValue = (
    key: keyof ReceiptRequestType["request"],
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue((prev) => {
      return { ...prev, request: { ...prev.request, [key]: e.target.value } };
    });
  };

  const { mutate: parseReceiptMutation } = useMutation<
    ParseReceiptResponseType,
    FetchErrorType,
    ParseReceiptRequestType
  >({
    mutationFn: parseReceipt,
    onSuccess: (data) => {
      setValue((prev) => {
        const items: ReceiptItemsType[] = data.Items.map((item) => ({
          name: item.Description,
          price: item.Price,
          quantity: item.Quantity,
          totalPrice: item.TotalPrice
        }));

        return {
          ...prev,
          request: {
            ...prev.request,
            receiptItems: items,
            businessName: data.MerchantName,
            amount: data.Total,
            date: data.TransactionDate
          }
        };
      });
      setDate((prev) => ({
        ...prev,
        startDate: new Date(data.TransactionDate),
        endDate: new Date(data.TransactionDate)
      }));
      setPreview(null);
    },
    onError: (err) => {
      alert(err);
      setPreview(null);
    }
  });

  const { mutate: createReceiptMutation } = useMutation<
    unknown,
    FetchErrorType,
    ReceiptRequestType
  >({
    mutationFn: createReceipt,
    onSuccess: () => {
      onCloseModal();
    },
    onError: (err) => {
      alert(err);
    }
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setValue((prev) => ({ ...prev, image: file }));
    parseReceiptMutation({ image: file });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createReceiptMutation(value);
  };

  let classes =
    "w-[312px] md:w-[368px] rounded-2xl bg-white flex flex-col justify-center items-center py-8 px-5 gap-6";

  if (type === "self") {
    classes += " h-[522px]";
  } else {
    classes += " h-[582px]";
  }

  return (
    <Modal open={open} onClose={onCloseModal}>
      <form onSubmit={handleSubmit} className={classes}>
        {!preview && (
          <>
            <h1 className="title-extra-18 text-gray-01">
              {type === "self" ? "직접 등록하기" : "스캔으로 등록하기"}
            </h1>
            <div className="flex flex-col w-full gap-5 pt-4">
              <div className="flex flex-col w-full gap-3">
                {type === "receipt" && <ReceiptCapture onFileChange={handleFileChange} />}
                <Selector
                  selectTitle={"카테고리"}
                  selectList={categoryKeys}
                  dataTitle={(data) => CATEGORY[data]}
                  dataValue={(data) => data}
                  value={value.request.category}
                  onChange={(e) => handleChangeValue("category", e)}
                  name="category"
                />
                <Datepicker
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
                      request: {
                        ...prev.request,
                        date: formatDate(new Date(newValue?.startDate || ""))
                      }
                    }));
                  }}
                />
                <Input
                  placeholder="상호명"
                  name="store_name"
                  value={value.request.businessName}
                  onChange={(e) => handleChangeValue("businessName", e)}
                />
                <Input
                  placeholder="금액"
                  name="amount"
                  type="number"
                  className="appearance-none no-spinner"
                  value={value.request.amount === 0 ? "" : value.request.amount}
                  onChange={(e) => handleChangeValue("amount", e)}
                />
                <Input
                  placeholder="메모"
                  name="etc"
                  value={value.request.etc}
                  onChange={(e) => handleChangeValue("etc", e)}
                />
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
        {preview && (
          <>
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full border border-gray-300 rounded-lg"
            />
            <p>영수증 정보를 인식중입니다.</p>
          </>
        )}
      </form>
    </Modal>
  );
};

export default AddModal;
