import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
    {
        question: "How does the AI Interview work?",
        answer: "Our system facilitates a simulated interview using an advanced AI model. It asks you role-specific questions, analyzes your responses in real-time, and provides feedback on your technical accuracy and communication skills."
    },
    {
        question: "Is camera access mandatory?",
        answer: "Yes, camera access is required to simulate a proctored environment. We use it to ensure you remain focused on the interview tab, similar to real remote interview platforms."
    },
    {
        question: "What happens if I switch tabs?",
        answer: "The system monitors tab focus. Switching tabs triggers a violation warning. Accumulating 3 violations will automatically terminate the interview session to maintain integrity."
    },
    {
        question: "Is my performance data stored?",
        answer: "Yes, your interview history and scores are stored locally on your device so you can track your progress over time. We do not store personal video data on our servers."
    },
    {
        question: "Can I retry an interview?",
        answer: "Absolutely! You can take the interview as many times as you like, for various roles, to improve your confidence and technical knowledge."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                    <HelpCircle size={32} />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
            </div>

            <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-semibold text-gray-800">{faq.question}</span>
                            {openIndex === idx ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                        </button>

                        {openIndex === idx && (
                            <div className="px-6 pb-4 text-gray-600 animate-in slide-in-from-top-2 duration-200">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
