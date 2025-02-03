import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-2xl mt-6 mb-4 md:mb-6 font-semibold break-keep break-words">
      {children}
    </h1>
  );
}
