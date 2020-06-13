import { getBackendConfig } from '../../../api/backend-config'
import { getFrontendConfig } from '../../../api/frontend-config'
import { getNote } from '../../../api/note'
import { setBackendConfig } from '../../../redux/backend-config/methods'
import { setBanner } from '../../../redux/banner/methods'
import { setFrontendConfig } from '../../../redux/frontend-config/methods'
import { getAndSetUser } from '../../../utils/apiUtils'

export const loadAllConfig: (baseUrl: string) => Promise<void> = async (baseUrl) => {
  const frontendConfig = await getFrontendConfig(baseUrl)
  if (!frontendConfig) {
    return Promise.reject(new Error('Frontend config empty!'))
  }
  setFrontendConfig(frontendConfig)

  const backendConfig = await getBackendConfig()
  if (!backendConfig) {
    return Promise.reject(new Error('Backend config empty!'))
  }
  setBackendConfig(backendConfig)

  const currentText = backendConfig.bannerText
  if (currentText !== '') {
    const bannerNote = await getNote('banner')
    const lastAcknowledgedTimestamp = window.localStorage.getItem('bannerTimeStamp') || ''
    setBanner({
      text: currentText,
      timestamp: bannerNote.createtime,
      show: currentText !== '' && bannerNote.createtime !== lastAcknowledgedTimestamp
    })
  }

  await getAndSetUser()
}
