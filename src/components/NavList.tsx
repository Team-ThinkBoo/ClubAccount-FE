import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { LinkProps } from "react-router-dom";

interface NavListProps extends LinkProps {
  children: ReactNode;
}

const NavList = ({ children, ...props }: NavListProps) => {
  return (
    <li className="flex items-center justify-center w-16 body-bold-16 text-gray-03">
      <NavLink {...props} className={({ isActive }) => (isActive ? "text-primary" : "")}>
        {children}
      </NavLink>
    </li>
  );
};

export default NavList;
