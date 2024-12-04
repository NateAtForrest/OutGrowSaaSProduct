import React, { useState } from 'react';
import { Search, Image, Filter, Loader2 } from 'lucide-react';
import { searchAssets } from '../../lib/freepik/client';
import type { FreepikAsset } from '../../types/adGenerator';

interface AssetSelectorProps {
  onSelect: (assets: FreepikAsset[]) => void;
}

const AssetSelector: React.FC<AssetSelectorProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'image' | 'vector' | 'illustration'>('image');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FreepikAsset[]>([]);
  const [selected, setSelected] = useState<FreepikAsset[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchAssets({ query, type });
      setResults(data.resources);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAsset = (asset: FreepikAsset) => {
    if (selected.find(a => a.id === asset.id)) {
      setSelected(selected.filter(a => a.id !== asset.id));
    } else {
      setSelected([...selected, asset]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images, vectors, illustrations..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="image">Images</option>
          <option value="vector">Vectors</option>
          <option value="illustration">Illustrations</option>
        </select>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {results.map((asset) => (
            <div
              key={asset.id}
              onClick={() => toggleAsset(asset)}
              className={`relative rounded-lg overflow-hidden cursor-pointer ${
                selected.find(a => a.id === asset.id)
                  ? 'ring-2 ring-blue-600'
                  : ''
              }`}
            >
              <img
                src={asset.preview}
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity" />
            </div>
          ))}
        </div>
      )}

      {/* Selected Assets */}
      {selected.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-3">Selected Assets</h3>
          <div className="flex gap-4">
            {selected.map((asset) => (
              <div
                key={asset.id}
                className="relative w-24 h-24"
              >
                <img
                  src={asset.preview}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => toggleAsset(asset)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetSelector;</content>