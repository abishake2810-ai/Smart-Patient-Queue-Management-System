import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  Brain,
  Sparkles,
  Calculator,
  Sliders,
  TrendingDown,
  Info,
  Clock,
  Users,
  Activity,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export const AIWaitingEstimationPage: React.FC = () => {
  const {
    currentServingTokenNum,
    currentServingTokenStr,
    patient,
    patientsAhead,
    estimatedWaitMinutes,
    doctorConsultationPace,
    setDoctorConsultationPace,
    complexityFactor,
    setComplexityFactor,
    callNextToken,
  } = useQueue();

  // Interactive sandbox sliders for simulation exploration
  const [simPatientsAhead, setSimPatientsAhead] = useState(patientsAhead);
  const [simDuration, setSimDuration] = useState(4.4);
  const [simComplexity, setSimComplexity] = useState(1.0);

  const calculatedSimWait = Math.round(simPatientsAhead * simDuration * simComplexity);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Concept Section</span>
          </span>
          <span className="text-xs text-slate-500">• Academic Demonstration</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          AI-Powered Approximate Waiting-Time Estimation
        </h1>

        <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
          Unlike traditional static queue boards with rigid fixed time slots, our AI estimator dynamically updates patient waiting times using real-time consultation duration, queue progression rate, and historical doctor pacing.
        </p>

        {/* Required label in prompt */}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-semibold text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Display Notice: "AI-generated approximate estimate"</span>
        </div>
      </div>

      {/* Live OPD State Card: Showing how it adapts right now */}
      <div className="bg-gradient-to-r from-teal-50/80 via-blue-50/60 to-indigo-50/70 rounded-2xl border border-teal-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-700" />
            <span>Active Real-Time Calculation for Dhanu Sri ({patient.tokenNumber})</span>
          </h2>
          <span className="text-xs font-mono font-semibold text-teal-800 bg-white px-2.5 py-1 rounded-lg border border-teal-200 shadow-2xs">
            Current Serving: {currentServingTokenStr}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-teal-100 shadow-2xs">
            <span className="text-slate-400 block mb-1">Queue Difference</span>
            <span className="text-xl font-bold font-mono text-slate-800">
              {patient.numericToken} - {currentServingTokenNum} = {patientsAhead}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Patients Ahead</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-teal-100 shadow-2xs">
            <span className="text-slate-400 block mb-1">Avg Consultation Pace</span>
            <span className="text-xl font-bold font-mono text-teal-700">
              ~{doctorConsultationPace.toFixed(1)} min
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Rolling average</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-teal-100 shadow-2xs">
            <span className="text-slate-400 block mb-1">Pacing Multiplier</span>
            <span className="text-xl font-bold font-mono text-indigo-700">
              {complexityFactor.toFixed(1)}x
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Case complexity</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border-2 border-teal-500 shadow-2xs">
            <span className="text-teal-700 font-bold block mb-1">Calculated Estimate</span>
            <span className="text-2xl font-black font-mono text-teal-900">
              ~{estimatedWaitMinutes} mins
            </span>
            <span className="text-[10px] text-teal-700 font-medium block mt-0.5">
              AI-generated approximate
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 text-xs text-slate-600">
          <span>Click to see how the estimation decreases when the queue advances:</span>
          <button
            onClick={callNextToken}
            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Advance 1 Token</span>
          </button>
        </div>
      </div>

      {/* 5 Core Information Factors Mandated in Section 11 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="font-bold text-slate-900 text-lg">
          The 5 Queue Information Factors Used in the Model
        </h2>
        <p className="text-xs text-slate-500">
          The estimation model processes five continuous streams of simulated queue telemetry:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-[10px]">1</span>
              <span>Current Token Number</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              The identifier of the patient currently inside the consultation cabin (<code className="text-teal-700 font-bold">A-039</code>). Confirmed when the doctor marks previous token done.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-[10px]">2</span>
              <span>Patient's Assigned Token</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              The unique token issued to the patient at registration (<code className="text-blue-700 font-bold">A-047</code>). Fixed position in the department sequence.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-[10px]">3</span>
              <span>Number of Patients Ahead</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Computed as <code className="font-bold text-slate-800">Token_patient - Token_current</code> (<code className="font-bold text-slate-800">8 patients</code>). Decreases linearly as patients enter.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-[10px]">4</span>
              <span>Simulated Consultation Duration</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Rolling average of doctor consultation times today (~4.4 mins/patient for Dr. Priya, varying between 3 min prescription refills and 7 min new evaluations).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-[10px]">5</span>
              <span>Queue Progression Speed</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Calculates throughput over the last 30 minutes. If consultations are completing faster than average, the AI adjusts the estimate downward.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-1.5">
            <div className="font-bold text-indigo-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Feedback Loop Convergence</span>
            </div>
            <p className="text-indigo-900 leading-relaxed text-[11px]">
              Continuous error adjustment ensures estimates self-correct so patients always receive honest, approximate time windows.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Estimation Sandbox */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-600" />
              <span>Interactive Parameter Sandbox</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Experiment with queue variables to demonstrate how the mathematical formula reacts in real time.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Sandbox Wait Time:</span>
            <span className="text-2xl font-black font-mono text-teal-700">~{calculatedSimWait} mins</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-xs">
          {/* Slider 1: Patients Ahead */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-700">Patients Ahead</span>
              <span className="font-mono text-teal-700 font-bold">{simPatientsAhead}</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={simPatientsAhead}
              onChange={(e) => setSimPatientsAhead(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 (Your turn)</span>
              <span>12</span>
              <span>25</span>
            </div>
          </div>

          {/* Slider 2: Consultation Pace */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-700">Doctor Pace (min/patient)</span>
              <span className="font-mono text-teal-700 font-bold">{simDuration.toFixed(1)}m</span>
            </div>
            <input
              type="range"
              min="2.0"
              max="10.0"
              step="0.2"
              value={simDuration}
              onChange={(e) => setSimDuration(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>2.0 min (Fast)</span>
              <span>4.4 min (Normal)</span>
              <span>10.0 min</span>
            </div>
          </div>

          {/* Slider 3: Case Complexity */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-700">Case Complexity Factor</span>
              <span className="font-mono text-indigo-700 font-bold">{simComplexity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.6"
              step="0.1"
              value={simComplexity}
              onChange={(e) => setSimComplexity(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0.8x (Follow-ups)</span>
              <span>1.0x (Standard)</span>
              <span>1.6x (Complex)</span>
            </div>
          </div>
        </div>

        {/* Mathematical Formula Display */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-1">
          <div className="text-teal-400 text-[11px] font-bold uppercase tracking-wider">
            Mathematical Estimation Formula:
          </div>
          <div className="text-sm text-white font-semibold">
            Approximate Wait Time = Patients Ahead × Avg Consultation Duration × Case Complexity
          </div>
          <div className="text-slate-400 text-xs mt-1">
            = {simPatientsAhead} × {simDuration.toFixed(1)} × {simComplexity.toFixed(1)} ≈ <strong className="text-amber-400">{calculatedSimWait} minutes</strong>
          </div>
        </div>
      </div>

      <ResponsibleAIDisclaimer />
    </div>
  );
};
