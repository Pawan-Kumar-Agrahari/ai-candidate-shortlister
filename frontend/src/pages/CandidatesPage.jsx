import { useState } from 'react';
import { useCandidates } from '../context/CandidateContext';
import { Search, Filter, Mail, Briefcase, Trash2 } from 'lucide-react';
import API from '../api/api';
import toast from 'react-hot-toast';

const CandidatesPage = () => {
  const { candidates, loading, fetchCandidates } = useCandidates();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExp, setFilterExp] = useState('all');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await API.delete(`/candidates/${id}`);
        toast.success('Candidate deleted');
        fetchCandidates();
      } catch (err) {
        toast.error('Failed to delete candidate');
      }
    }
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterExp === 'all') return matchesSearch;
    if (filterExp === '0-2') return matchesSearch && c.experience <= 2;
    if (filterExp === '3-5') return matchesSearch && c.experience > 2 && c.experience <= 5;
    if (filterExp === '5+') return matchesSearch && c.experience > 5;
    return matchesSearch;
  });

  if (loading) {
    return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search candidates by name or skill..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="text-gray-500" size={18} />
          <select 
            value={filterExp}
            onChange={(e) => setFilterExp(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="all">All Experience</option>
            <option value="0-2">0-2 Years</option>
            <option value="3-5">3-5 Years</option>
            <option value="5+">5+ Years</option>
          </select>
        </div>
      </div>

      {filteredCandidates.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No candidates found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCandidates.map(candidate => (
            <div key={candidate._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1 gap-1">
                      <Mail size={14} />
                      {candidate.email}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(candidate._id)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium bg-indigo-50 w-max px-3 py-1 rounded-full mb-4">
                  <Briefcase size={14} />
                  {candidate.experience} Years Experience
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Top Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.slice(0, 5).map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md border border-gray-200">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 5 && (
                      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-md">
                        +{candidate.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidatesPage;
