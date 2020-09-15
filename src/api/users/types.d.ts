import { LoginProvider } from '../../redux/user/types'

export interface UserResponse {
  id: string
  name: string
  photo: string
  provider: LoginProvider
}

export interface UserResponseCacheEntry {
  timestamp: number
  userData: UserResponse
}
