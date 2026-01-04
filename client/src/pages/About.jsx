import React from 'react';
import { Bot, Code2, Cpu, LineChart } from 'lucide-react';

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About the Project</h1>
                <p className="text-xl text-gray-600">Empowering developers to crack technical interviews with AI.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem Statement</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Traditional interview preparation often lacks real-time feedback and realistic environment simulation.
                        Candidates struggle with anxiety and lack of structured
                        practice, leading to underperformance in actual interviews.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        This project aims to bridge that gap by providing an intelligent, interactive, and proctored
                        environment that mimics real-world technical interviews.
                    </p>
                </div>
                <div className="bg-indigo-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Tech Stack</h2>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-gray-700">
                            <Code2 className="text-indigo-600" size={20} /> <strong>Frontend:</strong> React + Vite + Tailwind CSS
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                            <Bot className="text-indigo-600" size={20} /> <strong>AI Model:</strong> LLMs of general purpose
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                            <Cpu className="text-indigo-600" size={20} /> <strong>Deployment:</strong> Vercel Serverless
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                            <LineChart className="text-indigo-600" size={20} /> <strong>State:</strong> React Context + LocalStorage
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: 'AI-Powered Questions', desc: 'Adaptive questions based on your responses and selected role.' },
                        { title: 'Proctoring System', desc: 'Detects tab switching and monitors camera feed for integrity.' },
                        { title: 'Instant Feedback', desc: 'Detailed performance analysis and scoring after the session.' }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
