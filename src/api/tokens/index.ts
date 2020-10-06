import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'
import { AccessToken } from './types'

export const getAccessTokenList = async (): Promise<AccessToken[]> => {
  const response = await fetch(`${getApiUrl()}/tokens`, {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  return await response.json() as AccessToken[]
}
