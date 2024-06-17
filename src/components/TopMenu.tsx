"use client";

import { useRouter } from "next/navigation";
import ProjectsDropDown from "./ProjectsDropDown";
import { useUser } from "@/utils/store/UserContext";
import { getInitials } from "@/utils/functions";

function TopMenu() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null); // Clear user details
    router.push("/");
  };

  return (
    <div className="navbar bg-[#ffbb00] text-black">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Ennovate Ventures Finance</a>
      </div>
      <div className="flex-none gap-x-5">
        <ProjectsDropDown />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <div className="avatar placeholder">
                <div className="bg-black text-gray-100 rounded-full w-8">
                  <span className="text-xs">{getInitials(user?.name)}</span>
                </div>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#ffbb00] text-black rounded-box w-52"
          >
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
