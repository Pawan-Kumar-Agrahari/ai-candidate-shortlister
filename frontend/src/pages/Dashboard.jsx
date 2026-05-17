import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCandidates } from '../context/CandidateContext';
import { Users, Star, Award, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { candidates, loading } = useCandidates();

  const stats = [
    { title: 'Total Candidates', value: candidates.length, icon: Users, color: 'bg-blue-500' },
    { title: 'Top Matches', value: candidates.filter(c => c.experience >= 3).length, icon: Star, color: 'bg-yellow-500' },
    { title: 'Avg Experience', value: candidates.length > 0 ? (candidates.reduce((acc, c) => acc + c.experience, 0) / candidates.length).toFixed(1) + ' Yrs' : '0 Yrs', icon: Award, color: 'bg-green-500' },
    { title: 'New This Week', value: candidates.length > 0 ? 3 : 0, icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const experienceData = candidates.reduce((acc, curr) => {
    const range = curr.experience <= 2 ? '0-2 Yrs' : curr.experience <= 5 ? '3-5 Yrs' : '5+ Yrs';
    const existing = acc.find(item => item.name === range);
    if (existing) existing.count += 1;
    else acc.push({ name: range, count: 1 });
    return acc;
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className={`p-4 rounded-lg ${stat.color} text-white`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Candidate Experience Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={experienceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
              <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
