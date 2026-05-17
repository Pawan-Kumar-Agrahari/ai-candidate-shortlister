import { Bell, Search, UserCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/candidates': return 'Candidates Directory';
      case '/candidates/add': return 'Add New Candidate';
      case '/match': return 'AI Job Matching';
      case '/shortlists': return 'Saved Shortlists';
      default: return 'AI Recruiter';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h2>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Quick search..." 
            className="pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all w-64"
          />
        </div>
        
        <button className="relative text-gray-500 hover:text-indigo-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-2 border-l pl-6 border-gray-200">
          <UserCircle size={32} className="text-indigo-600" />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700 leading-tight">Admin User</p>
            <p className="text-xs text-gray-500">Recruiter</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
