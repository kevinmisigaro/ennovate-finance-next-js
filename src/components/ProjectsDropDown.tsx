import { useProjects } from "@/utils/store/ProjectContext";
import { useSingleProject } from "@/utils/store/SingleProjectContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

function ProjectsDropDown() {
  const { projects } = useProjects();
  const router = useRouter();
  const {projectId , setProjectId} = useSingleProject()

  const changeProject = (id: number) => {
    setProjectId(id.toString());
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="m-1">
        {projectId == "0"
          ? "Projects"
          : projects?.find((x) => x.id == parseInt(projectId!))?.name}
      </div>
      {projects !== undefined && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-[#ffbb00] text-black rounded-box w-32"
        >
          {projectId !== "0" ? (
            <li>
              <a
                onClick={() => {
                  changeProject(0);
                }}
              >
                {" "}
                Projects
              </a>
            </li>
          ) : (
            ""
          )}
          {projects?.map((p, i) => (
            <li key={i}>
              <a
                onClick={() => {
                  changeProject(p.id);
                }}
                className="hover:underline"
              >
                {p.name}
              </a>
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
