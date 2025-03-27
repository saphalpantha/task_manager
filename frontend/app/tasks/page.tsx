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
import { TaskStatus, useTaskStore } from '@/lib/store';
import { Skeleton } from '@/components/ui/skeleton';

export default function TaskList() {
  const { tasks, isLoading, error, fetchTasks, updateTask, deleteTask } = useTaskStore();


  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading) {
    return (
        <div className='flex flex-col gap-4 max-w-5xl mx-auto justify-center  items-center p-5'>
          {new Array(10).fill(0)?.map(i => (
            <Skeleton className="w-full bg-accent-foreground h-[20px] rounded-full" />
            
          ))}
        </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (

    <div className="container max-w-7xl md:max-w-[600px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Link href="/tasks/new">
          <Button>Create New Task</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        
        { tasks &&  tasks.length === 0 ? <div className='flex text-center justify-center items-center text-sidebar-accent font-bold text-2xl'>No Tasks.</div> : (tasks || [])?.map((task) => (
          <Card  key={task.id} className="p-4 border-b-accent-foreground shadow-accent">
            <div className="flex items-center  justify-between">
              <div className="flex items-center space-x-4">
                <div className='flex flex-col gap-2'>
                  <h3 className={`text-lg font-semibold ${task.status === "C" ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  <p className="text-muted-foreground">{task.description}</p>
                  <p className="text-[0.9rem] text-gray-400">
                    Created: {new Date(task.created_at).toLocaleDateString()}
                  </p>
                  <Select defaultValue={task.status} onValueChange={(newStatus:TaskStatus) => updateTask(task.id, {...task, status:newStatus})} >
  <SelectTrigger className="w-[180px] py-2">
    <SelectValue placeholder="Status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="P">Pending</SelectItem>
    <SelectItem value="I">In Progress</SelectItem>
    <SelectItem value="C">Completed</SelectItem>
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