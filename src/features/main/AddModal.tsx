import { FormEvent, useState } from "react";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Selector from "../../components/Selector";
import { AddModalType } from "../../types/types";
import CameraIcon from "../../icons/CameraIcon";
import FolderIcon from "../../icons/FolderIcon";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

type categoryType = "회식비" | "용품 구매비" | "정기 구독비" | "대관비" | "기타";

const category: categoryType[] = ["회식비", "용품 구매비", "정기 구독비", "대관비", "기타"];

interface AddModalProps {
  type: AddModalType;
  open: boolean;
  onCloseModal: () => void;
}

const AddModal = ({ type, open, onCloseModal }: AddModalProps) => {
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    console.log(data);
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
        <h1 className="title-extra-18 text-gray-01">
          {type === "self" ? "직접 등록하기" : "스캔으로 등록하기"}
        </h1>
        <div className="flex flex-col w-full gap-5 pt-4">
          <div className="flex flex-col w-full gap-3">
            {type === "receipt" && (
              <div className="flex items-center justify-center w-full gap-3 px-3">
                <button
                  className="flex gap-2 justify-center items-center px-3 py-2 rounded-lg bg-gray-05 body-med-14 text-gray-02 w-[calc(50%-6px)]"
                  type="button"
                >
                  <CameraIcon />
                  <p>사진 촬영</p>
                </button>
                <button
                  className="flex gap-2 justify-center items-center px-3 py-2 rounded-lg bg-gray-05 body-med-14 text-gray-02 w-[calc(50%-6px)]"
                  type="button"
                >
                  <FolderIcon />
                  불러 오기
                </button>
              </div>
            )}
            <Selector
              selectTitle={"카테고리"}
              selectList={category}
              dataTitle={(data) => data}
              dataValue={(data) => data}
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
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
            <Input placeholder="상호명" name="store_name" />
            <Input placeholder="금액" name="amount" />
            <Input placeholder="메모" name="etc" />
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
      </form>
    </Modal>
  );
};

export default AddModal;
