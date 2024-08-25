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
    count: number
    created_at: Date
  }

  export interface Income{
    id: number
    title: string
    amount: number
    project: Project
    count: number
    created_at: Date
  }