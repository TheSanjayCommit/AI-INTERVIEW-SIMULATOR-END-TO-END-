import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Report from './pages/Report';
import History from './pages/History';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
        {/* Simple Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="font-bold text-xl text-indigo-600">AI Interviewer</Link>
              <div className="flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium">About</Link>
                <Link to="/faq" className="text-gray-600 hover:text-indigo-600 font-medium">FAQ</Link>
                <Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/report" element={<Report />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
