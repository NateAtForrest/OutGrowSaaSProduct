import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const LeadFilters = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Lead Status</option>
            <option value="new">New</option>
            <option value="qualified">Qualified</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
          <select className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Lead Source</option>
            <option value="website">Website</option>
            <option value="campaign">Campaign</option>
            <option value="referral">Referral</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <SlidersHorizontal className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadFilters;