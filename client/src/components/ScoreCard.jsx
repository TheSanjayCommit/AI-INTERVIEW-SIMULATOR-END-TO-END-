import React from 'react';
import { Trophy, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function ScoreCard({ data }) {
    if (!data) return null;

    const { overallScore, skillBreakdown, strengths, weaknesses, improvementPlan } = data;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* Overall Score */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="relative">
                    <svg className="w-40 h-40 transform -rotate-90">
                        <circle cx="80" cy="80" r="70" stroke="#eee" strokeWidth="12" fill="transparent" />
                        <circle cx="80" cy="80" r="70" stroke="#4f46e5" strokeWidth="12" fill="transparent"
                            strokeDasharray={440}
                            strokeDashoffset={440 - (440 * overallScore) / 10}
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="text-4xl font-extrabold text-gray-900">{overallScore}</span>
                        <span className="text-gray-400 text-sm block font-medium">/10</span>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Interview Analysis</h2>
                    <p className="text-gray-600 max-w-md">
                        Here is a detailed breakdown of your performance.
                        {overallScore >= 7 ? " Great job! You showed strong competency." : " Good effort. Focus on the areas below to improve."}
                    </p>
                </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillBreakdown && skillBreakdown.map((skill, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-gray-700">{skill.name}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${skill.score >= 8 ? 'bg-green-100 text-green-700' :
                                    skill.score >= 5 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {skill.score}/10
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${(skill.score / 10) * 100}%` }}
                            ></div>
                        </div>
                        <p className="mt-3 text-sm text-gray-500">{skill.feedback}</p>
                    </div>
                ))}
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
                    <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                        <CheckCircle size={24} /> Key Strengths
                    </h3>
                    <ul className="space-y-3">
                        {strengths && strengths.map((item, i) => (
                            <li key={i} className="flex gap-3 text-green-700">
                                <span className="mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                    <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                        <AlertCircle size={24} /> Areas for Improvement
                    </h3>
                    <ul className="space-y-3">
                        {weaknesses && weaknesses.map((item, i) => (
                            <li key={i} className="flex gap-3 text-red-700">
                                <span className="mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Recommendations */}
            {improvementPlan && (
                <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        <TrendingUp size={24} /> Recommended Growth Plan
                    </h3>
                    <p className="text-indigo-800 leading-relaxed whitespace-pre-line">
                        {improvementPlan}
                    </p>
                </div>
            )}

        </div>
    );
}
