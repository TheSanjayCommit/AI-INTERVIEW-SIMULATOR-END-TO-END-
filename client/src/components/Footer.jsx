import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold text-white mb-1">AI Interview Simulator</h3>
                        <p className="text-sm text-gray-400">© 2026 All Rights Reserved.</p>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-sm font-medium text-gray-400 mb-2">Developed with Curiosity and Love</p>
                        <p className="text-xs text-gray-500">Updated on 2026 04-01</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Mail size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
