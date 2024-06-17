"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project } from '../interfaces';
import { httpRequest } from '../http';

interface ProjectContextType {
  projects: Project[] | null;
  setProjects: (projects: Project[] | null) => void;
  fetchProjects: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[] | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await httpRequest("GET","/projects");

      if(response){
        setProjects(response)
      }

    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, setProjects, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
