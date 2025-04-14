import AddIcon from "../../icons/AddIcon";
import ArchiveUpIcon from "../../icons/ArchiveUpIcon";
import ArrowDownIcon from "../../icons/ArrowDownIcon";
import { useState } from "react";
import BillIcon from "../../icons/BillIcon";
import AddModal from "./AddModal";
import { AddModalType } from "../../types/types";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const TimelineHeader = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [modalType, setModalType] = useState<AddModalType>("self");
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null
  });

  const handleOpenModal = (type: AddModalType) => {
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleToggleAddMenu = () => {
    setOpenAddMenu((pre) => !pre);
  };

  return (
    <>
      {openModal && <AddModal open={openModal} onCloseModal={handleCloseModal} type={modalType} />}
      <div className="flex flex-col gap-5 min-w-[312px] w-full max-w-[568px] md:min-w-[616px] md:max-w-[824px] lg:min-x-[824px] lg:max-w-[1024px]">
        <div className="flex items-center justify-center w-full h-8 bg-primary">
          <p className="text-gray-01 title-semi-18">Timeline</p>
        </div>

        <div className="flex justify-between px-6">
          <div className="flex items-center justify-center gap-2">
            <Datepicker
              inputName="date"
              inputClassName="p-0 w-60"
              containerClassName={"relative"}
              popupClassName={
                "transition-all ease-out duration-300 absolute z-10 mt-[1px] text-sm lg:text-xs 2xl:text-sm translate-y-4 opacity-0 hidden min-w-[296px]"
              }
              popoverDirection="down"
              readOnly
              i18n={"ko"}
              placeholder="기간 선택"
              useRange={false}
              primaryColor="amber"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              toggleIcon={() => <ArrowDownIcon />}
            />
          </div>

          <div className="relative">
            <div
              onClick={handleToggleAddMenu}
              className="flex items-center justify-center gap-1 cursor-pointer"
            >
              <AddIcon />
              <p>추가하기</p>
            </div>

            {openAddMenu && (
              <ul className="absolute right-0 flex flex-col justify-center gap-2 px-2 py-2 shadow-md rounded-xl w-max bg-warm-gray-03">
                <li
                  className="flex items-center gap-2 p-2 cursor-pointer rounded-xl hover:bg-warm-gray-01 focus:bg-warm-gray-01 active:bg-warm-gray-01"
                  onClick={() => {
                    handleOpenModal("self");
                    handleToggleAddMenu();
                  }}
                >
                  <ArchiveUpIcon className="w-4 h-4" />
                  <p className="body-med-14">직접 등록하기</p>
                </li>

                <li
                  onClick={() => {
                    handleOpenModal("receipt");
                    handleToggleAddMenu();
                  }}
                  className="flex items-center gap-2 p-2 cursor-pointer rounded-xl hover:bg-warm-gray-01 focus:bg-warm-gray-01 active:bg-warm-gray-01"
                >
                  <BillIcon className="w-4 h-4" />
                  <p className="body-med-14">영수증 스캔하기</p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineHeader;
