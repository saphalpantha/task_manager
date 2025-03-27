import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {jwtDecode} from 'jwt-decode'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const isTokenValid = (token:any) => {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const exp = decoded?.exp;

    if (!exp) return true;
    
    return Date.now() < exp * 1000;

  } catch (error) {
    return false;
  }
};