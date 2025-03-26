import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const isTokenExpired = (token:any) => {
  if (!token) return true;
  
  const { exp } = JSON.parse(atob(token.split('.')[1]));
  if (!exp) return true;

  return Date.now() >= exp * 1000;
};