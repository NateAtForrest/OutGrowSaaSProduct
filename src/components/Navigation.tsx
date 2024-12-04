import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Target, Users, BarChart3, Settings, Building2 } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/campaigns', icon: Target, label: 'Campaigns' },
    { path: '/leads', icon: Users, label: 'Leads' },
    { path: '/account-planning', icon: Building2, label: 'Account Planning' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-black text-white p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">O</span>
          </div>
          <span className="text-xl font-bold ml-2">OutGrow™</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(path)
                ? 'bg-primary text-white'
                : 'text-gray-light hover:bg-gray-dark'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;