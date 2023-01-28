import { UserDto } from '@dtos/UserDto';
import { api } from '@services/api';
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser';
import { createContext, ReactNode, useEffect, useState } from 'react';

export type AuthContextDataProps = {
  user: UserDto;
  signIn: (email: string, password: string) => Promise<void>;
  updateUserProfile: (userUpdated: UserDto) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDto>({} as UserDto);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function userAndTokenUpdate(user: UserDto, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token) {
        setIsLoadingUserStorageData(true);
        storageUserSave(data.user);
        storageAuthTokenSave(data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDto) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserRemove();
      await storageAuthTokenRemove();

      setUser({} as UserDto);
    } catch (err) {
      throw err;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (!!userLogged?.id && token) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        updateUserProfile,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
