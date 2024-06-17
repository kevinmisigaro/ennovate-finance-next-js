"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  useEffect(() => {
    const storedProjectId = localStorage.getItem('projectId');
    if (storedProjectId) {
      setProjectIdState(storedProjectId);
    }
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
