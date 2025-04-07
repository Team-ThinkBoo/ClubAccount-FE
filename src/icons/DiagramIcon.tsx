interface DiagramIconProps {
  className?: string;
}

const DiagramIcon = ({ className }: DiagramIconProps) => {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33 33H18C10.929 33 7.3935 33 5.196 30.8025C3 28.608 3 25.071 3 18V3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M28.5 22.5L23.823 16.611C23.1075 15.708 22.749 15.2565 22.338 15.036C22.026 14.8692 21.6791 14.7784 21.3255 14.7708C20.9718 14.7633 20.6213 14.8392 20.3025 14.9925C19.8825 15.195 19.506 15.63 18.75 16.5C17.994 17.37 17.6175 17.805 17.1975 18.0075C16.8788 18.1603 16.5285 18.2358 16.1751 18.228C15.8217 18.2202 15.4752 18.1292 15.1635 17.9625C14.7525 17.7435 14.394 17.292 13.6785 16.3905L9 10.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DiagramIcon;
