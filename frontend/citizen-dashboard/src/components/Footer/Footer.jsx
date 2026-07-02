import React from 'react';
import { Mic } from 'lucide-react';

const Footer = () => (
  <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200/60 w-full">
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Column */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-sm">
              <Mic size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">JanVaani <span className="text-blue-600">AI</span></span>
          </div>
          <p className="text-slate-500 font-light leading-relaxed max-w-sm mb-6">
            An AI-powered constituency decision support system that transforms citizen voices into data-driven development priorities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-slate-900 mb-6 tracking-tight">Platform</h4>
          <ul className="space-y-4">
            <li><a href="#features" className="text-slate-500 hover:text-blue-600 font-light transition-colors block">Features</a></li>
            <li><a href="#how-it-works" className="text-slate-500 hover:text-blue-600 font-light transition-colors block">How it Works</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 font-light transition-colors block">MP Dashboard</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 font-light transition-colors block">Transparency Portal</a></li>
          </ul>
        </div>

        {/* Project Links */}
        <div>
          <h4 className="font-bold text-slate-900 mb-6 tracking-tight">Project</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-slate-500 hover:text-blue-600 font-light transition-colors block">About Us</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 font-light transition-colors block">Google Build With AI</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 font-light transition-colors block">Track 1 Guidelines</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 font-light transition-colors block">Contact</a></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm font-light text-center md:text-left">
          © {new Date().getFullYear()} JanVaani AI. All rights reserved.
        </p>
        <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-medium text-slate-500 shadow-sm shrink-0">
          <span>Built for Google Build With AI 🇮🇳</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
