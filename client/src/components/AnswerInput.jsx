import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';

export default function AnswerInput({ onSend, disabled }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
            onSend(text);
            setText('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    return (
        <div className="bg-white p-4 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your answer here..."
                    rows={3}
                    disabled={disabled}
                    className="w-full p-4 pr-16 text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-100 transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <div className="absolute right-3 bottom-3 flex gap-2">
                    <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                        title="Voice Input (Coming Soon)"
                    >
                        <Mic size={20} />
                    </button>
                    <button
                        type="submit"
                        disabled={!text.trim() || disabled}
                        className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
                    >
                        <Send size={24} />
                    </button>
                </div>
            </form>
        </div>
    );
}
