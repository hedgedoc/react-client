import { useLocation } from 'react-router'

export const useFrontendBaseUrl = (): string => {
  const { pathname } = useLocation()

  return window.location.pathname.replace(pathname, '')
}
