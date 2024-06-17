import { ReactNode } from "react";
import SideMenu from "./SideMenu";
import TopMenu from "./TopMenu";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen">
     <TopMenu />
      <div className="flex flex-row">
        <SideMenu />
        <div className="basis-10/12 p-10">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
