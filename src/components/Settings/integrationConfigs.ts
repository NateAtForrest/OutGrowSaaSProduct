import { BarChart3, LinkedinIcon, Facebook } from 'lucide-react';

export const integrationConfigs = {
  'Google Analytics': {
    name: 'Google Analytics',
    icon: BarChart3,
    color: 'text-yellow-500',
    fields: [
      {
        name: 'measurementId',
        label: 'Measurement ID',
        type: 'text',
        placeholder: 'G-XXXXXXXXXX',
        required: true,
      },
      {
        name: 'apiSecret',
        label: 'API Secret',
        type: 'password',
        placeholder: 'Enter your API secret',
        required: true,
      }
    ]
  },
  'LinkedIn Ads': {
    name: 'LinkedIn Ads',
    icon: LinkedinIcon,
    color: 'text-blue-600',
    fields: [
      {
        name: 'clientId',
        label: 'Client ID',
        type: 'text',
        placeholder: 'Enter your client ID',
        required: true,
      },
      {
        name: 'clientSecret',
        label: 'Client Secret',
        type: 'password',
        placeholder: 'Enter your client secret',
        required: true,
      },
      {
        name: 'accountId',
        label: 'Account ID',
        type: 'text',
        placeholder: 'Enter your account ID',
        required: true,
      }
    ]
  },
  'Meta Ads': {
    name: 'Meta Ads',
    icon: Facebook,
    color: 'text-blue-500',
    fields: [
      {
        name: 'accessToken',
        label: 'Access Token',
        type: 'password',
        placeholder: 'Enter your access token',
        required: true,
      },
      {
        name: 'adAccountId',
        label: 'Ad Account ID',
        type: 'text',
        placeholder: 'Enter your ad account ID',
        required: true,
      },
      {
        name: 'pixelId',
        label: 'Pixel ID',
        type: 'text',
        placeholder: 'Enter your pixel ID',
        required: true,
      }
    ]
  }
};