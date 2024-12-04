import React, { useState } from 'react';
import { Image, Search, Filter, Loader2, Download, AlertCircle, SlidersHorizontal } from 'lucide-react';
import { searchAssets, downloadAsset } from '../../lib/freepik/client';
import type { FreepikAsset } from '../../types/adGenerator';

const AssetLibrary = () => {
  const [query, setQuery] = useState('');
  const [assets, setAssets] = useState<FreepikAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState({
    type: 'photo' as 'photo' | 'vector' | 'psd',
    orientation: '' as '' | 'square' | 'vertical' | 'horizontal',
    category: '',
    people: '' as '' | 'with' | 'without'
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async (newPage?: number) => {
    if (!query.trim() && !filters.category) {
      setError('Please enter a search term or select a category');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchAssets({
        query: query.trim(),
        page: newPage || page,
        limit: 12,
        type: filters.type,
        orientation: filters.orientation || undefined,
        category: filters.category || undefined,
        people: filters.people || undefined
      });
      
      setAssets(result.resources);
      setTotalResults(result.total);
      
      if (result.resources.length === 0) {
        setError('No results found. Try different search terms or filters.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (asset: FreepikAsset) => {
    try {
      const { url } = await downloadAsset(asset.id);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Download failed:', err instanceof Error ? err.message : 'Unknown error');
      setError('Failed to download asset. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Asset Library</h2>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(1)}
                placeholder="Search for images..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => handleSearch(1)}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(f => ({ ...f, type: e.target.value as any }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="photo">Photos</option>
                  <option value="vector">Vectors</option>
                  <option value="psd">PSD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Orientation</label>
                <select
                  value={filters.orientation}
                  onChange={(e) => setFilters(f => ({ ...f, orientation: e.target.value as any }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Any</option>
                  <option value="square">Square</option>
                  <option value="vertical">Vertical</option>
                  <option value="horizontal">Horizontal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">People</label>
                <select
                  value={filters.people}
                  onChange={(e) => setFilters(f => ({ ...f, people: e.target.value as any }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Any</option>
                  <option value="with">With People</option>
                  <option value="without">Without People</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Any</option>
                  <option value="business">Business</option>
                  <option value="technology">Technology</option>
                  <option value="nature">Nature</option>
                  <option value="people">People</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="my-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={asset.preview}
                    alt={asset.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <button
                      onClick={() => handleDownload(asset)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-100"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalResults > 0 && (
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                <div>
                  Showing {assets.length} of {totalResults} results
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSearch(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handleSearch(page + 1)}
                    disabled={assets.length < 12}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {assets.length === 0 && !loading && !error && (
          <div className="text-center text-gray-500 py-12">
            Search for images to get started
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetLibrary;