import { useProjects } from "@/utils/store/ProjectContext";
import { useRouter } from "next/navigation";

import { FaPlus } from "react-icons/fa";

function ProjectsDropDown() {
  const { projects } = useProjects();
  const router = useRouter();

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="m-1">
        Projects
      </div>
      {projects !== undefined && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-[#ffbb00] text-black rounded-box w-32"
        >
          {projects?.map((p, i) => (
            <li key={i}>
              <a>{p.name}</a>
            </li>
          ))}
          <li>
            <div
              onClick={() => {
                router.push("/createproject");
              }}
              className="flex flex-row items-center gap-x-2"
            >
              <FaPlus />
              <div>New</div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProjectsDropDown;
