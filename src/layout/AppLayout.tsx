import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}

function AppLayout({ children }: PropsType) {
  return (
    <div className=" grid h-screen w-screen grid-cols-[300px_1fr] grid-rows-[80px_1fr] bg-red-200 dark:bg-black">
      {children}
    </div>
  );
}

export default AppLayout;
