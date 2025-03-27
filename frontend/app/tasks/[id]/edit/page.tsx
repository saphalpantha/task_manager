import TaskForm from '@/components/TaskForm'
import React from 'react'

const page = async ({params}:{params: Promise<{slug:string}>}) => {
  const slug = await params;
  return (
    <TaskForm id={+slug?.id} type='update'/>
  )
}

export default page
