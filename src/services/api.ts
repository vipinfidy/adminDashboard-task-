
import { toast } from "sonner";

const API_URL = "https://reqres.in/api";
const API_KEY = import.meta.env.VITE_REQRES_API_KEY;

const headers = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export async function fetchUsers(page: number = 1, per_page: number = 10): Promise<UserResponse> {
  try {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`,{headers});
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to fetch users");
    throw error;
  }
}

export async function fetchUser(id: number): Promise<{ data: User }> {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    toast.error(`Failed to fetch user ${id}`);
    throw error;
  }
}

export interface Resource {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface ResourceResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Resource[];
}

export async function fetchResources(page: number = 1, per_page: number = 10): Promise<ResourceResponse> {
  try {
    const response = await fetch(`${API_URL}/unknown`,{headers});
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching resources:", error);
    toast.error("Failed to fetch resources");
    throw error;
  }
}
