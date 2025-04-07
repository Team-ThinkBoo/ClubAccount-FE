interface AddIconProps {
  className?: string;
}

const AddIcon = ({ className }: AddIconProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 9H9M9 9H3M9 9V3M9 9V15"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AddIcon;
