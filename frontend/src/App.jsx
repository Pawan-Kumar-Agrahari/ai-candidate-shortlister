import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CandidatesPage from './pages/CandidatesPage';
import AddCandidatePage from './pages/AddCandidatePage';
import JobMatchingPage from './pages/JobMatchingPage';
import SavedShortlistsPage from './pages/SavedShortlistsPage';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/candidates" element={<CandidatesPage />} />
              <Route path="/candidates/add" element={<AddCandidatePage />} />
              <Route path="/match" element={<JobMatchingPage />} />
              <Route path="/shortlists" element={<SavedShortlistsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
