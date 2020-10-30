interface Address {
  street: string
  town: string
  county: string
  postcode: string
}

type preference = 'mail' | 'sms' | 'email'

interface User {
  id: string
  first_name: string
  other_names: string
  address: Address
  mobile: string
  email: string
  company: string
  preferences: {
    contact: Array<preferences>
  }
}

interface UserContextData {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

interface UserContextProviderProps {
  defaults?: Partial<User>
}

interface IFormStatus {
  message: string
  type: string
}

interface IFormStatusProps {
  [key: string]: IFormStatus
}
