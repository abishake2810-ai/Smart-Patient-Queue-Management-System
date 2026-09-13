import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  Users,
  Clock,
  CheckCircle2,
  FastForward,
  RotateCcw,
  Stethoscope,
  Activity,
  AlertCircle,
  TrendingUp,
  Settings2,
  Volume2,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const {
    staffUser,
    currentServingTokenNum,
    currentServingTokenStr,
    queue,
    completedCount,
    avgConsultationMinutes,
    callNextToken,
    markConsultationCompleted,
    resetDemoQueue,
    setCurrentView,
    triggerChime,
    patient,
  } = useQueue();

  // Active queue: patients with status 'waiting'
  const waitingPatients = queue.filter((q) => q.status === 'waiting');
  const currentServingItem = queue.find((q) => q.numericToken === currentServingTokenNum);

  // Queue status indicator (Normal / Moderate load / High load)
  const queueStatus = waitingPatients.length <= 5 ? 'Normal Flow' : waitingPatients.length <= 10 ? 'Moderate Load' : 'High Volume';
  const queueStatusColor = waitingPatients.length <= 5 ? 'bg-emerald-100 text-emerald-800' : waitingPatients.length <= 10 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800';

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Staff Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
              OPD Staff Console
            </span>
            <span className="text-xs text-slate-500">• {staffUser.department} ({staffUser.cabin})</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Consultation Desk • Dr. Priya
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Logged in as <strong>{staffUser.name}</strong> (Staff ID: <code className="font-mono text-purple-700 font-bold">{staffUser.id}</code>)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCurrentView('queue-management')}
            className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5"
          >
            <Settings2 className="w-4 h-4 text-purple-600" />
            <span>Full Queue Control</span>
          </button>

          <button
            onClick={callNextToken}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <FastForward className="w-4 h-4" />
            <span>Call Next Token</span>
          </button>
        </div>
      </div>

      {/* 6 KEY STAFF METRICS (As mandated in Section 9: STAFF DASHBOARD) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* 1. Current Token */}
        <div className="bg-white rounded-2xl border-2 border-purple-500 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800">Current Token</span>
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
          </div>
          <div className="text-3xl font-black font-mono text-purple-900">
            {currentServingTokenStr}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 truncate">
            {currentServingItem ? currentServingItem.patientName : 'Dr. Priya Cabin'}
          </div>
        </div>

        {/* 2. Total Waiting Patients */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Waiting</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black font-mono text-slate-900">
            {waitingPatients.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            In OPD Lobby
          </div>
        </div>

        {/* 3. Average Waiting Time */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Avg Wait Time</span>
            <Clock className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black font-mono text-slate-900">
              {Math.round(avgConsultationMinutes)}
            </span>
            <span className="text-xs font-semibold text-slate-500">min/pt</span>
          </div>
          <div className="mt-1 text-[11px] text-teal-700 font-medium">
            Dynamic AI rate
          </div>
        </div>

        {/* 4. Completed Consultations */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black font-mono text-slate-900">
            {completedCount}
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">
            Consulted today
          </div>
        </div>

        {/* 5. Active Queue Length */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Queue</span>
            <Activity className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black font-mono text-slate-900">
            {queue.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Total tokens
          </div>
        </div>

        {/* 6. Queue Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Queue Status</span>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2">
            <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${queueStatusColor}`}>
              {queueStatus}
            </span>
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Calculated by AI load
          </div>
        </div>
      </div>

      {/* Main Staff Dashboard Body */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Active Queue Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
          <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Active Waiting Patients</h2>
              <p className="text-xs text-slate-500">Immediate queue in line for Dr. Priya (Cabin 3)</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={callNextToken}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-xs"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Call Next Patient</span>
              </button>
              <button
                onClick={markConsultationCompleted}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Complete Consultation</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Token</th>
                  <th className="px-4 py-3">Patient Name</th>
                  <th className="px-4 py-3">Patient ID</th>
                  <th className="px-4 py-3">Appointment Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Est. Wait</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queue.map((item) => {
                  const isServing = item.numericToken === currentServingTokenNum;
                  const isDhanu = item.patientName === 'Dhanu Sri';

                  return (
                    <tr
                      key={item.id}
                      className={`${
                        isServing
                          ? 'bg-purple-50/70 font-semibold text-purple-950'
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
                            Demo Target
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-500">{item.patientId}</td>
                      <td className="px-4 py-3 text-slate-600">{item.appointmentType}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === 'serving'
                              ? 'bg-purple-100 text-purple-800'
                              : item.status === 'completed'
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status === 'serving' ? 'In Cabin' : item.status === 'completed' ? 'Completed' : 'Waiting'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {isServing ? '0 min' : item.status === 'completed' ? '—' : `~${item.estimatedMinutes}m`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Quick Actions & Sync Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Staff Demo Actions</h3>
              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                Synchronized
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Every action taken here updates the live queue, re-calculates the AI waiting-time formula, and sends instant turn notifications to patients.
            </p>

            <div className="space-y-2">
              <button
                id="staff-btn-call-next"
                onClick={callNextToken}
                className="w-full py-2.5 px-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-between shadow-xs"
              >
                <span>Call Next Patient ({`A-${String(currentServingTokenNum + 1).padStart(3, '0')}`})</span>
                <FastForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('patient-dashboard')}
                className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between"
              >
                <span>Check Patient's Dashboard View</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={resetDemoQueue}
                className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Reset Demo Queue (Initial State)</span>
                <RotateCcw className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          <div className="bg-purple-50 rounded-2xl border border-purple-200 p-4 text-xs text-purple-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-700" />
              <span>AI Dynamic Estimation Feedback</span>
            </div>
            <p className="text-[11px] leading-relaxed text-purple-800">
              When Dr. Priya finishes a consultation faster or slower than expected, the system's feedback loop recalculates downstream estimated wait times across all connected patient phones.
            </p>
            <button
              onClick={() => setCurrentView('feedback-loop')}
              className="text-purple-700 font-bold underline text-[11px] hover:text-purple-900"
            >
              View Feedback Loop Schematic →
            </button>
          </div>

          <ResponsibleAIDisclaimer compact />
        </div>
      </div>
    </div>
  );
};
