import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
const ErrorMessage: FC<Props> = ({ children, ...props }) => {
  return <span {...props}>{children}</span>;
};

export default ErrorMessage;
