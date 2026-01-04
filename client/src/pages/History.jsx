import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../utils/storage';
import { Home, History as HistoryIcon, Clock, Award } from 'lucide-react';

export default function History() {
    const navigate = useNavigate();
    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
        setAttempts(getHistory().reverse()); // Show newest first
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <HistoryIcon className="text-indigo-600" size={32} />
                        Interview History
                    </h1>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Home size={18} /> Back to Home
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {attempts.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <p className="text-lg">No interview attempts yet.</p>
                            <button
                                onClick={() => navigate('/')}
                                className="mt-4 text-indigo-600 hover:underline font-medium"
                            >
                                Start your first interview
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attempts.map((attempt, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} className="text-gray-400" />
                                                    {formatDate(attempt.date)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">
                                                {attempt.role}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <div className="flex items-center gap-1 font-bold text-indigo-600">
                                                    <Award size={16} />
                                                    {attempt.score}/10
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${attempt.status === 'Completed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {attempt.status || 'Completed'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
