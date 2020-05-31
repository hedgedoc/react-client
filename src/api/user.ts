import { LoginProvider } from '../redux/user/types'
import { expectResponseCode, getBackendUrl } from '../utils/apiUtils'
import { defaultFetchConfig } from './default'

export const getMe = async (): Promise<meResponse> => {
  const response = await fetch('/me')
  expectResponseCode(response)
  return (await response.json()) as meResponse
}

export interface meResponse {
  id: string
  name: string
  photo: string
  provider: LoginProvider
}

export const doEmailLogin = async (email: string, password: string): Promise<void> => {
  const response = await fetch(getBackendUrl() + '/auth/email', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    })
  })

  expectResponseCode(response)
}

export const doLdapLogin = async (username: string, password: string): Promise<void> => {
  const response = await fetch(getBackendUrl() + '/auth/ldap', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    })
  })

  expectResponseCode(response)
}

export const doOpenIdLogin = async (openId: string): Promise<void> => {
  const response = await fetch(getBackendUrl() + '/auth/openid', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      openId: openId
    })
  })

  expectResponseCode(response)
}

export const doDisplayNameUpdate: ((displayName: string) => Promise<void>) = async (displayName: string) => {
  const response = await fetch(getBackendUrl() + '/me', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      name: displayName
    })
  })

  expectResponseCode(response)
}

export const doPasswordChange: ((oldPassword: string, newPassword: string) => Promise<void>) = async (oldPassword: string, newPassword: string) => {
  const response = await fetch(getBackendUrl() + '/me/password', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      oldPassword,
      newPassword
    })
  })

  expectResponseCode(response)
}

export const doUserDeletion: (() => Promise<void>) = async () => {
  const response = await fetch(getBackendUrl() + '/me', {
    ...defaultFetchConfig,
    method: 'DELETE'
  })

  expectResponseCode(response)
}
