import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionBox from '../components/QuestionBox';
import AnswerInput from '../components/AnswerInput';
import WebcamPreview from '../components/WebcamPreview';
import { useProctoring } from '../hooks/useProctoring';
import { getAIResponse } from '../services/groq';
import { saveAttempt } from '../utils/storage';
import ProgressIndicator from '../components/ProgressIndicator';
import { Loader2, ShieldAlert, AlertTriangle, Eye, Lock } from 'lucide-react';

const TOTAL_QUESTIONS = 10;

export default function Interview() {
    const location = useLocation();
    const navigate = useNavigate();
    const role = location.state?.role || 'frontend'; // Default fallback

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Timer State (30 minutes = 1800 seconds)
    const [timeLeft, setTimeLeft] = useState(1800);

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

    // Timer Effect
    useEffect(() => {
        let timer;
        if (hasStarted && !isTerminated && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Auto-end interview when time runs out
            handleEndInterview('Time Limit Exceeded');
        }
        return () => clearInterval(timer);
    }, [hasStarted, isTerminated, timeLeft]);

    // Format time for display (MM:SS)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

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
        if (isTerminated || timeLeft === 0) return;

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

    const handleEndInterview = (status = 'Completed') => {
        const attempt = {
            date: new Date().toISOString(),
            role: role,
            score: 'Pending', // Score is calculated in Report page, but we save initial record here or rely on Report to save? 
            // Better approach: Let Report page handle final saving if we want score, OR save here with 'Pending' and update later.
            // Requirement says: "When timer reaches zero: ... Final interview report must be generated". 
            // And "Store for each attempt: ... Overall score".
            // Since Report page generates feedback, we'll save the attempt history in the Report page or pass data to it.
            // Let's pass data to Report page and let IT save the history to ensure we have the score if generated there.
            // BUT, if we end abruptly (timer), we might not have a score yet if it comes from AI.
            // Simplification for now: We navigate to Report, and Report page logic will generate feedback/score.
            // We can add a "status" field to the state passed to Report.
        };

        navigate('/report', { state: { history: messages, role, status, autoEnded: status === 'Time Limit Exceeded' } });
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
                        <p className="flex items-center gap-2"><p className="text-indigo-500 font-bold">Time Limit:</p> 30 minutes.</p>
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
        <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden">
            {/* Left Panel (Desktop) / Top (Mobile) - Info & Camera */}
            <div className="lg:w-80 bg-white border-b lg:border-r border-gray-200 flex flex-col z-20 shadow-sm shrink-0">
                {/* Header */}
                <header className="p-4 border-b border-gray-100 lg:border-none">
                    <div className="flex justify-between items-center lg:block">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Technical Interview</h2>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mt-1">
                                <span className="text-indigo-600">{role} Track</span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                                <span className={violationCount > 0 ? "text-red-500" : "text-green-500"}>
                                    {violationCount === 0 ? "Clean" : `${violationCount} Violations`}
                                </span>
                            </div>
                        </div>

                        {/* Mobile Timer (Condensed) */}
                        <div className="lg:hidden font-mono text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                </header>

                {/* Camera & Stats Section (Scrollable on mobile if needed, or fixed) */}
                <div className="p-4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible items-center lg:items-stretch">
                    {/* Camera */}
                    <WebcamPreview
                        isActive={hasStarted && !isTerminated && timeLeft > 0}
                        onPermissionError={(err) => setCameraError(err)}
                        className="w-32 h-24 lg:w-full lg:h-48 shrink-0"
                    />

                    {/* Desktop Stats */}
                    <div className="flex-1 min-w-[200px] space-y-4">
                        {/* Timer (Desktop) */}
                        <div className="hidden lg:flex items-center justify-between bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                            <span className="text-sm font-medium text-indigo-900 flex items-center gap-2">
                                Time Left
                            </span>
                            <span className="font-mono text-xl font-bold text-indigo-600">
                                {formatTime(timeLeft)}
                            </span>
                        </div>

                        {/* Progress */}
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            {/* <ProgressIndicator current={currentQuestion} total={TOTAL_QUESTIONS} /> */}
                        </div>

                        <button
                            onClick={() => handleEndInterview('Completed')}
                            className="w-full py-2 border-2 border-red-100 text-red-600 rounded-lg hover:bg-red-50 text-sm font-semibold transition-colors mt-auto"
                        >
                            End Interview
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel (Desktop) / Bottom (Mobile) - Chat & Input */}
            <div className="flex-1 flex flex-col min-w-0 bg-gray-50 relative">

                {/* Warning Overlay (Toast) for Violations */}
                {isWarningVisible && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full shadow-xl z-50 flex items-center gap-2 animate-bounce text-sm whitespace-nowrap">
                        <AlertTriangle size={18} className="text-white" />
                        <span className="font-bold">Warning: Tab Switch ({violationCount}/3)</span>
                    </div>
                )}

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map((msg, idx) => (
                            <QuestionBox key={idx} message={msg} />
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                    <Loader2 className="animate-spin text-indigo-600" size={20} />
                                    <span className="text-gray-500 text-sm font-medium">Evaluating...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <AnswerInput onSend={handleSend} disabled={loading || isTerminated || timeLeft === 0} />
            </div>
        </div>
    );
}
