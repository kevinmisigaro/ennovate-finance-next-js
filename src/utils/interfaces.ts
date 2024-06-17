// types/User.ts
export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Project {
    id: number
    name: string
    image?: string
    user: User
  }

  export interface Expenditure{
    id: number
    title: string
    amount: number
    project: Project
  }