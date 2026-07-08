import React, { useState } from 'react';
import apiClient from '../services/apiClient';
import { complaintService } from '../services/complaintService';
import { aiService } from '../services/aiService';

const DevTestPage = () => {
  const [logs, setLogs] = useState([]);

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }]);
  };

  const testPopulateDemoData = async () => {
    addLog("Requesting demo data population...", "info");
    try {
      const res = await apiClient.post('/admin/populate-demo');
      addLog(`Success: ${JSON.stringify(res.data)}`, "success");
    } catch (err) {
      addLog(`Failed: ${err.message}`, "error");
    }
  };

  const testBackendHealth = async () => {
    addLog("Checking backend health...", "info");
    try {
      const res = await apiClient.get('/health');
      addLog(`Success: ${JSON.stringify(res.data)}`, "success");
    } catch (err) {
      addLog(`Failed: ${err.message}`, "error");
    }
  };

  const testAIExplainability = async () => {
    addLog("Testing AI Explainability...", "info");
    try {
      const data = await aiService.generateExplainability({ project_id: 'TEST-123' });
      addLog(`Success: ${JSON.stringify(data)}`, "success");
    } catch (err) {
      addLog(`Failed: ${err.message}`, "error");
    }
  };

  return (
    <div className="p-8 font-sans max-w-4xl mx-auto">
      <h1 className="text-3xl font-black mb-6">Developer Testing Utilities</h1>
      <p className="text-slate-500 mb-8">Visible only in development mode. Use these to trigger specific flows and verify API connectivity.</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button onClick={testBackendHealth} className="bg-slate-800 text-white p-4 rounded-xl font-bold hover:bg-slate-700">
          Check API Health
        </button>
        <button onClick={testPopulateDemoData} className="bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-500">
          Populate Demo Data
        </button>
        <button onClick={testAIExplainability} className="bg-purple-600 text-white p-4 rounded-xl font-bold hover:bg-purple-500">
          Test AI Priority Engine
        </button>
      </div>

      <div className="bg-slate-900 rounded-xl p-4 h-96 overflow-y-auto font-mono text-sm">
        {logs.map((log, idx) => (
          <div key={idx} className={`mb-2 ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-blue-300'}`}>
            <span className="text-slate-500">[{log.time}]</span> {log.msg}
          </div>
        ))}
        {logs.length === 0 && <div className="text-slate-600">No logs yet. Run a test.</div>}
      </div>
    </div>
  );
};

export default DevTestPage;
