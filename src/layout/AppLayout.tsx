import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}

function AppLayout({ children }: PropsType) {
  return (
    <div className=" grid h-screen w-screen grid-cols-[minmax(380px,0.35fr)_1fr] grid-rows-[60px_1fr] bg-gray-100 dark:bg-black">
      {children}
    </div>
  );
}

export default AppLayout;
