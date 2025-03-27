'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { TaskFormData, TaskStatus, useTaskStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


  type TypeAction = "create" | "update"

export default function TaskForm({type, id}:{type:TypeAction, id?:number}) {
  const router = useRouter();
  const { tasks,createTask, updateTask } = useTaskStore();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TaskFormData>();

  if(!id && type === "update"){
    return;
  }

  const singleTask = tasks.filter(task => task.id === +id);
  
  console.log(singleTask)

  if((!id || singleTask.length === 0 ) &&  type ===  "update"){
    return (
        <div className='flex flex-col gap-4 max-w-5xl mx-auto justify-center  items-center p-5'>

        <Skeleton className='max-w-4xl w-full bg-accent-foreground h-[20rem] rounded-md'/>
        </div>
    )
  }

  const onSubmit = async (data: TaskFormData ) => {
    try {
        if(type === "create"){
            await createTask( data );
            toast("Task Created");
            
        }
        else if(type === "update" && id){

            console.log(data,'this works for update');
            
            await updateTask(id, data);

            toast("Task Updated");

        }
        router.push('/tasks');
    } catch (error) {
        if(type === "create" ){
            toast("Failed to Create Task");
        }else{
            toast("Failed  to Update Task");
        }
      console.error('Failed to mutate task:', error);
    }
  };

  

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Task</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
            defaultValue={singleTask[0]?.title}
              id="title"
            //   value={singleTask[0]?.title}
              {...register('title', { required: 'Title is required' })}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
                defaultValue={singleTask[0]?.description}
              id="description"
              {...register('description', { required: 'Description is required' })}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

{ type !== "create" && <Select
  defaultValue={singleTask[0]?.status}
  onValueChange={(value) => setValue("status", value as TaskStatus)}
>
  <SelectTrigger className="w-[180px] py-2">
    <SelectValue placeholder="Select Status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="P">Pending</SelectItem>
    <SelectItem value="I">In Progress</SelectItem>
    <SelectItem value="C">Completed</SelectItem>
  </SelectContent>
</Select>}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/tasks')}
            >
              Cancel
            </Button>
            <Button type="submit">{type === "create" ? "Create" : "Update"} Tasks</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}