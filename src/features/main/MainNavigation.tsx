import { Link } from "react-router-dom";
import NavList from "../../components/NavList";

const menuList = [
  { title: "영수증", link: "receipts" },
  { title: "회계록", link: "accounting" },
  { title: "Q&A", link: "qna" }
];

const MainNavigation = () => {
  return (
    <header className="flex-shrink-0 w-full h-16 border-b-2 border-gray-05">
      <nav className="flex justify-between w-full h-full">
        <div className="flex items-center justify-center px-6">
          <h1 className="text-2xl font-extrabold text-primary">
            <Link to={"/12"}>띵부</Link>
          </h1>
        </div>
        <ul className="flex flex-1 justify-evenly">
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
