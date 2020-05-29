import { expectResponseCode, getBackendUrl } from '../utils/apiUtils'
import { defaultFetchConfig } from './default'

export const getMe: (() => Promise<meResponse>) = async () => {
  const response = await fetch('/me')
  expectResponseCode(response)
  return (await response.json()) as meResponse
}

export interface meResponse {
  id: string
  name: string
  photo: string
}

export const postEmailLogin: ((email: string, password: string) => Promise<void>) = async (email, password) => {
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

export const postLdapLogin: ((email: string, password: string) => Promise<void>) = async (username, password) => {
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

export const postOpenIdLogin: ((openid: string) => Promise<void>) = async (openId: string) => {
  const response = await fetch(getBackendUrl() + '/auth/openid', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      openId: openId
    })
  })

  expectResponseCode(response)
}
