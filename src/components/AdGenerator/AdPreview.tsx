import React from 'react';
import { Download, Share2 } from 'lucide-react';
import type { AdDesign } from '../../types/adGenerator';

interface AdPreviewProps {
  design: AdDesign | null;
  onExport: () => void;
}

const AdPreview: React.FC<AdPreviewProps> = ({ design, onExport }) => {
  if (!design) return null;

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Preview */}
      <div className="space-y-6">
        <h3 className="font-medium">Preview</h3>
        <div className="bg-gray-100 rounded-lg p-4">
          <div
            className="bg-white rounded-lg shadow-sm mx-auto"
            style={{
              width: design.template.dimensions.width / 2,
              height: design.template.dimensions.height / 2
            }}
          >
            {design.assets[0] && (
              <img
                src={design.assets[0].preview}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {design.text.primary && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="text-center p-4"
                  style={{ fontFamily: design.style.font }}
                >
                  <div
                    className="text-2xl font-bold"
                    style={{ color: design.style.colors[1] }}
                  >
                    {design.text.primary}
                  </div>
                  {design.text.cta && (
                    <div
                      className="mt-4 px-6 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: design.style.colors[1],
                        color: design.style.colors[0]
                      }}
                    >
                      {design.text.cta}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="space-y-6">
        <h3 className="font-medium">Export Options</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Format</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="svg">SVG</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Quality</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option value="high">High (Original Size)</option>
              <option value="medium">Medium (Compressed)</option>
              <option value="low">Low (Web Optimized)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onExport}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="border-t pt-4 mt-6">
          <h4 className="font-medium mb-3">AI Recommendations</h4>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
              Consider using a contrasting color for your CTA button to improve visibility
            </div>
            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
              Your primary text length is optimal for social media engagement
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPreview;</content>