import { trackEvent as trackGoogleAnalytics } from './analytics/googleAnalytics';
import { trackEvent as trackLinkedIn } from './analytics/linkedIn';
import { trackEvent as trackMeta } from './analytics/meta';

export const initGoogleAnalytics = async (measurementId: string) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  
  return new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', measurementId, {
      send_page_view: false
    });
  });
};

export const initLinkedInAds = async (partnerId: string) => {
  return new Promise((resolve, reject) => {
    try {
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(partnerId);

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });
};

export const initMetaAds = async (pixelId: string) => {
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
      `;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Track across all connected platforms
  trackGoogleAnalytics(eventName, properties);
  trackLinkedIn(eventName, properties);
  trackMeta(eventName, properties);
};

export const trackPageView = (path: string) => {
  trackEvent('page_view', {
    page_path: path,
    page_title: document.title
  });
};

export const trackVisitor = (visitorData: {
  company: string;
  location: string;
  pages: string[];
  duration: number;
}) => {
  trackEvent('visitor_activity', {
    ...visitorData,
    timestamp: new Date().toISOString()
  });
};