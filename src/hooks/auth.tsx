import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface Recipient {
  id: string;
  name: string;
  email: string;
  address: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  CEP: string;
}

interface AuthState {
  token: string;
  recipient: Recipient;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  recipient: Recipient;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, recipient] = await AsyncStorage.multiGet([
        '@Postex:token',
        '@Postex:recipient',
      ]);

      if (token[1] && recipient[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], recipient: JSON.parse(recipient[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions/recipient', {
      email,
      password,
    });

    const { token, recipient } = response.data;

    await AsyncStorage.multiSet([
      ['@Postex:token', token],
      ['@Postex:recipient', JSON.stringify(recipient)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, recipient });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Postex:token', '@Postex:recipient']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        recipient: data.recipient,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
