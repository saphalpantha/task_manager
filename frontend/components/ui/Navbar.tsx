'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './button';
import { ClipboardList, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react'
;
import { isTokenExpired } from '@/lib/utils';

export function Navbar() {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>(false);


 useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };





  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ClipboardList className="h-6 w-6" />
              <span className="text-xl font-bold">Manage Todo</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {
                isAuth ??
                <Link href="/tasks">
              <Button variant="ghost">Tasks</Button>
            </Link>
            }
            {
                isAuth ? 
                
                
                <Button 
                variant="outline" 
                className="flex items-center space-x-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>  : 
                            <Link href={"/login"}>
                            <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                
            >
              <LogOut className="h-4 w-4" />
              <span>Login</span>
            </Button>
                </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}