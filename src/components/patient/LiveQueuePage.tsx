import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  Clock,
  Ticket,
  Users,
  Play,
  Pause,
  FastForward,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Stethoscope,
  Activity,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const LiveQueuePage: React.FC = () => {
  const {
    patient,
    currentServingTokenNum,
    currentServingTokenStr,
    patientsAhead,
    estimatedWaitMinutes,
    patientQueueStatus,
    queue,
    callNextToken,
    updateCurrentServingToken,
    resetDemoQueue,
    autoSimulation,
    setAutoSimulation,
    autoSimulationCountdown,
  } = useQueue();

  const isMyTurn = currentServingTokenNum === patient.numericToken;
  const isApproaching = patientsAhead <= 2 && patientsAhead > 0;
  const isCompleted = currentServingTokenNum > patient.numericToken;

  // Calculate percentage progression from initial 39 towards patient 47
  const totalDifference = Math.max(1, patient.numericToken - 39);
  const servedCount = Math.max(0, currentServingTokenNum - 39);
  const progressPercent = Math.min(100, Math.round((servedCount / totalDifference) * 100));

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
              Visual Queue Tracker
            </span>
            <span className="text-xs text-slate-500">• OPD Live Room 3</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Real-Time Queue Progression
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tracking patient token progression for <strong>Dr. Priya</strong> (General Medicine OPD, Cabin 3).
          </p>
        </div>

        {/* Auto-Refresh Simulation Toggle Card */}
        <div className="flex flex-col sm:items-end gap-2">
          <div className="flex items-center gap-2">
            <button
              id="btn-auto-refresh-toggle"
              onClick={() => setAutoSimulation(!autoSimulation)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs ${
                autoSimulation
                  ? 'bg-indigo-600 text-white shadow-indigo-200 ring-2 ring-indigo-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {autoSimulation ? (
                <>
                  <Pause className="w-3.5 h-3.5 animate-pulse" />
                  <span>Auto-Progression Active ({autoSimulationCountdown}s)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-teal-600" />
                  <span>Start Auto-Simulation</span>
                </>
              )}
            </button>

            <button
              onClick={callNextToken}
              className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              title="Call Next Patient"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Next</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            {autoSimulation ? 'Advances token every 12 seconds automatically' : 'Click to demonstrate automated queue movement'}
          </p>
        </div>
      </div>

      {/* PRIMARY 4-CARD LIVE TRACKER (Exact prompt format) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Currently Serving */}
        <div className="bg-white rounded-2xl border-2 border-teal-500 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-teal-800 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Current Token</span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Serving
            </span>
          </div>
          <div className="text-4xl font-black font-mono text-teal-700 tracking-tight">
            {currentServingTokenStr}
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            <span>Cabin 3 • Dr. Priya</span>
          </div>
        </div>

        {/* 2. Patient's Token */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Your Token</span>
            <Ticket className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-4xl font-black font-mono text-slate-900 tracking-tight">
            {patient.tokenNumber}
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
            <span>{patient.name}</span>
            <span className="font-semibold text-slate-700 font-mono text-[11px]">{patient.id}</span>
          </div>
        </div>

        {/* 3. Patients Ahead */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Patients Ahead</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-4xl font-black font-mono text-slate-900 tracking-tight">
            {patientsAhead}
          </div>
          <div className="mt-3 text-xs text-slate-500">
            {patientsAhead === 0 && !isCompleted
              ? "You're next in the cabin!"
              : isCompleted
              ? 'Consultation finished'
              : `${patientsAhead} patient${patientsAhead > 1 ? 's' : ''} remaining in queue`}
          </div>
        </div>

        {/* 4. Estimated Wait */}
        <div className="bg-gradient-to-br from-teal-50 to-blue-50/80 rounded-2xl border border-teal-200 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-teal-800 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Estimated Wait</span>
            <Clock className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-black font-mono text-teal-900 tracking-tight">
              {estimatedWaitMinutes}
            </span>
            <span className="text-sm font-bold text-teal-700">minutes</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-teal-800 font-medium">
            <Sparkles className="w-3 h-3 text-teal-600 shrink-0" />
            <span>AI-generated estimate</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Component */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <span>Queue Progress Towards Your Turn</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-mono">
              {progressPercent}% Complete
            </span>
          </div>
          <span className="text-slate-500">
            Current: <strong className="font-mono text-teal-700">{currentServingTokenStr}</strong> → Target: <strong className="font-mono text-blue-700">{patient.tokenNumber}</strong>
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Initial Demo Serving: A-039</span>
          <span>Target Consultation: A-047 (Cabin 3)</span>
        </div>
      </div>

      {/* Detailed Queue Line Table & Simulation Controls */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Detailed Queue List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Active Queue Line</h2>
              <p className="text-xs text-slate-500">Showing token sequence for General Medicine OPD</p>
            </div>
            <div className="text-xs text-slate-500">
              Total in Queue: <strong className="text-slate-800">{queue.length}</strong>
            </div>
          </div>

          <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
            {queue.map((item) => {
              const isServing = item.numericToken === currentServingTokenNum;
              const isUser = item.numericToken === patient.numericToken;
              const isDone = item.numericToken < currentServingTokenNum;
              const aheadFromNow = item.numericToken - currentServingTokenNum;

              return (
                <div
                  key={item.id}
                  className={`p-4 flex items-center justify-between transition-colors ${
                    isServing
                      ? 'bg-teal-50/80'
                      : isUser
                      ? 'bg-blue-50/80 border-l-4 border-l-blue-600'
                      : isDone
                      ? 'bg-slate-50/50 opacity-60'
                      : 'hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm shrink-0 border ${
                        isServing
                          ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                          : isUser
                          ? 'bg-blue-600 text-white border-blue-700'
                          : isDone
                          ? 'bg-slate-200 text-slate-500 border-slate-300'
                          : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <span>{item.tokenNumber}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-sm">
                          {item.patientName}
                        </span>
                        {isUser && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                            YOU
                          </span>
                        )}
                        {isServing && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            INSIDE CABIN
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>ID: {item.patientId}</span>
                        <span>•</span>
                        <span>{item.appointmentType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {isServing ? (
                      <div className="text-xs font-bold text-teal-700">Consulting Now</div>
                    ) : isDone ? (
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1 justify-end">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          ~{item.estimatedMinutes} mins
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {aheadFromNow} ahead
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Demo Queue Controls & Explanations */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-600" />
              <span>Demonstration Queue Steps</span>
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Use these shortcuts during your college project presentation to simulate different waiting scenarios:
            </p>

            <div className="space-y-2">
              <button
                onClick={callNextToken}
                className="w-full py-2.5 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-between shadow-xs"
              >
                <span>Call Next Token (+1)</span>
                <FastForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => updateCurrentServingToken(45)}
                className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between"
              >
                <span>Jump to Approaching (A-045)</span>
                <Bell className="w-4 h-4 text-amber-600" />
              </button>

              <button
                onClick={() => updateCurrentServingToken(47)}
                className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between"
              >
                <span>Jump to Dhanu Sri's Turn (A-047)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={resetDemoQueue}
                className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Reset to Initial State (A-039)</span>
                <RotateCcw className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          <ResponsibleAIDisclaimer />
        </div>
      </div>
    </div>
  );
};
