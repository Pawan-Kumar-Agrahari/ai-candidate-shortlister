import { Link, useLocation } from 'react-router-dom';
import { Home, Users, UserPlus, Zap, Bookmark } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Candidates', path: '/candidates', icon: Users },
    { name: 'Add Candidate', path: '/candidates/add', icon: UserPlus },
    { name: 'Job Match AI', path: '/match', icon: Zap },
    { name: 'Saved Shortlists', path: '/shortlists', icon: Bookmark },
  ];

  return (
    <div className="w-64 bg-indigo-900 text-white flex flex-col">
      <div className="p-6 border-b border-indigo-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="text-yellow-400" /> AI Recruiter
        </h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                    isActive 
                      ? 'bg-indigo-800 border-r-4 border-yellow-400 text-white' 
                      : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-indigo-800 text-sm text-indigo-300 text-center">
        v1.0.0
      </div>
    </div>
  );
};

export default Sidebar;
