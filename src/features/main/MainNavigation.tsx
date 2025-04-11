import NavList from "../../components/NavList";
import { AUTH_SEARCH_PARAMS } from "../../constants/constants";
import LogoIcon from "../../icons/LogoIcon";
import { useAuthStore } from "../../store/useAuthStore";

const MainNavigation = () => {
  const { isLoggedIn } = useAuthStore();

  const menuList = isLoggedIn
    ? [
        { title: "영수증", link: "/receipts" },
        { title: "회계록", link: "/accounting" },
        { title: "Q&A", link: "/qna" }
      ]
    : [
        { title: "로그인", link: `/auth?mode=${AUTH_SEARCH_PARAMS.LOGIN}` },
        { title: "회원가입", link: `/auth?mode=${AUTH_SEARCH_PARAMS.SIGNUP}` }
      ];

  return (
    <header className="flex-shrink-0 h-16 border-b-2 border-gray-05">
      <nav className="flex items-center w-[360px] md:w-[768px] lg:w-[1024px] h-16">
        <div className="w-[38px] flex items-center justify-center ml-6 md:ml-[60px]">
          <LogoIcon />
        </div>
        <ul className="flex w-[243px] h-[56px] ml-12 my-1 mr-[7px] gap-3 md:ml-20 md:mr-[291px] lg:mr-[547px] md:gap-10 md:w-[299px] lg:w-[299px]">
          {menuList.map((menu) => (
            <NavList key={menu.title} to={menu.link}>
              {menu.title}
            </NavList>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
