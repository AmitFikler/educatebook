import { createContext } from 'react';
import { UserType } from '../../../@types/@types';

interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

export const UserContext = createContext<null | UserContextType>(null);
