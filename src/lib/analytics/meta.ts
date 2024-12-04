export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (window.fbq) {
    window.fbq('track', eventName, properties);
  }
};