interface IReceiptsImgCardProps {
  src: string;
  date: string;
}

const ReceiptsImgCard = ({ src, date }: IReceiptsImgCardProps) => {
  return (
    <div className="rounded-[8px] w-[97px] md:w-[144px] gap-2 h-[179px] p-3 border border-gray-05 flex flex-col justify-center items-center">
      <h3 className="caption-med-12 text-gray-02">{date}</h3>
      <div className="w-[73px] h-[130px] bg-gray-300">
        <img src={src} alt="영수증 이미지" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default ReceiptsImgCard;
