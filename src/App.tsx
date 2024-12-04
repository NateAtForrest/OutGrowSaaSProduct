import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAnalytics } from './hooks/useAnalytics';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Leads from './pages/Leads';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import AccountPlanning from './pages/AccountPlanning';

function App() {
  // Initialize analytics tracking
  useAnalytics();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigation />
      <main className="flex-1 ml-64 p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account-planning" element={<AccountPlanning />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;