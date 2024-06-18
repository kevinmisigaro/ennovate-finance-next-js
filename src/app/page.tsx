"use client";

import { httpRequest } from "@/utils/http";
import { useSingleProject } from "@/utils/store/SingleProjectContext";
import { useUser } from "@/utils/store/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { setUser } = useUser();
  const {setProjectId} = useSingleProject()
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await httpRequest("POST", "/login", {
        email: "kevin@ennovateventures.co",
        password: "Test1234!",
      });

      if (response) {
        setUser(response.user);
        localStorage.setItem("token", response.token);

        if(!localStorage.getItem("projectId")){
          setProjectId("0")
        }

        router.push("/overview");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-[100vh]">
      <div
        onClick={handleLogin}
        className="px-16 py-4 text-white bg-blue-600 cursor-pointer"
      >
        Login
      </div>
    </div>
  );
}
