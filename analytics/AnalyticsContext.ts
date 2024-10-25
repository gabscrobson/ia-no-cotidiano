import { Context as ReactContext, createContext, useContext } from 'react'

function createContextHook<T, R = T>(
  Context: ReactContext<T | undefined>,
  contextName: string,
  transform?: (context: T) => R,
): () => R {
  return (): R => {
    const context = useContext(Context)

    if (!context) {
      throw new Error(`${contextName} is not provided`)
    }

    return transform ? transform(context) : (context as unknown as R)
  }
}

export type AnalyticsContextState = {
  trackEvent: (name: string, data?: Record<string, unknown>) => void
}

export const AnalyticsContext = createContext<
  AnalyticsContextState | undefined
>(undefined)

export const useAnalytics = createContextHook(
  AnalyticsContext,
  'AnalyticsContext',
)
