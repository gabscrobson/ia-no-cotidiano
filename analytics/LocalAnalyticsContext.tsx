import { AnalyticsContext, AnalyticsContextState } from './AnalyticsContext'
import { ReactNode } from 'react'

export type ComponentWithChildrenProps = {
  children: ReactNode
}

const localAnalytics: AnalyticsContextState = {
  trackEvent: (name, data) => {
    console.log('Track event: ', name, data)
  },
}

export const LocalAnalyticsProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  return (
    <AnalyticsContext.Provider value={localAnalytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}
