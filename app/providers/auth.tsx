import { createContext, useContext, useState, type PropsWithChildren } from "react";

export type UserData = {
  code?: string;
  cb: VoidFunction
  counter: number;

}

const AuthContext = createContext<UserData | null>(null)

export const useAuthContext = (): UserData => {
  const userData = useContext(AuthContext);
  if (!userData) throw Error("No user data provided");
  
  return userData;
}

export type AuthProviderProps = {
  codeId?: string;
}

export function AuthProvider({ children , codeId}: PropsWithChildren<AuthProviderProps>) {
  const [counter, setCounter] = useState(1)  
  
  const increaseCounter = () => {
    setCounter(c=>c + 1)
  }


  return (
    <AuthContext.Provider value={{cb:increaseCounter,counter}}>
      <div>hello auth provide</div>
      {children}
    </AuthContext.Provider>
  )
}