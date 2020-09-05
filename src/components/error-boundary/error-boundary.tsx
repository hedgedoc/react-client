import React, { Component, ErrorInfo, ReactElement, ReactNodeArray } from 'react'
import { Button, Container } from 'react-bootstrap'
import frontendVersion from '../../version.json'
import { ForkAwesomeIcon } from '../common/fork-awesome/fork-awesome-icon'

export class ErrorBoundary extends Component {
  state: {
    hasError: boolean
  }

  constructor (props: Readonly<unknown>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (_error: Error): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch (error: Error, errorInfo: ErrorInfo): void {
    console.error('error caught', error)
    console.error('additional information', errorInfo)
  }

  refreshPage (): void {
    window.location.reload()
  }

  render (): ReactElement | undefined | null | string | number | boolean | Record<string, unknown> | ReactNodeArray {
    if (this.state.hasError) {
      return (
        <Container className="text-white d-flex flex-column mvh-100">
          <div className='text-white d-flex flex-column align-items-center justify-content-center my-5'>
            <h1>An error occurred</h1>
            <p>Don't worry, this happens sometimes. If this is the first time you see this page then try reloading the app.</p>
            If you can reproduce this error, then we would be glad if you <a href={frontendVersion.issueTrackerUrl} target='_blank' rel='noopener noreferrer'>open an issue on github</a> or <a href={'https://riot.im/app/#/room/#hedgedoc:matrix.org'} target='_blank' rel='noopener noreferrer' dir='auto'>contact us on matrix.</a>
            <Button onClick={() => this.refreshPage()} title={'Reload Page'} className={'mt-4'}>
              <ForkAwesomeIcon icon={'refresh'}/>&nbsp;Reload Page
            </Button>
          </div>
        </Container>
      )
    }
    return this.props.children
  }
}
