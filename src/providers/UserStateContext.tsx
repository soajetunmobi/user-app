import React, { createContext, ReactElement, ReactNode, useContext, useState } from 'react'

const defaultUser: User = {
  id: '',
  first_name: '',
  other_names: '',
  address: {
    street: '',
    town: '',
    county: '',
    postcode: ''
  },
  mobile: '',
  email: '',
  company: '',
  preferences: {
    contact: []
  }
}

interface UserContextProviderProps {
  defaults?: User
  children?: ReactNode
}

const defaultUserContextData: UserContextData = {
  user: defaultUser,
  setUser: () => {}
}

export const UserContext = createContext<UserContextData>(defaultUserContextData)

export const useUserContext = (): UserContextData => {
  return useContext(UserContext)
}

// export const UserStateContext = createContext<Partial<UserStateContextProps>>({} as UserStateContextProps)
//
// export const UserStateProvider = ({ children }: PropsWithChildren<any>) => {
//   return (
//     <UserStateContext.Provider value={{ state: undefined }}>{children}</UserStateContext.Provider>
//   )
// }

export const UserContextProvider = (props: UserContextProviderProps): ReactElement => {
  const [user, setUser] = useState<User>({ ...defaultUser, ...props.defaults })

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
}
