import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  Ticket,
  Clock,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Printer,
  Bell,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  MapPin,
  ChevronRight,
  TrendingDown,
  RefreshCw,
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const {
    patient,
    currentServingTokenStr,
    currentServingTokenNum,
    patientsAhead,
    estimatedWaitMinutes,
    patientQueueStatus,
    setCurrentView,
    callNextToken,
    notifications,
  } = useQueue();

  const [showSlipModal, setShowSlipModal] = useState(false);

  const isMyTurn = currentServingTokenNum === patient.numericToken;
  const isApproaching = patientsAhead <= 2 && patientsAhead > 0;
  const isCompleted = currentServingTokenNum > patient.numericToken;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* DEMO DATA Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 shadow-xs">
        <div className="flex items-center gap-2.5 text-amber-900 text-xs sm:text-sm">
          <span className="px-2 py-0.5 font-bold tracking-wider uppercase text-[10px] rounded bg-amber-200 text-amber-900">
            DEMO DATA
          </span>
          <span className="font-medium">
            Academic Demonstration Prototype • All patient records, queues, and predictions are simulated.
          </span>
        </div>
        <div className="text-xs text-amber-800">
          Last Synced: <span className="font-mono font-medium">Live</span>
        </div>
      </div>

      {/* Turn Status Alert Banner (if approaching or turn now) */}
      {isMyTurn && (
        <div className="p-4 rounded-xl bg-emerald-600 text-white shadow-md flex items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center font-bold text-lg shrink-0">
              ✓
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">It's Your Turn! (Token {patient.tokenNumber})</h2>
              <p className="text-xs sm:text-sm text-emerald-100">
                Please proceed directly to {patient.cabin} for consultation with {patient.doctor}.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('live-queue')}
            className="px-3.5 py-1.5 rounded-lg bg-white text-emerald-800 font-semibold text-xs shrink-0 hover:bg-emerald-50"
          >
            Track in Queue
          </button>
        </div>
      )}

      {isApproaching && (
        <div className="p-4 rounded-xl bg-amber-500 text-slate-950 shadow-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base">Your Token is Approaching!</h2>
              <p className="text-xs text-slate-900">
                Current token is {currentServingTokenStr}. Only {patientsAhead} patient{patientsAhead > 1 ? 's' : ''} ahead. Please move to the 1st Floor waiting lobby.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('live-queue')}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-amber-300 font-semibold text-xs shrink-0 hover:bg-slate-800"
          >
            View Live
          </button>
        </div>
      )}

      {/* Patient Welcome Header & Key Info Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                Patient Dashboard
              </span>
              <span className="text-xs text-slate-400">• OPD Outpatient Department</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Hello, {patient.name}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Patient ID: <strong className="font-mono text-slate-700">{patient.id}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                <span>{patient.doctor}</span>
              </span>
              <span>•</span>
              <span>{patient.department}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{patient.cabin}</span>
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSlipModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Token Slip</span>
            </button>
            <button
              onClick={() => setCurrentView('live-queue')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <span>Track Live Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* CORE QUEUE METRICS GRID (As requested in prompt) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Patient Token */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Your Token</span>
            <Ticket className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
            {patient.tokenNumber}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">Status:</span>
            <span
              className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                patientQueueStatus === 'In Consultation'
                  ? 'bg-emerald-100 text-emerald-800'
                  : patientQueueStatus === 'Completed'
                  ? 'bg-slate-100 text-slate-700'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {patientQueueStatus}
            </span>
          </div>
        </div>

        {/* Metric 2: Currently Serving Token */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Currently Serving</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="text-3xl font-extrabold text-teal-600 font-mono tracking-tight">
            {currentServingTokenStr}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Cabin 3 • Dr. Priya
          </div>
        </div>

        {/* Metric 3: Patients Ahead */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Patients Ahead</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
            {patientsAhead}
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5 text-teal-600" />
            <span>Position in line</span>
          </div>
        </div>

        {/* Metric 4: Estimated Waiting Time (AI Estimated) */}
        <div className="bg-gradient-to-br from-teal-50/70 to-blue-50/70 rounded-2xl border border-teal-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-teal-800 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Estimated Wait</span>
            <Clock className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-teal-900 font-mono tracking-tight">
              {estimatedWaitMinutes}
            </span>
            <span className="text-sm font-semibold text-teal-700">minutes</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-teal-800 font-medium">
            <Sparkles className="w-3 h-3 text-teal-600 shrink-0" />
            <span>AI-generated estimate</span>
          </div>
        </div>
      </div>

      {/* Mini Visual Queue Tracker & Live Action Section */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Queue Visual Progress Bar */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Live Queue Tracker</h2>
              <p className="text-xs text-slate-500">Dr. Priya • General Medicine OPD</p>
            </div>
            <button
              onClick={() => setCurrentView('live-queue')}
              className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
            >
              <span>Expand Tracker</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Visual Step Chain from A-039 to A-047 */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-3">
              <span className="flex items-center gap-1 text-teal-700">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                Now In Cabin: <strong className="font-mono">{currentServingTokenStr}</strong>
              </span>
              <span className="text-blue-700">
                Your Turn: <strong className="font-mono">{patient.tokenNumber}</strong>
              </span>
            </div>

            {/* Queue pill strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {[39, 40, 41, 42, 43, 44, 45, 46, 47, 48].map((num) => {
                const token = `A-${String(num).padStart(3, '0')}`;
                const isServing = num === currentServingTokenNum;
                const isUser = num === patient.numericToken;
                const isPast = num < currentServingTokenNum;

                let pillClass = 'bg-white border-slate-200 text-slate-600';
                if (isServing) {
                  pillClass = 'bg-teal-600 border-teal-700 text-white font-bold ring-2 ring-teal-200 scale-105';
                } else if (isUser) {
                  pillClass = 'bg-blue-100 border-blue-300 text-blue-900 font-bold';
                } else if (isPast) {
                  pillClass = 'bg-slate-100 border-slate-200 text-slate-400 line-through';
                }

                return (
                  <div
                    key={num}
                    className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl border text-xs font-mono shrink-0 transition-all ${pillClass}`}
                  >
                    <span>{token}</span>
                    <span className="text-[9px] font-sans font-medium uppercase mt-0.5 opacity-90">
                      {isServing ? 'Serving' : isUser ? 'You' : isPast ? 'Done' : 'Wait'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
              <span>Doctor's average pace: ~4.4 min per consultation</span>
              <span className="font-medium text-slate-700">
                {patientsAhead > 0 ? `${patientsAhead} patients ahead` : isMyTurn ? "You're next!" : 'Consultation complete'}
              </span>
            </div>
          </div>

          {/* Quick Demo Simulator CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="text-slate-600">
              Want to see the queue advance? Use the button to simulate the next consultation.
            </div>
            <button
              onClick={callNextToken}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simulate Next Patient Called</span>
            </button>
          </div>

          <ResponsibleAIDisclaimer compact />
        </div>

        {/* Right 4 Cols: Quick Actions & Recent Simulated Notifications */}
        <div className="lg:col-span-4 space-y-4">
          {/* Notifications Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-sm">Recent Alerts</h3>
              </div>
              <button
                onClick={() => setCurrentView('notifications')}
                className="text-xs text-teal-700 hover:underline font-semibold"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {notifications.slice(0, 3).map((n) => (
                <div
                  key={n.id}
                  className={`p-2.5 rounded-xl border text-xs transition-colors ${
                    n.type === 'serving'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : n.type === 'approaching'
                      ? 'bg-amber-50 border-amber-200 text-amber-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold mb-0.5">
                    <span>{n.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">{n.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2.5">
            <h3 className="font-bold text-slate-900 text-sm">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <button
                onClick={() => setCurrentView('get-token')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-teal-50/50 hover:border-teal-200 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-teal-600" />
                  <span className="font-medium text-slate-800">Generate New Token</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setCurrentView('ai-estimation')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-indigo-50/50 hover:border-indigo-200 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium text-slate-800">How AI Calculates Waiting Time</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setCurrentView('feedback-loop')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-teal-50/50 hover:border-teal-200 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-teal-600" />
                  <span className="font-medium text-slate-800">Explore Feedback Loop</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Digital Token Slip Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="border-b border-dashed border-slate-300 pb-4">
              <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                Smart Patient Queue System
              </div>
              <div className="text-sm text-slate-500">OPD Outpatient Token Slip</div>
              <div className="mt-3 inline-block px-4 py-2 bg-slate-900 text-amber-400 font-mono font-extrabold text-3xl rounded-xl">
                {patient.tokenNumber}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-left bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-semibold text-slate-800">{patient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient ID:</span>
                <span className="font-mono text-slate-800">{patient.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span className="text-slate-800">{patient.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor:</span>
                <span className="text-slate-800">{patient.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cabin:</span>
                <span className="text-slate-800">{patient.cabin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Issued Time:</span>
                <span className="text-slate-800">{patient.appointmentTime}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Demonstration token slip. Show this at Cabin 3 when your token is announced.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Slip</span>
              </button>
              <button
                onClick={() => setShowSlipModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
