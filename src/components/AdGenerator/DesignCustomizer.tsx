import React, { useState } from 'react';
import { Type, Palette, Layout } from 'lucide-react';
import type { FreepikAsset, AdDesign } from '../../types/adGenerator';

interface DesignCustomizerProps {
  assets: FreepikAsset[];
  onChange: (design: AdDesign) => void;
}

const DesignCustomizer: React.FC<DesignCustomizerProps> = ({
  assets,
  onChange
}) => {
  const [text, setText] = useState({
    primary: '',
    cta: ''
  });

  const [style, setStyle] = useState({
    theme: 'professional',
    colors: ['#FFFFFF', '#000000'],
    font: 'Inter'
  });

  const [layout, setLayout] = useState({
    type: 'social',
    dimensions: { width: 1080, height: 1080 }
  });

  const handleTextChange = (field: 'primary' | 'cta', value: string) => {
    const newText = { ...text, [field]: value };
    setText(newText);
    updateDesign({ text: newText });
  };

  const handleStyleChange = (field: string, value: any) => {
    const newStyle = { ...style, [field]: value };
    setStyle(newStyle);
    updateDesign({ style: newStyle });
  };

  const updateDesign = (updates: Partial<AdDesign>) => {
    onChange({
      id: 'design_1',
      template: {
        id: 'template_1',
        name: 'Social Media Post',
        dimensions: layout.dimensions,
        type: 'social',
        category: 'professional'
      },
      assets,
      text,
      style,
      target: {
        audience: 'professionals',
        platform: 'linkedin'
      },
      ...updates
    });
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Design Canvas */}
      <div className="col-span-2 bg-gray-100 rounded-lg p-4">
        <div
          className="bg-white rounded-lg shadow-sm"
          style={{
            width: layout.dimensions.width / 2,
            height: layout.dimensions.height / 2,
            margin: '0 auto'
          }}
        >
          {assets[0] && (
            <img
              src={assets[0].preview}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          )}
          {text.primary && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-center p-4"
                style={{ fontFamily: style.font }}
              >
                <div className="text-2xl font-bold" style={{ color: style.colors[1] }}>
                  {text.primary}
                </div>
                {text.cta && (
                  <div
                    className="mt-4 px-6 py-2 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: style.colors[1],
                      color: style.colors[0]
                    }}
                  >
                    {text.cta}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Text */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Type className="w-4 h-4" />
            Text Content
          </h3>
          <div>
            <label className="block text-sm font-medium mb-1">Primary Text</label>
            <input
              type="text"
              value={text.primary}
              onChange={(e) => handleTextChange('primary', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your main message"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CTA Text</label>
            <input
              type="text"
              value={text.cta}
              onChange={(e) => handleTextChange('cta', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter call-to-action"
            />
          </div>
        </div>

        {/* Style */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Style
          </h3>
          <div>
            <label className="block text-sm font-medium mb-1">Theme</label>
            <select
              value={style.theme}
              onChange={(e) => handleStyleChange('theme', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="professional">Professional</option>
              <option value="playful">Playful</option>
              <option value="minimalist">Minimalist</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Font</label>
            <select
              value={style.font}
              onChange={(e) => handleStyleChange('font', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>
        </div>

        {/* Layout */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Layout
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLayout({
                type: 'social',
                dimensions: { width: 1080, height: 1080 }
              })}
              className="p-4 border rounded-lg text-center hover:bg-gray-50"
            >
              <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-2"></div>
              <span className="text-sm">Square</span>
            </button>
            <button
              onClick={() => setLayout({
                type: 'social',
                dimensions: { width: 1080, height: 1920 }
              })}
              className="p-4 border rounded-lg text-center hover:bg-gray-50"
            >
              <div className="w-8 h-12 bg-gray-200 rounded mx-auto mb-2"></div>
              <span className="text-sm">Story</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignCustomizer;</content>