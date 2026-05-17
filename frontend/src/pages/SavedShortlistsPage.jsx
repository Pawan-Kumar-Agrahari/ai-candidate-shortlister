import { useState, useEffect } from 'react';
import { Bookmark, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import API from '../api/api';
import toast from 'react-hot-toast';

const SavedShortlistsPage = () => {
  const [shortlists, setShortlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchShortlists();
  }, []);

  const fetchShortlists = async () => {
    try {
      const { data } = await API.get('/shortlists');
      setShortlists(data);
    } catch (err) {
      toast.error('Failed to load shortlists');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <Bookmark className="text-indigo-600" /> Saved Shortlists
        </h2>
        <p className="text-gray-500">View your previously AI-generated shortlists and candidate rankings.</p>
      </div>

      {shortlists.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
          <Bookmark className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No shortlists saved</h3>
          <p className="text-gray-500">Go to the Job Match AI page to generate and save shortlists.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {shortlists.map((list) => (
            <div key={list._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center"
                onClick={() => setExpandedId(expandedId === list._id ? null : list._id)}
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Reqs: {list.jobRequirements.requiredSkills.join(', ')}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(list.createdAt).toLocaleDateString()}</span>
                    <span>Min Exp: {list.jobRequirements.minExperience} Yrs</span>
                  </div>
                </div>
                <div className="text-gray-400">
                  {expandedId === list._id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              {expandedId === list._id && (
                <div className="p-6 pt-0 border-t border-gray-100">
                  <div className="bg-indigo-50 p-4 rounded-lg mt-4 mb-6">
                    <h4 className="font-semibold text-indigo-900 mb-2">AI Summary</h4>
                    <p className="text-sm text-indigo-800">{list.aiSummary}</p>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-3">Ranked Candidates</h4>
                  <div className="grid gap-3">
                    {list.shortlistedCandidates.map((c, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-gray-50">
                        <div>
                          <span className="font-medium text-gray-900">{c.candidate?.name || 'Unknown Candidate'}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          c.ranking.includes('High') ? 'bg-green-100 text-green-700' : 
                          c.ranking.includes('Medium') ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          {c.ranking}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedShortlistsPage;
