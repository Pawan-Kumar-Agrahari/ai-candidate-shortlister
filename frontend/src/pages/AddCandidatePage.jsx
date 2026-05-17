import { useState } from 'react';
import { useCandidates } from '../context/CandidateContext';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Plus, X } from 'lucide-react';

const AddCandidatePage = () => {
  const { addCandidate } = useCandidates();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    bio: ''
  });
  
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skills.length === 0) {
      alert('Please add at least one skill');
      return;
    }

    setLoading(true);
    const success = await addCandidate({
      ...formData,
      experience: Number(formData.experience),
      skills
    });
    setLoading(false);

    if (success) {
      navigate('/candidates');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-indigo-600 p-6 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg text-white">
            <UserPlus size={24} />
          </div>
          <h2 className="text-xl font-bold text-white">Candidate Information</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input 
                type="text" required name="name" value={formData.name} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input 
                type="email" required name="email" value={formData.email} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
            <input 
              type="number" required min="0" step="0.5" name="experience" value={formData.experience} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. 3.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills *</label>
            <div className="flex gap-2 mb-2">
              <input 
                type="text" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(e)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="React, Node.js, Python..."
              />
              <button 
                type="button" onClick={handleAddSkill}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors flex items-center gap-1 font-medium"
              >
                <Plus size={18} /> Add
              </button>
            </div>
            
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    {skill}
                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-indigo-200 transition-colors">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brief Bio (Optional)</label>
            <textarea 
              name="bio" value={formData.bio} onChange={handleChange} rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
              placeholder="Tell us about the candidate's background..."
            ></textarea>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" onClick={() => navigate('/candidates')} className="px-5 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm transition-colors flex items-center justify-center min-w-[140px]">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Save Candidate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidatePage;
