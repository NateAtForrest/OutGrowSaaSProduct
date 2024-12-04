export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...properties,
      send_to: window.GA_MEASUREMENT_ID
    });
  }
};