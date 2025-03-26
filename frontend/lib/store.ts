import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.API_URL || 'http://localhost:3000/api';





enum TaskStatus{
    PENDING =  "PENDING",
    ON_PROGRESS =  "ON_PROGRESS",
    COMPLETED = "COMPLETED",
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
  updated_at : string;
}


interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (tasks: Task[]) => Promise<void>;
  updateTask: (id: number, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}


const tasks = [
  {
    id: 1,
    title: "Design Homepage UI",
    description: "Create wireframes and design the homepage layout",
    status: TaskStatus.PENDING,
    created_at: "2024-03-20T10:30:00Z",
    updated_at: "2024-03-21T12:00:00Z",
  },
  {
    id: 2,
    title: "Develop API Endpoints",
    description: "Build RESTful API endpoints for user authentication",
    status: TaskStatus.ON_PROGRESS,
    created_at: "2024-03-18T09:00:00Z",
    updated_at: "2024-03-25T15:45:00Z",
  },
  {
    id: 3,
    title: "Write Documentation",
    description: "Document API endpoints and system architecture",
    status: TaskStatus.COMPLETED,
    created_at: "2024-03-10T14:20:00Z",
    updated_at: "2024-03-22T18:30:00Z",
  },
  {
    id: 4,
    title: "Set Up CI/CD Pipeline",
    description: "Automate deployment process using GitHub Actions",
    status: TaskStatus.PENDING,
    created_at: "2024-03-23T08:15:00Z",
    updated_at: "2024-03-23T08:15:00Z",
  },
  {
    id: 5,
    title: "Optimize Database Queries",
    description: "Improve query performance and indexing strategies",
    status: TaskStatus.ON_PROGRESS,
    created_at: "2024-03-19T11:45:00Z",
    updated_at: "2024-03-24T10:10:00Z",
  },
];

console.log(tasks);


export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  createTask: async (tasks: Task[]) => {
  set({ isLoading: true });
  try {
    const token = localStorage.getItem("token");
        const auth_token = localStorage.getItem('auth_token');
        if(!auth_token){
            set({error:'Authentication Token Missing'});
            return;
        }

    const response = await axios.post(`${API_URL}/tasks/`, tasks, {
      headers: { Authorization: `Bearer ${token}` },
    });

    set((state) => ({
      tasks: [...state.tasks, ...response.data],
      error: null,
    }));
  } catch (error) {
    console.error("Error creating tasks:", error);
    set({ error: error?.data?.message || "Failed to create tasks" });
  } finally {
    set({ isLoading: false });
  }
},



  fetchTasks: async () => {
    set({ isLoading: true });
    try {
        const auth_token = localStorage.getItem('auth_token');
        if(!auth_token){
            set({error:'Authentication Token Missing'});
            return;
        }
      const response = await axios.get(`${API_URL}/tasks/`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });
      set({ tasks: response.data, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch tasks' });
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (task) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/tasks/`, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set((state) => ({
        tasks: [...state.tasks, response.data],
        error: null,
      }));
    } catch (error) {
      set({ error: 'Failed to add task' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTask: async (id, task) => {
    set({ isLoading: true });
    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}/`, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? response.data : t)),
        error: null,
      }));
    } catch (error) {
      set({ error: 'Failed to update task' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`${API_URL}/tasks/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        error: null,
      }));
    } catch (error) {
      set({ error: 'Failed to delete task' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
