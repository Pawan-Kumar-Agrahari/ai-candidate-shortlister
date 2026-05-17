import { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/api';
import toast from 'react-hot-toast';

const CandidateContext = createContext();

export const useCandidates = () => useContext(CandidateContext);

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/candidates');
      setCandidates(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch candidates');
      toast.error('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  const addCandidate = async (candidateData) => {
    try {
      const { data } = await API.post('/candidates', candidateData);
      setCandidates(prev => [data, ...prev]);
      toast.success('Candidate added successfully!');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add candidate');
      return false;
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <CandidateContext.Provider value={{ candidates, loading, error, fetchCandidates, addCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};
