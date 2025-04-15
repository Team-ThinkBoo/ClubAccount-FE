interface ArrowLeftIconProps {
  className?: string;
}
const ArrowLeftIcon = ({ className }: ArrowLeftIconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5L9 12L15 19"
        stroke="#323232"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
