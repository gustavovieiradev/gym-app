import { UserDto } from '@dtos/UserDto';
import { api } from '@services/api';
import { storageUserGet, storageUserSave } from '@storage/storageUser';
import { createContext, ReactNode, useEffect, useState } from 'react';

export type AuthContextDataProps = {
  user: UserDto;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDto>({} as UserDto);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      
      const {data} = await api.post('/sessions', {email, password});

      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
      
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {  
      const userLogged = await storageUserGet();

      if (!!userLogged?.id) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>
  )
}