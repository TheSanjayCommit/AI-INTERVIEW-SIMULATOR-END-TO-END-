import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionBox from '../components/QuestionBox';
import AnswerInput from '../components/AnswerInput';
import WebcamPreview from '../components/WebcamPreview';
import { useProctoring } from '../hooks/useProctoring';
import { getAIResponse } from '../services/groq';
import { Loader2, ShieldAlert, AlertTriangle, Eye, Lock } from 'lucide-react';

export default function Interview() {
    const location = useLocation();
    const navigate = useNavigate();
    const role = location.state?.role || 'frontend'; // Default fallback

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Proctoring States
    const [hasStarted, setHasStarted] = useState(false);
    const [isTerminated, setIsTerminated] = useState(false);
    const [cameraError, setCameraError] = useState(null);

    const messagesEndRef = useRef(null);
    const hasInitialized = useRef(false);

    // Initialize Proctoring Hook
    const handlePropctoringViolation = () => {
        setIsTerminated(true);
    };

    const { violationCount, isWarningVisible } = useProctoring(
        hasStarted && !isTerminated, // Only active when interview is running
        3,
        handlePropctoringViolation
    );

    // Initial Greeting (only after start)
    useEffect(() => {
        if (hasStarted && !hasInitialized.current) {
            const initialMessage = {
                role: 'assistant',
                content: `Hello! I'm your AI Interviewer. I see you're applying for the **${role.toUpperCase()}** role. \n\nLet's start. Tell me a little about yourself and your experience with this tech stack.`
            };
            setMessages([initialMessage]);
            hasInitialized.current = true;
        }
    }, [role, hasStarted]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (text) => {
        if (isTerminated) return;

        const userMessage = { role: 'user', content: text };
        const updatedHistory = [...messages, userMessage];
        setMessages(updatedHistory);
        setLoading(true);

        try {
            const aiReply = await getAIResponse(updatedHistory, role);

            const newHistory = [...updatedHistory, { role: 'assistant', content: aiReply }];
            setMessages(newHistory);

            if (aiReply.toLowerCase().includes('interview report') || aiReply.toLowerCase().includes('score:')) {
                // Logic for natural end handled by user clicking End or just chat flow
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEndInterview = () => {
        navigate('/report', { state: { history: messages, role } });
    };

    // 1. Start Overlay
    if (!hasStarted) {
        return (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-indigo-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Proctored Interview Environment</h2>
                    <p className="text-gray-600 mb-8">
                        This session is monitored for malpractice.
                        <br />
                        <span className="font-semibold text-red-500">Do not switch tabs or minimize the window.</span>
                    </p>

                    <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left text-sm text-gray-700 space-y-2 border border-gray-100">
                        <p className="flex items-center gap-2"><Eye size={16} className="text-indigo-500" /> Camera must be on at all times.</p>
                        <p className="flex items-center gap-2"><ShieldAlert size={16} className="text-indigo-500" /> Tab switching is recorded.</p>
                        <p className="flex items-center gap-2"><AlertTriangle size={16} className="text-indigo-500" /> 3 violations will terminate the session.</p>
                    </div>

                    <button
                        onClick={() => setHasStarted(true)}
                        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg"
                    >
                        Agree & Start Interview
                    </button>
                </div>
            </div>
        )
    }

    // 2. Malpractice Terminated Overlay
    if (isTerminated) {
        return (
            <div className="fixed inset-0 bg-red-900 bg-opacity-95 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl border-4 border-red-500">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <ShieldAlert className="text-red-600" size={40} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Session Terminated</h2>
                    <p className="text-red-600 font-medium mb-6">Malpractice Detected</p>
                    <p className="text-gray-500 mb-8">
                        You exceeded the maximum allowed violations (Tab Switching / Window Blur).
                        The interview has been cancelled per protocol.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Proctoring Components */}
            <WebcamPreview
                isActive={hasStarted && !isTerminated}
                onPermissionError={(err) => setCameraError(err)}
            />

            {/* Warning Overlay (Toast) for Violations */}
            {isWarningVisible && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 animate-bounce">
                    <AlertTriangle size={24} className="text-white" />
                    <span className="font-bold">Warning: Tab Switch Detected! ({violationCount}/3)</span>
                </div>
            )}

            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center z-10 transition-colors duration-300">
                <div className="flex items-center gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Technical Interview</h2>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                            <span className="text-indigo-600">{role} Track</span>
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                            <span className={violationCount > 0 ? "text-red-500" : "text-green-500"}>
                                {violationCount === 0 ? "Clean Record" : `${violationCount} Violations`}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleEndInterview}
                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-semibold transition-colors"
                >
                    End Interview
                </button>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    {messages.map((msg, idx) => (
                        <QuestionBox key={idx} message={msg} />
                    ))}

                    {loading && (
                        <div className="flex justify-start mb-6">
                            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                <Loader2 className="animate-spin text-indigo-600" size={20} />
                                <span className="text-gray-500 text-sm font-medium">Evaluating answer...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <AnswerInput onSend={handleSend} disabled={loading || isTerminated} />
        </div>
    );
}
