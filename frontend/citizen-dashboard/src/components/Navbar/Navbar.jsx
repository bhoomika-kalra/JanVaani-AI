import React from 'react';
import { Mic, Menu } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed w-full bg-white/70 backdrop-blur-xl z-50 border-b border-gray-100/50 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md group-hover:shadow-blue-500/20 transition-all duration-300 group-hover:scale-105">
            <Mic size={22} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-2xl text-slate-900 tracking-tight">
            JanVaani <span className="text-blue-600">AI</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</a>
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Dashboard</a>
        </div>
        
        <div className="hidden md:flex">
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
            Get Started
          </button>
        </div>
        
        <div className="md:hidden flex items-center">
          <button className="text-slate-600 hover:text-slate-900 transition-colors p-2">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
