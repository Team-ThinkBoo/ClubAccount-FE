import { ElementType, ReactNode, useState } from "react";
import Modal from "../../components/Modal";
import CloseIcon from "../../icons/CloseIcon";

interface OverviewCardProps {
  title: string;
  subTitle: string;
  Icon: ElementType;
  ChartElement: ReactNode;
}

const OverviewCard = ({ title, subTitle, Icon, ChartElement }: OverviewCardProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="relative bg-white w-[328px] h-[337px] rounded-2xl flex justify-center items-center">
          {ChartElement}
          <button onClick={handleCloseModal} className="absolute cursor-pointer right-4 top-4">
            <CloseIcon />
          </button>
        </div>
      </Modal>
      <div
        onClick={handleOpenModal}
        className="relative h-full p-4 cursor-pointer bg-warm-gray-03 w-36 rounded-xl"
      >
        <p className="body-bold-16 text-gray-01">{title}</p>
        <p className="body-med-14 text-gray-01">{subTitle}</p>
        <Icon className="absolute right-4 bottom-4 text-warm-gray-01" />
      </div>
    </>
  );
};

export default OverviewCard;
