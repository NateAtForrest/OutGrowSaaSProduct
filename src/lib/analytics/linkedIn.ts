export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (window.lintrk) {
    window.lintrk('track', {
      conversion_id: eventName,
      ...properties
    });
  }
};