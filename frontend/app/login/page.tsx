"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react'
import axios from 'axios';

interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();



  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/api/token/`, data);

      if (response.data?.access && response.data?.refresh) {
        setIsLoading(false)
        console.log(response.data?.access);
        localStorage.setItem('auth_token', response.data?.access);
        router.push('/tasks');
      }

    } catch (error) {
      setIsLoading(false)
      console.log(error)
      setError('Invalid credentials');
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-foreground py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8 shadow-2xl bg-white  border-secondary-foreground">
        <div className="text-center">
          <div className="flex justify-center">
            <Lock className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-primary">Sign in to your account</h2>
        </div>
        <form className="mt-8 text-background space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className='flex flex-col space-y-2'>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                {...register('username', { required: 'Username is required' })}
                className={errors.username ? 'border-red-500' : ''}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className='flex flex-col space-y-2'>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <Button type="submit" className="w-full">
            {!isLoading ? 'Sign in' : 'Signing In..'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Login;