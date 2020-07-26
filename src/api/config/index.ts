import { expectResponseCode, getApiUrl } from '../../utils/apiUtils'
import { defaultFetchConfig } from '../default'
import { Config } from './types'

export const getConfig = async (): Promise<Config> => {
  console.debug(getApiUrl())
  const response = await fetch(getApiUrl() + '/config', {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  return await response.json() as Promise<Config>
}
