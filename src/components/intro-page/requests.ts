import { defaultFetchConfig, expectResponseCode } from '../../api/utils'

export const getFrontPageContent = async (pathname: string): Promise<string> => {
  const baseUrl: string = window.location.pathname.replace(pathname, '')

  const response = await fetch(baseUrl + '/intro.md', {
    ...defaultFetchConfig,
    method: 'GET'
  })
  expectResponseCode(response)

  return await response.text()
}
