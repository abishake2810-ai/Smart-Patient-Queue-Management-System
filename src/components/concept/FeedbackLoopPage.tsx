import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  Repeat,
  ArrowDown,
  Activity,
  Database,
  Brain,
  Clock,
  LayoutDashboard,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const FeedbackLoopPage: React.FC = () => {
  const {
    currentServingTokenStr,
    currentServingTokenNum,
    patientsAhead,
    estimatedWaitMinutes,
    doctorConsultationPace,
    callNextToken,
    patient,
  } = useQueue();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [autoLoop, setAutoLoop] = useState<boolean>(false);

  const loopSteps = [
    {
      id: 1,
      title: '1. Actual Queue Progress',
      subtitle: 'Doctor / Nurse Action',
      icon: Activity,
      color: 'teal',
      badge: 'Hospital OPD Floor',
      description: `Doctor Priya finishes consultation with token ${currentServingTokenStr} and calls the next waiting patient into Cabin 3.`,
      metric: `Currently Serving: ${currentServingTokenStr}`,
    },
    {
      id: 2,
      title: '2. Queue Data',
      subtitle: 'Event Ingestion',
      icon: Database,
      color: 'blue',
      badge: 'Telemetry & Logs',
      description: `Timestamp recorded: Consultation duration captured, current queue length updated, token status marked as completed.`,
      metric: `Pace: ${doctorConsultationPace.toFixed(1)} mins/patient`,
    },
    {
      id: 3,
      title: '3. AI Waiting-Time Estimator',
      subtitle: 'Dynamic Recalculation',
      icon: Brain,
      color: 'indigo',
      badge: 'AI Supporting Model',
      description: `The estimation engine re-runs the regression formula factoring in remaining patients (${patientsAhead}) and actual doctor velocity today.`,
      metric: `Formula: ${patientsAhead} ahead × ${doctorConsultationPace.toFixed(1)}m`,
    },
    {
      id: 4,
      title: '4. Updated Approximate Waiting Time',
      subtitle: 'Revised Prediction',
      icon: Clock,
      color: 'amber',
      badge: 'Time Window Output',
      description: `Estimated wait time updates to approximately ~${estimatedWaitMinutes} minutes (with safe confidence variance).`,
      metric: `New Wait Time: ~${estimatedWaitMinutes} minutes`,
    },
    {
      id: 5,
      title: '5. Patient Dashboard',
      subtitle: 'Client Synchronization',
      icon: LayoutDashboard,
      color: 'emerald',
      badge: 'Patient Interface',
      description: `Patient Dhanu Sri sees live queue progress on her smartphone without asking staff or waiting in crowded doorways.`,
      metric: `Dhanu Sri (${patient.tokenNumber}): ${patientsAhead} ahead`,
    },
    {
      id: 6,
      title: '6. Loop Cycle Closes',
      subtitle: 'Continuous Self-Correction',
      icon: Repeat,
      color: 'purple',
      badge: 'Closed-Loop Feedback',
      description: `Patient arrives at Cabin 3 right on time. Doctor initiates next consultation, feeding fresh telemetry into Step 1.`,
      metric: `Self-Correcting Loop Active`,
    },
  ];

  const handleStepForward = () => {
    setActiveStepIndex((prev) => (prev + 1) % loopSteps.length);
  };

  const handleExecuteFullLoop = () => {
    callNextToken();
    setActiveStepIndex(0);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-1.5">
            <Repeat className="w-3.5 h-3.5 text-teal-600" />
            <span>Visual Feedback Concept</span>
          </span>
          <span className="text-xs text-slate-500">• Section 12 Specification</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          The Dynamic Queue Feedback Loop
        </h1>

        <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
          Hospital queues are non-linear: emergencies happen, follow-ups take 2 minutes, and complex evaluations take 10 minutes. A static board fails. Our feedback loop continuously calibrates approximate waiting times based on real OPD throughput.
        </p>

        {/* Action Controls */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={handleExecuteFullLoop}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Simulate Real Action in Feedback Loop (Call Next Token)</span>
          </button>

          <button
            onClick={handleStepForward}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            Highlight Next Stage ({activeStepIndex + 1}/6)
          </button>
        </div>
      </div>

      {/* Visual Vertical Feedback Flow Diagram (Exact Prompt Order) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-bold text-slate-900 text-base">
            System Architecture: The 6 Closed-Loop Steps
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Cycle Frequency: Real-Time Event Driven
          </span>
        </div>

        <div className="space-y-3 py-2">
          {loopSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStepIndex === idx;

            return (
              <React.Fragment key={step.id}>
                <div
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-50 to-blue-50 border-teal-500 shadow-md ring-2 ring-teal-200'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shrink-0 shadow-xs ${
                          isActive
                            ? 'bg-teal-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                            {step.title}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200/80 text-slate-700">
                            {step.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <span className="inline-block px-3 py-1 rounded-lg bg-white border border-slate-200 font-mono text-xs font-semibold text-teal-800 shadow-2xs">
                        {step.metric}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Down Arrow between stages */}
                {idx < loopSteps.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* Loop Return connector */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-teal-700 bg-teal-50 py-2.5 rounded-xl border border-teal-200">
            <Repeat className="w-4 h-4" />
            <span>Cycle repeats automatically: Next consultation logs feed back into Step 1</span>
          </div>
        </div>
      </div>

      {/* College Project Evaluation Note */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-md border border-slate-800 space-y-3">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Academic Significance for Evaluators</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The feedback loop is the core architectural innovation of this project. Instead of displaying static appointment estimates that become inaccurate as the morning progresses, this system treats queue progression as a continuous closed control loop. As actual consultation durations fluctuate, downstream estimated waiting times automatically recalibrate.
        </p>
      </div>

      <ResponsibleAIDisclaimer />
    </div>
  );
};
