export interface AdTemplate {
  id: string;
  name: string;
  dimensions: {
    width: number;
    height: number;
  };
  type: 'social' | 'banner' | 'print';
  category: 'professional' | 'playful' | 'minimalist';
}

export interface AdDesign {
  id: string;
  template: AdTemplate;
  assets: FreepikAsset[];
  text: {
    primary: string;
    cta: string;
  };
  style: {
    theme: string;
    colors: string[];
    font: string;
  };
  target: {
    audience: string;
    platform: string;
  };
}

export interface FreepikAsset {
  id: string;
  type: 'image' | 'vector' | 'illustration';
  url: string;
  preview: string;
  dimensions: {
    width: number;
    height: number;
  };
  license: string;
  tags: string[];
}

export interface AdGeneratorState {
  currentStep: number;
  design: AdDesign | null;
  selectedAssets: FreepikAsset[];
  searchResults: FreepikAsset[];
  loading: boolean;
  error: string | null;
}