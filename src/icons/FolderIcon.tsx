interface FolderIconProps {
  className?: string;
}

const FolderIcon = ({ className }: FolderIconProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_332_713)">
        <path d="M13.5 7.5H9.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path
          d="M1.5 5.2125C1.5 4.55025 1.5 4.2195 1.5525 3.9435C1.66442 3.35088 1.95235 2.80575 2.37874 2.37923C2.80512 1.95271 3.35016 1.6646 3.94275 1.5525C4.2195 1.5 4.551 1.5 5.2125 1.5C5.502 1.5 5.6475 1.5 5.787 1.51275C6.38778 1.56917 6.95759 1.80546 7.422 2.19075C7.53 2.28 7.632 2.382 7.8375 2.5875L8.25 3C8.862 3.612 9.168 3.918 9.534 4.12125C9.73516 4.23337 9.94857 4.32195 10.17 4.38525C10.5735 4.5 11.0063 4.5 11.871 4.5H12.1515C14.1255 4.5 15.1133 4.5 15.7545 5.0775C15.814 5.13 15.87 5.186 15.9225 5.2455C16.5 5.88675 16.5 6.8745 16.5 8.8485V10.5C16.5 13.3282 16.5 14.7427 15.621 15.621C14.742 16.4992 13.3282 16.5 10.5 16.5H7.5C4.67175 16.5 3.25725 16.5 2.379 15.621C1.50075 14.742 1.5 13.3282 1.5 10.5V5.2125Z"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </g>
      <defs>
        <clipPath id="clip0_332_713">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FolderIcon;
