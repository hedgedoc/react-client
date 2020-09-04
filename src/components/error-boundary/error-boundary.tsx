import React, { ErrorInfo, ReactElement } from 'react'
import { LandingLayout } from '../landing-layout/landing-layout'

export class ErrorBoundary extends React.Component {
  constructor (props: Readonly<unknown>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (_error: Error): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch (_error: Error, _errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
  }

  render (): ReactElement | undefined | null | string | number | boolean {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<LandingLayout>
        <div className='text-white d-flex align-items-center justify-content-center my-5'>
          <h1>An error occurred</h1>
        </div>
      </LandingLayout>)
    }
    return this.props.children
  }
}
