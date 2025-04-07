interface LogoIconProps {
  className?: string;
}

const LogoIcon = ({ className }: LogoIconProps) => {
  return (
    <svg
      className={className}
      width="38"
      height="22"
      viewBox="0 0 38 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.3793 8.06792C35.3793 8.56916 35.3005 8.95583 35.143 9.22793C34.9998 9.48571 34.7348 9.70768 34.3481 9.89385C33.9185 10.0943 33.1452 10.2734 32.0281 10.4309C30.9111 10.5884 29.6938 10.6672 28.3763 10.6672C27.0731 10.6672 25.8629 10.5956 24.7459 10.4524C23.6289 10.2948 22.8627 10.1158 22.4474 9.91534C22.0464 9.72916 21.7671 9.50003 21.6096 9.22793C21.4521 8.95583 21.3733 8.56916 21.3733 8.06792V2.33236C21.3733 1.94569 21.5094 1.64495 21.7815 1.43013C22.0679 1.21532 22.4044 1.10791 22.7911 1.10791C23.1778 1.10791 23.5071 1.21532 23.7792 1.43013C24.0657 1.64495 24.2089 1.94569 24.2089 2.33236V3.68569H32.5437V2.33236C32.5437 1.94569 32.6798 1.64495 32.9519 1.43013C33.2383 1.21532 33.5748 1.10791 33.9615 1.10791C34.3482 1.10791 34.6775 1.21532 34.9496 1.43013C35.2361 1.64495 35.3793 1.94569 35.3793 2.33236V8.06792ZM18.7526 12.9442C18.7526 12.6148 18.8671 12.3284 19.0963 12.085C19.3254 11.8272 19.619 11.6983 19.977 11.6983C20.1059 11.6983 20.2348 11.7198 20.3637 11.7627C22.7839 12.3929 25.4548 12.7079 28.3763 12.7079C31.2978 12.7079 33.9686 12.3929 36.3889 11.7627C36.4748 11.7341 36.6037 11.7198 36.7756 11.7198C37.1336 11.7198 37.4272 11.8415 37.6563 12.085C37.8854 12.3284 38 12.6148 38 12.9442C38 13.2163 37.9141 13.4669 37.7422 13.6961C37.5704 13.9252 37.3126 14.0828 36.9689 14.1687C34.878 14.7558 32.4936 15.0924 29.8155 15.1783V20.3554C29.8155 20.7563 29.6723 21.0714 29.3859 21.3005C29.1138 21.5297 28.7773 21.6442 28.3763 21.6442C27.9896 21.6442 27.6531 21.5297 27.3667 21.3005C27.0802 21.0714 26.937 20.7563 26.937 20.3554V15.1783C24.259 15.0924 21.8745 14.7558 19.7837 14.1687C19.44 14.0828 19.1822 13.9252 19.0103 13.6961C18.8385 13.4669 18.7526 13.2163 18.7526 12.9442ZM24.2089 7.65978C24.2089 7.7457 24.2662 7.80299 24.3807 7.83163C24.6815 7.91755 25.2185 8.00348 25.9918 8.08941C26.7652 8.17533 27.56 8.2183 28.3763 8.2183C29.1926 8.2183 29.9874 8.17533 30.7607 8.08941C31.5341 8.00348 32.0711 7.91755 32.3718 7.83163C32.4864 7.80299 32.5437 7.73138 32.5437 7.61681V6.07014H24.2089V7.65978Z"
        fill="#FFD563"
      />
      <path
        d="M14.1348 1.60188C14.1348 1.18657 14.2852 0.864345 14.586 0.635209C14.8867 0.406072 15.2161 0.291504 15.5741 0.291504C15.9321 0.291504 16.2615 0.406072 16.5623 0.635209C16.863 0.864345 17.0134 1.18657 17.0134 1.60188V10.9034C17.0134 11.3187 16.863 11.6409 16.5623 11.87C16.2615 12.0992 15.9321 12.2137 15.5741 12.2137C15.2161 12.2137 14.8867 12.0992 14.586 11.87C14.2852 11.6409 14.1348 11.3187 14.1348 10.9034V1.60188ZM0 2.71892C0 2.26064 0.13605 1.91694 0.408149 1.6878C0.680248 1.44435 1.05259 1.32262 1.52519 1.32262H4.44668C4.84766 1.32262 5.15557 1.43719 5.37038 1.66632C5.59952 1.88114 5.71409 2.17472 5.71409 2.54706C5.71409 2.91941 5.59952 3.22015 5.37038 3.44929C5.15557 3.6641 4.84766 3.77151 4.44668 3.77151H2.7926V8.1967C2.7926 8.31127 2.84988 8.38288 2.96445 8.41152C3.16494 8.44016 3.40124 8.45448 3.67334 8.45448C3.81655 8.45448 4.01704 8.44016 4.27482 8.41152C4.5326 8.38288 4.71877 8.36856 4.83334 8.36856C5.10544 8.36856 5.33458 8.46164 5.52075 8.64782C5.70692 8.83399 5.80001 9.10609 5.80001 9.46411C5.80001 10.0226 5.53507 10.4165 5.0052 10.6456C4.8047 10.7315 4.52544 10.796 4.16742 10.8389C3.82371 10.8819 3.51581 10.9034 3.24371 10.9034C2.42741 10.9034 1.72568 10.8175 1.13852 10.6456C0.737532 10.531 0.443951 10.3234 0.257778 10.0226C0.085926 9.72189 0 9.29942 0 8.75522V2.71892ZM3.56593 16.9397C3.56593 16.0088 3.84519 15.1854 4.40371 14.4693C4.96223 13.7533 5.74273 13.1947 6.7452 12.7938C7.76199 12.3784 8.92915 12.1708 10.2467 12.1708C11.5642 12.1708 12.7242 12.3784 13.7267 12.7938C14.7435 13.1947 15.524 13.7533 16.0682 14.4693C16.6267 15.1854 16.906 16.0088 16.906 16.9397C16.906 17.8705 16.6267 18.694 16.0682 19.4101C15.524 20.1261 14.7435 20.6846 13.7267 21.0856C12.7242 21.5009 11.5642 21.7086 10.2467 21.7086C8.92915 21.7086 7.76199 21.5009 6.7452 21.0856C5.74273 20.6846 4.96223 20.1261 4.40371 19.4101C3.84519 18.694 3.56593 17.8705 3.56593 16.9397ZM6.38001 2.71892C6.38001 2.26064 6.51606 1.91694 6.78816 1.6878C7.06026 1.44435 7.43261 1.32262 7.9052 1.32262H11.02C11.421 1.32262 11.7289 1.43719 11.9437 1.66632C12.1729 1.88114 12.2874 2.17472 12.2874 2.54706C12.2874 2.91941 12.1729 3.22015 11.9437 3.44929C11.7289 3.6641 11.421 3.77151 11.02 3.77151H9.17261V8.1967C9.17261 8.31127 9.2299 8.38288 9.34446 8.41152C9.5736 8.44016 9.83138 8.45448 10.1178 8.45448L10.9126 8.41152L11.6859 8.36856C11.9867 8.36856 12.2301 8.4688 12.4163 8.6693C12.6025 8.85547 12.6956 9.10609 12.6956 9.42115C12.6956 9.72189 12.6383 9.96535 12.5237 10.1515C12.4235 10.3234 12.266 10.4666 12.0511 10.5812C11.8793 10.6814 11.5714 10.7602 11.1274 10.8175C10.6835 10.8747 10.2395 10.9034 9.79558 10.9034C9.29434 10.9034 8.90051 10.8891 8.61409 10.8604C8.34199 10.8318 8.04841 10.7745 7.73335 10.6886C7.23211 10.5597 6.88125 10.3449 6.68075 10.0441C6.48026 9.74337 6.38001 9.31374 6.38001 8.75522V2.71892ZM6.44446 16.9397C6.44446 17.6414 6.77384 18.1999 7.43261 18.6152C8.10569 19.0449 9.04372 19.2597 10.2467 19.2597C11.4497 19.2597 12.3805 19.0449 13.0393 18.6152C13.6981 18.1999 14.0274 17.6414 14.0274 16.9397C14.0274 16.238 13.6981 15.6794 13.0393 15.2641C12.3805 14.8345 11.4497 14.6197 10.2467 14.6197C9.04372 14.6197 8.10569 14.8345 7.43261 15.2641C6.77384 15.6794 6.44446 16.238 6.44446 16.9397Z"
        fill="#FFD563"
      />
    </svg>
  );
};

export default LogoIcon;
