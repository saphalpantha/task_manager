import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { create } from "zustand";

const API_URL = process.env.API_URL || 'http://localhost:3000/api';






export enum TaskStatus {
  PENDING = "P",
  ON_PROGRESS = "I",
  COMPLETED = "C",
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status?: TaskStatus;
}


interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchTaskSingle: (id: number) => Promise<void>;
  createTask: (tasks: TaskFormData) => Promise<void>;
  updateTask: (id: number, task: Partial<TaskFormData>) => Promise<void>;
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

  createTask: async (tasks: TaskFormData) => {
    set({ isLoading: true });
    try {
      const auth_token = localStorage.getItem('auth_token');
      // console.log('isnide ');
      if (!auth_token) {
        set({ error: 'Authentication Token Missing' });
        return;
      }
      const jwtDecoded = jwtDecode(auth_token);

      if (!jwtDecoded?.user_id) {
        set({ error: 'Invalid User' });
        return;
      }
      const updatedInput = {
        ...tasks,
        user: jwtDecoded?.user_id
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/api/tasks/`, updatedInput, {
        headers: { Authorization: `Bearer ${auth_token}` },
      });




      console.log(jwtDecoded, 'works response');

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
      if (!auth_token) {
        set({ error: 'Authentication Token Missing' });
        return;
      }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/api/tasks/`, {
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


  fetchTaskSingle: async (id) => {
    set({ isLoading: true });
    try {
      const auth_token = localStorage.getItem('auth_token');
      if (!auth_token) {
        set({ error: 'Authentication Token Missing' });
        return;
      }
      if (!id) {
        set({ error: 'Id required to Update this task' })
      }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/api/tasks/${id}/`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });
      set({ tasks: response.data, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch task' });
    } finally {
      set({ isLoading: false });
    }
  },



  updateTask: async (id, task) => {
    set({ isLoading: true });
    const isTaskCompleted = task.status === "C";
    try {
      const auth_token = localStorage.getItem('auth_token');
      // console.log('isnide ');
      if (!auth_token) {
        set({ error: 'Authentication Token Missing' });
        return;
      }
      const jwtDecoded = jwtDecode(auth_token);

      if (!jwtDecoded?.user_id) {
        set({ error: 'Invalid User' });
        return;
      }
      const updatedInput = {
        ...task,
        user: jwtDecoded?.user_id
      }

      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URI}/api/tasks/${id}/`, updatedInput, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });



      set((state) => {
        const updatedTasks = state.tasks.map((t) => (t.id === id ? response.data : t));

        // if (response.data.status === "C") {
        //   // state.deleteTask(id);
        //   return { tasks: updatedTasks.filter((t) => t.id !== id), error: null };
        // }

        return { tasks: updatedTasks, error: null };
      });
    } catch (error) {
      set({ error: 'Failed to update task' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true });
    try {
      const auth_token = localStorage.getItem('auth_token');
      if (!auth_token) {
        set({ error: 'Authentication Token Missing' });
        return;
      }
      const jwtDecoded = jwtDecode(auth_token);

      if (!jwtDecoded?.user_id) {
        set({ error: 'Invalid User' });
        return;
      }
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URI}/api/tasks/${id}/`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });
      toast(`Task ${id} Deleted Successfully !`);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        error: null,
      }));
    } catch (error) {
      toast("Failed to Delete");
      set({ error: 'Failed to delete task' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
