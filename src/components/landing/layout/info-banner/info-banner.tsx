import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ApplicationState } from '../../../../redux'
import { Alert, Button } from 'react-bootstrap'
import { setBanner } from '../../../../redux/banner/methods'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../../common/show-if/show-if'
import './info-banner.scss'

export const InfoBanner: React.FC = () => {
  const history = useHistory()
  const bannerState = useSelector((state: ApplicationState) => state.banner)

  const dismissBanner = () => {
    setBanner({ ...bannerState, show: false })
    window.localStorage.setItem('bannerTimeStamp', bannerState.timestamp)
  }

  const clickLink = () => {
    dismissBanner()
    history.push('/n/banner')
  }

  return (
    <ShowIf condition={bannerState.show}>
      <Alert variant='primary' dir='auto' className='mb-0 text-center'>
        <button className='link' onClick={clickLink}>
          {bannerState.text}
        </button>
        <Button
          variant='outline-primary'
          size='sm'
          className='mx-2'
          onClick={dismissBanner}>
          <ForkAwesomeIcon icon='times'/>
        </Button>
      </Alert>
    </ShowIf>
  )
}
