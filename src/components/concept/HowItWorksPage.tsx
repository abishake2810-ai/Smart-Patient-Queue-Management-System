import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  UserPlus,
  Ticket,
  Activity,
  Brain,
  Smartphone,
  Bell,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentView } = useQueue();

  const steps = [
    {
      stepNumber: 'Step 1',
      title: 'Patient registers',
      icon: UserPlus,
      color: 'blue',
      summary: 'Patient arrives at the hospital OPD or accesses the digital kiosk and enters basic identification (Patient ID & phone).',
      detail: 'Minimal non-sensitive registration prevents unnecessary data collection while verifying appointment eligibility.',
      actionLabel: 'Try Registration',
      actionView: 'patient-login' as const,
    },
    {
      stepNumber: 'Step 2',
      title: 'Patient receives token',
      icon: Ticket,
      color: 'teal',
      summary: 'A digital token (e.g., A-047) is generated in strict chronological order for the assigned doctor and department.',
      detail: 'The patient receives an instant digital token slip with department, assigned cabin, and initial queue position.',
      actionLabel: 'Generate Token',
      actionView: 'get-token' as const,
    },
    {
      stepNumber: 'Step 3',
      title: 'System tracks queue',
      icon: Activity,
      color: 'indigo',
      summary: 'The central system synchronizes in real time as the doctor calls patients inside Cabin 3.',
      detail: 'Each time the OPD doctor clicks "Call Next Token", the serving token increments and timestamps are logged.',
      actionLabel: 'View Staff Console',
      actionView: 'staff-dashboard' as const,
    },
    {
      stepNumber: 'Step 4',
      title: 'AI estimates approximate waiting time',
      icon: Brain,
      color: 'purple',
      summary: 'The AI estimator computes approximate wait time based on patients ahead, average consultation pace, and queue speed.',
      detail: 'Clearly displayed as an "AI-generated approximate estimate", dynamically updating as the morning progresses.',
      actionLabel: 'Explore AI Model',
      actionView: 'ai-estimation' as const,
    },
    {
      stepNumber: 'Step 5',
      title: 'Patient sees queue status',
      icon: Smartphone,
      color: 'emerald',
      summary: 'Patient views live queue progress on their smartphone dashboard, including exact number of patients ahead.',
      detail: 'Reduces hallway crowding and waiting uncertainty by allowing patients to sit comfortably in cafeteria or waiting lounge.',
      actionLabel: 'Open Dashboard',
      actionView: 'patient-dashboard' as const,
    },
    {
      stepNumber: 'Step 6',
      title: 'Notification is sent when turn approaches',
      icon: Bell,
      color: 'amber',
      summary: 'When only 2 patients remain, an alert instructs the patient to proceed to the designated consultation cabin.',
      detail: 'Ensures patients never miss their turn while avoiding chaotic clustering outside clinic doors.',
      actionLabel: 'Check Notifications',
      actionView: 'notifications' as const,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
          System Overview
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
          How the Smart Patient Queue System Works
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          From hospital arrival to doctor consultation: a seamless 6-step digital workflow that eliminates uncertainty and streamlines outpatient care.
        </p>
      </div>

      {/* 6 Steps Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((s) => {
          const Icon = s.icon;

          return (
            <div
              key={s.stepNumber}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-teal-100/80 text-teal-800 font-mono font-bold text-xs">
                    {s.stepNumber}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-teal-700">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                  {s.title}
                </h2>

                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {s.summary}
                </p>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {s.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setCurrentView(s.actionView)}
                  className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 group"
                >
                  <span>{s.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ResponsibleAIDisclaimer />
    </div>
  );
};
