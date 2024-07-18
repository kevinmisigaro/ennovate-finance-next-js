"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { httpRequest } from '../http';
import { Project } from '../interfaces';

interface SingleProjectContextType {
  projectId: string | null;
  setProjectId: (id: string) => void;
}

const SingleProjectContext = createContext<SingleProjectContextType | undefined>(undefined);

export const useSingleProject = () => {
  const context = useContext(SingleProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const SingleProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projectId, setProjectIdState] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  
  const fetchProjects = async () => {
    try {
      const response = await httpRequest("GET","/projects");

      if(response){
        setProjects(response)
        if(response.length > 0){
          const storedProjectId = localStorage.getItem('projectId');
          if (storedProjectId) {
            setProjectIdState(storedProjectId);
          }
        } else{
          localStorage.setItem("projectId", "0")
          setProjectIdState("0");
        }
      }

    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
   fetchProjects()
  }, []);

  const setProjectId = (id: string) => {
    localStorage.setItem('projectId', id);
    setProjectIdState(id);
  };

  return (
    <SingleProjectContext.Provider value={{ projectId, setProjectId }}>
      {children}
    </SingleProjectContext.Provider>
  );
};
