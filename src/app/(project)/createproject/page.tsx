"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { httpRequest } from "@/utils/http";
import { useProjects } from "@/utils/store/ProjectContext";
import { useState } from "react";
import { FadeLoader } from "react-spinners";

function Page() {
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchProjects } = useProjects();

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await httpRequest("POST", "/projects/create", {
        title,
      });

      if (response) {
        setTitle("");
        fetchProjects();
        setLoading(false);
      }
    } catch (error) {}
  };

  return (
    <DashboardLayout>
      <div>
        <div className="text-2xl font-semibold mb-5">Create Project</div>

        <div className="flex flex-col gap-y-5">
          <div>
            <p className="font-semibold">Title</p>
            <input
            value={title}
              onChange={handleTitleChange}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>

          {loading ? (
            <div className="px-28 py-2 rounded-md text-white bg-black max-w-fit cursor-pointer">
              <FadeLoader color="#ffbb00" />
            </div>
          ) : (
            <div
              onClick={handleSubmit}
              className="px-28 py-5 rounded-md text-white bg-black max-w-fit cursor-pointer"
            >
              Create Project
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Page;
