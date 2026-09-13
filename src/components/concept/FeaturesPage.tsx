import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  Ticket,
  Clock,
  Sparkles,
  Bell,
  Calendar,
  LayoutDashboard,
  Repeat,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { setCurrentView } = useQueue();

  const features = [
    {
      title: 'Digital Token Management',
      icon: Ticket,
      description: 'Generates secure, sequential OPD tokens by department and doctor. Replaces physical paper slips with digital receipts accessible on any smartphone.',
      benefits: ['Zero lost paper slips', 'Multi-department support', 'Instant QR & digital token slip'],
      view: 'get-token' as const,
      color: 'teal',
    },
    {
      title: 'Live Queue Tracking',
      icon: Clock,
      description: 'Real-time visual tracker displaying currently serving token, patient’s assigned token, and exact number of patients waiting ahead.',
      benefits: ['Eliminates hallway congestion', 'Transparent position in line', 'Auto-refresh simulation mode'],
      view: 'live-queue' as const,
      color: 'blue',
    },
    {
      title: 'Approximate Waiting-Time Estimation',
      icon: Sparkles,
      description: 'AI-assisted estimation model calculating expected wait time based on actual doctor pacing, remaining patients, and case type.',
      benefits: ['Clearly labeled approximate estimate', 'Continuous recalculation', 'Reduces psychological waiting anxiety'],
      view: 'ai-estimation' as const,
      color: 'purple',
    },
    {
      title: 'Turn Notifications',
      icon: Bell,
      description: 'Automated alerts triggered when patient turn is approaching (<=2 patients ahead) and when doctor is ready in the consultation cabin.',
      benefits: ['Audio announcement chime', 'Priority turn banners', 'Freedom to wait in lounge/cafeteria'],
      view: 'notifications' as const,
      color: 'amber',
    },
    {
      title: 'Appointment Tracking',
      icon: Calendar,
      description: 'Comprehensive schedule overview showing upcoming OPD consultations, past appointment history, doctor assignments, and cabin locations.',
      benefits: ['Consolidated visit history', 'Doctor & cabin reference', 'One-click token linkage'],
      view: 'appointments' as const,
      color: 'indigo',
    },
    {
      title: 'Staff Queue Dashboard',
      icon: LayoutDashboard,
      description: 'Dedicated console for doctors and triage nurses to call next patients, monitor lobby load, and manage active consultation flow.',
      benefits: ['1-click "Call Next Patient"', 'Real-time synchronized state', 'OPD throughput monitoring'],
      view: 'staff-dashboard' as const,
      color: 'rose',
    },
    {
      title: 'Feedback-Based Estimation',
      icon: Repeat,
      description: 'Dynamic closed-loop feedback mechanism where completed consultation telemetry automatically recalibrates downstream wait estimates.',
      benefits: ['Self-correcting precision', 'Closed-loop architecture', 'Resilient to clinical delays'],
      view: 'feedback-loop' as const,
      color: 'emerald',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
          System Capabilities
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
          Key Prototype Features
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Comprehensive feature suite demonstrating how digital visibility and dynamic estimation transform hospital outpatient departments.
        </p>
      </div>

      {/* Feature Cards Grid (7 key features) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => {
          const Icon = f.icon;

          return (
            <div
              key={f.title}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-teal-700">
                  <Icon className="w-5 h-5" />
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                  {f.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {f.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  {f.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setCurrentView(f.view)}
                  className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 group"
                >
                  <span>Explore in Demo</span>
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
