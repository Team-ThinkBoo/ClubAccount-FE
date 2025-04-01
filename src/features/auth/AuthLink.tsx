import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

interface AuthLinkProps extends LinkProps {
  children: ReactNode;
}
const AuthLink = ({ children, ...props }: AuthLinkProps) => {
  return (
    <Link className="caption-med-12 text-grey-03" {...props}>
      <span>{children}</span>
    </Link>
  );
};

export default AuthLink;
