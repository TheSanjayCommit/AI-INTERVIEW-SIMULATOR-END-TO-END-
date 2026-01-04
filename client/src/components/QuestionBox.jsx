import React from 'react';
import { Bot, User } from 'lucide-react';

export default function QuestionBox({ message }) {
    const isAI = message.role === 'assistant' || message.role === 'system';

    return (
        <div className={`flex w-full mb-6 ${isAI ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex max-w-[80%] ${isAI ? 'flex-row' : 'flex-row-reverse'} gap-4`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isAI ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-600'}`}>
                    {isAI ? <Bot size={24} /> : <User size={24} />}
                </div>

                <div className={`p-5 rounded-2xl shadow-sm text-lg leading-relaxed ${isAI
                        ? 'bg-white text-gray-800 border-l-4 border-indigo-500'
                        : 'bg-indigo-600 text-white rounded-tr-none'
                    }`}>
                    {message.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-1 last:mb-0">{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
