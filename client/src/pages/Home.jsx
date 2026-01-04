import React, { useState } from 'react';
import RoleSelector from '../components/RoleSelector';
import { useNavigate } from 'react-router-dom';
import { Bot, Terminal, Code2, Layers, Cpu, UserCheck, History } from 'lucide-react';

const ROLES = [
    { id: 'frontend', label: 'Frontend Developer', icon: Code2, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'backend', label: 'Backend Developer', icon: Terminal, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'mern', label: 'MERN Stack', icon: Layers, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'ml', label: 'Machine Learning', icon: Cpu, color: 'text-red-600', bg: 'bg-red-100' },
    { id: 'system-design', label: 'System Design', icon: Layers, color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: 'hr', label: 'HR / Behavioral', icon: UserCheck, color: 'text-pink-600', bg: 'bg-pink-100' },
];

export default function Home() {
    const navigate = useNavigate();

    const handleSelectRole = (roleId) => {
        navigate('/interview', { state: { role: roleId } });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 relative">
            <button
                onClick={() => navigate('/history')}
                className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg shadow-sm hover:bg-indigo-50 font-medium transition-colors border border-indigo-100"
            >
                <History size={18} />
                View History
            </button>

            <div className="text-center mb-16">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-all duration-300">
                        <Bot size={48} className="text-white" />
                    </div>
                </div>
                <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                    AI Interview <span className="text-indigo-600">Simulator</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Master your technical interview skills with our intelligent AI interviewer.
                    Real-time feedback, adaptive difficulty, and comprehensive role-based evaluation.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
                    <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                    Select Your Interview Track
                    <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                </h2>

                <RoleSelector roles={ROLES} onSelect={handleSelectRole} />
            </div>

            <div className="mt-12 text-center text-sm text-gray-500">
                <p>This Application is still in development mode and Wait for the Professional Version </p>
            </div>
        </div>
    );
}
