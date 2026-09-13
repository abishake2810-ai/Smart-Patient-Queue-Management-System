import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  FastForward,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Users,
  Search,
  Volume2,
  ArrowRight,
  Sparkles,
  Edit3,
} from 'lucide-react';

export const QueueManagement: React.FC = () => {
  const {
    currentServingTokenNum,
    currentServingTokenStr,
    queue,
    callNextToken,
    updateCurrentServingToken,
    markConsultationCompleted,
    resetDemoQueue,
    doctorConsultationPace,
    setDoctorConsultationPace,
    complexityFactor,
    setComplexityFactor,
    patient,
    setCurrentView,
  } = useQueue();

  const [customTokenInput, setCustomTokenInput] = useState<string>('39');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleManualTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(customTokenInput, 10);
    if (!isNaN(num) && num > 0) {
      updateCurrentServingToken(num);
    }
  };

  const filteredQueue = queue.filter(
    (q) =>
      q.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
              Staff Queue Management
            </span>
            <span className="text-xs text-slate-500">• Manual Overrides & Queue Control</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            OPD Live Queue Controller
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Manage patient tokens, update current consultation status, and observe live synchronization with patient devices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('staff-dashboard')}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            ← Staff Dashboard
          </button>
          <button
            onClick={resetDemoQueue}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo Queue</span>
          </button>
        </div>
      </div>

      {/* Control Panels Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Panel 1: Call Next Token */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">1. Call Next Token</h2>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Advancing the queue automatically increments the serving token and recalculates downstream waiting times.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl text-center">
            <div className="text-xs text-slate-500">Currently in Doctor Cabin:</div>
            <div className="text-2xl font-black font-mono text-purple-900 mt-0.5">{currentServingTokenStr}</div>
          </div>
          <button
            id="btn-mgmt-call-next"
            onClick={callNextToken}
            className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <FastForward className="w-4 h-4" />
            <span>Call Next Token ({`A-${String(currentServingTokenNum + 1).padStart(3, '0')}`})</span>
          </button>
        </div>

        {/* Panel 2: Update Current Token Manually */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">2. Update Current Token</h2>
            <Edit3 className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Directly jump or overwrite the currently active token number to demonstrate test cases:
          </p>
          <form onSubmit={handleManualTokenSubmit} className="space-y-2.5">
            <div className="flex gap-2">
              <input
                id="input-manual-token-num"
                type="number"
                min="1"
                max="999"
                value={customTokenInput}
                onChange={(e) => setCustomTokenInput(e.target.value)}
                placeholder="e.g. 45"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-500"
              />
              <button
                id="btn-mgmt-update-token"
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs shrink-0 transition-colors"
              >
                Set
              </button>
            </div>
            <div className="flex gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setCustomTokenInput('45');
                  updateCurrentServingToken(45);
                }}
                className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg border border-amber-200"
              >
                Set A-045 (Approaching)
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomTokenInput('47');
                  updateCurrentServingToken(47);
                }}
                className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-200"
              >
                Set A-047 (Dhanu Turn)
              </button>
            </div>
          </form>
        </div>

        {/* Panel 3: Mark Consultation Completed */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">3. Consultation Completed</h2>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Marks current consultation as finished, records timestamp, and moves to next patient.
          </p>
          <button
            id="btn-mgmt-mark-completed"
            onClick={markConsultationCompleted}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark {currentServingTokenStr} Completed</span>
          </button>
          <div className="text-[11px] text-slate-400 text-center">
            Triggers feedback loop for pace adaptation
          </div>
        </div>
      </div>

      {/* Full Patient Queue List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-slate-900 text-base">All Registered Patients in OPD</h2>
            <p className="text-xs text-slate-500">Live view of waiting, consulting, and completed tokens</p>
          </div>

          <div className="relative max-w-xs w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search token or name..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Token</th>
                <th className="px-4 py-3">Patient Name</th>
                <th className="px-4 py-3">Patient ID</th>
                <th className="px-4 py-3">Registered At</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Approx. Wait</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQueue.map((item) => {
                const isServing = item.numericToken === currentServingTokenNum;
                const isDhanu = item.patientName === 'Dhanu Sri';
                const ahead = item.numericToken - currentServingTokenNum;

                return (
                  <tr
                    key={item.id}
                    className={`${
                      isServing
                        ? 'bg-purple-50/70 font-semibold'
                        : isDhanu
                        ? 'bg-blue-50/50'
                        : item.status === 'completed'
                        ? 'bg-slate-50/40 text-slate-400'
                        : 'hover:bg-slate-50/80 text-slate-700'
                    }`}
                  >
                    <td className="px-4 py-3 font-mono font-bold">
                      <span className="flex items-center gap-1.5">
                        {isServing && <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>}
                        <span>{item.tokenNumber}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-900">{item.patientName}</span>
                      {isDhanu && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                          Dhanu Sri
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500">{item.patientId}</td>
                    <td className="px-4 py-3 text-slate-500">{item.registeredAt}</td>
                    <td className="px-4 py-3 text-slate-600">{item.appointmentType}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isServing
                            ? 'bg-purple-100 text-purple-800'
                            : item.status === 'completed'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isServing ? 'Now Consulting' : item.status === 'completed' ? 'Completed' : 'Waiting'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {isServing ? '0 min' : item.status === 'completed' ? '—' : `~${Math.max(1, ahead * 4.4).toFixed(0)} min`}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => updateCurrentServingToken(item.numericToken)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-purple-50 hover:text-purple-900 text-slate-600 text-[11px] font-medium transition-colors"
                      >
                        Set as Current
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ResponsibleAIDisclaimer />
    </div>
  );
};
