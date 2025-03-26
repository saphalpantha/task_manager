'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoaderCircle, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTaskStore } from '@/lib/store';

export default function TaskList() {
  const { tasks, isLoading, error, fetchTasks, updateTask, deleteTask } = useTaskStore();

  console.log(tasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading) {
    return (
        <LoaderCircle className='w-[45px] h-[45px]'/>
    );
  }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

  return (

    <div className="container max-w-7xl md:max-w-[600px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Link href="/tasks/new">
          <Button>Create New Task</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {tasks?.map((task) => (
          <Card key={task.id} className="p-4 border-b-accent-foreground shadow-accent">
            <div className="flex items-center  justify-between">
              <div className="flex items-center space-x-4">
                <div className='flex flex-col gap-2'>
                  <h3 className={`text-lg font-semibold ${task.status.COMPLETED ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  <p className="text-muted-foreground">{task.description}</p>
                  <p className="text-[0.9rem] text-gray-400">
                    Created: {new Date(task.created_at).toLocaleDateString()}
                  </p>
                  <Select>
  <SelectTrigger className="w-[180px] py-2">
    <SelectValue placeholder="Status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="PENDING">Pending</SelectItem>
    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
    <SelectItem value="COMPLETED">Completed</SelectItem>
  </SelectContent>
</Select>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link href={`/tasks/${task.id}/edit`}>
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}