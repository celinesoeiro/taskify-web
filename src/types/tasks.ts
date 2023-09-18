export interface Task {
  title: string;
  description: string;
  id: string;
  completed: boolean;
  completed_at: Date;
  updated_at: Date;
}

export interface StoredTaskProps {
  id: number;
  title: string;
  description: string;
  completed_at: null | Date;
}

export interface CreateTaskProps {
  title: string;
  description: string;
}