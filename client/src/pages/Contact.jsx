import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending
        console.log('Form Submitted:', formData);
        setSubmitted(true);
        // Optional: Save to local storage for persistence
        const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        localStorage.setItem('contact_messages', JSON.stringify([...existing, { ...formData, date: new Date().toISOString() }]));
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-gray-600 mb-8">Thank you for reaching out. We'll get back to you shortly.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-indigo-600 font-semibold hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
                <p className="text-gray-600">Have questions or feedback? We'd love to hear from you.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
                    <input
                        required
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                    <input
                        required
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Message</label>
                    <textarea
                        required
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                        placeholder="Your message..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                    Send Message <Send size={18} />
                </button>
            </form>
        </div>
    );
}
