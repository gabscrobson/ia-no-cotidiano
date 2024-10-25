import { useEffect } from 'react'
import * as amplitude from '@amplitude/analytics-browser'
import { ComponentWithChildrenProps } from './LocalAnalyticsContext'
import { AnalyticsContext, AnalyticsContextState } from './AnalyticsContext'

type AmplitudeAnalyticsProviderProps = ComponentWithChildrenProps & {
  apiKey: string
}

const amplitudeAnalytics: AnalyticsContextState = {
  trackEvent: (name, data) => {
    amplitude.track(name, data)
  },
}

export const AmplitudeAnalyticsProvider = ({
  apiKey,
  children,
}: AmplitudeAnalyticsProviderProps) => {
  useEffect(() => {
    amplitude.init(apiKey, {
      defaultTracking: true,
    })
  }, [apiKey])

  return (
    <AnalyticsContext.Provider value={amplitudeAnalytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}
