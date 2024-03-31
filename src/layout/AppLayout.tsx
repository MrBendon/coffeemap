import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
  hi?:string;
}

function AppLayout({ children }: PropsType) {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-100 md:grid md:grid-cols-[minmax(380px,0.35fr)_1fr] md:grid-rows-[60px_1fr] dark:bg-black">
      {children}
    </div>
  );
}

export default AppLayout;
