import { UserDto } from '@dtos/UserDto';
import { api } from '@services/api';
import { createContext, ReactNode, useState } from 'react';

export type AuthContextDataProps = {
  user: UserDto;
  signIn: (email: string, password: string) => Promise<void>; 
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDto>({} as UserDto);

  async function signIn(email: string, password: string) {
    try {
      const {data} = await api.post('/sessions', {email, password});
      console.log(data)
      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}