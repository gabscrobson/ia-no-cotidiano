'use client'

import { AmplitudeAnalyticsProvider } from './AmplitudeAnalyticsProvider'
import { ComponentWithChildrenProps } from './LocalAnalyticsContext'

export const AnalyticsProvider = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AmplitudeAnalyticsProvider
      apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || ''}
    >
      {children}
    </AmplitudeAnalyticsProvider>
  )
}
