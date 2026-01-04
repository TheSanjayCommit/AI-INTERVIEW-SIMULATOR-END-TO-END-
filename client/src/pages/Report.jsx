import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScoreCard from '../components/ScoreCard';
import { Loader2, Home } from 'lucide-react';
import { saveAttempt } from '../utils/storage';

export default function Report() {
    const location = useLocation();
    const navigate = useNavigate();
    const { history, role = 'Candidate' } = location.state || {};

    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!history || history.length === 0) {
            navigate('/');
            return;
        }

        const generateReport = async () => {
            try {
                const response = await fetch('/api/interview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            ...history,
                            {
                                role: 'user',
                                content: `INTERVIEW_END. Generate a detailed final JSON report.
                        Structure required:
                        {
                            "overallScore": number (0-10),
                            "skillBreakdown": [ { "name": "Skill Name", "score": number, "feedback": "content" } ],
                            "strengths": ["string"],
                            "weaknesses": ["string"],
                            "improvementPlan": "string (detailed paragraph)"
                        }
                        Return ONLY the JSON.`
                            }
                        ],
                        role: role,
                        jsonMode: true
                    })
                });

                const data = await response.json();

                if (data.reply) {
                    // Because we used jsonMode, the content should be a JSON string
                    const parsed = JSON.parse(data.reply);
                    setReportData(parsed);

                    // Save attempt to history
                    const attemptData = {
                        date: new Date().toISOString(),
                        role: role,
                        score: parsed.overallScore,
                        status: location.state?.status || 'Completed'
                    };
                    saveAttempt(attemptData);

                } else {
                    throw new Error("No report generated");
                }

            } catch (err) {
                console.error("Report Generation Error:", err);
                setError("Failed to generate report. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        generateReport();
    }, [history, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Generating Your Interview Report...</h2>
                <p className="text-gray-500 mt-2">Analyzing your technical accuracy, communication, and problem solving skills.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-red-500 text-xl font-bold mb-4">{error}</div>
                <button onClick={() => navigate('/')} className="text-indigo-600 underline">Return Home</button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Final Candidate Report</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Home size={18} /> Back to Home
                    </button>
                </div>

                <ScoreCard data={reportData} />
            </div>
        </div>
    );
}
