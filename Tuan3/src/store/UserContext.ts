import { createContext } from "react";
interface UserContextType {
    user: User | null;
}
interface User {
    name: string;
    email: string;
    avatar: string;
}
export const UserContext= createContext<UserContextType | null>(null);