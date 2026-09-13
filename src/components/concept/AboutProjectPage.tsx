import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Users,
  Activity,
  Award,
} from 'lucide-react';

export const AboutProjectPage: React.FC = () => {
  const { setCurrentView } = useQueue();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Primary Project Hero Box with exact prompt phrase */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-md ring-4 ring-teal-50">
          <GraduationCap className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            Academic Project Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Smart Patient Queue Management System
          </h1>
        </div>

        {/* Required explanation in prompt */}
        <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-slate-800 text-sm font-medium leading-relaxed max-w-2xl mx-auto">
          "This is an academic prototype designed to reduce uncertainty during hospital waiting by providing clear queue information and approximate waiting-time updates."
        </div>
      </div>

      {/* Prominent Responsible AI Section with exact required disclaimer */}
      <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-slate-50 rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-amber-900">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
          <h2 className="text-lg font-bold">
            Responsible AI & Medical Disclaimer
          </h2>
        </div>

        {/* Required exact disclaimer text */}
        <div className="p-4 bg-white/80 rounded-xl border border-amber-200 text-slate-800 text-sm leading-relaxed font-medium">
          "AI is used only as a supporting technology for approximate waiting-time estimation. The problem was identified through real-world observation. This prototype uses simulated data and does not provide medical advice."
        </div>

        <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-2">
          <div className="p-3 bg-white/70 rounded-xl border border-amber-200/60">
            <span className="font-bold text-slate-800 block mb-1">Simulated Data Only</span>
            <span>All tokens, patient names, and doctor schedules are mocked for demonstration.</span>
          </div>
          <div className="p-3 bg-white/70 rounded-xl border border-amber-200/60">
            <span className="font-bold text-slate-800 block mb-1">No Diagnostic Claims</span>
            <span>The system does not diagnose conditions or handle clinical medical records.</span>
          </div>
          <div className="p-3 bg-white/70 rounded-xl border border-amber-200/60">
            <span className="font-bold text-slate-800 block mb-1">Zero Commercial Payments</span>
            <span>Academic scope strictly focused on waiting uncertainty reduction.</span>
          </div>
        </div>
      </div>

      {/* Academic Problem Statement & Methodology */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-2">
            The Real-World Problem Identified
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In typical hospital Outpatient Departments (OPD), patients face severe anxiety and frustration caused not merely by the physical wait time, but by <strong>the complete opacity and uncertainty</strong> of the waiting process. Patients cluster outside clinic doors because they fear missing their turn if they step away to sit or use the restroom.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">Traditional Hospital Waiting</span>
            <ul className="space-y-1.5 text-slate-500 list-disc list-inside">
              <li>Paper token slips easily lost or misread</li>
              <li>Unannounced turn progression and skipped turns</li>
              <li>Hallway overcrowding outside consultation cabins</li>
              <li>High patient anxiety and repeated desk inquiries</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 space-y-2">
            <span className="font-bold text-teal-900 block text-sm">Smart Queue Prototype Solution</span>
            <ul className="space-y-1.5 text-teal-800 list-disc list-inside font-medium">
              <li>Transparent live tracker with exact patients ahead</li>
              <li>Dynamic approximate waiting-time estimates</li>
              <li>Automated turn approaching notifications</li>
              <li>Seamless closed-loop feedback across patient and staff</li>
            </ul>
          </div>
        </div>

        {/* College Project Metadata */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>Project Domain: <strong>Healthcare Informatics & Queue Systems</strong></span>
          </div>
          <div>
            <span>Target Presentation: <strong>Final Year / College Capstone Prototype</strong></span>
          </div>
        </div>
      </div>

      {/* Demo Flow Quick Links */}
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Ready to explore the demo?</h3>
          <p className="text-xs text-slate-500">Switch between the Patient Portal and Staff Console anytime.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView('patient-dashboard')}
            className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
          >
            Patient Dashboard
          </button>
          <button
            onClick={() => setCurrentView('staff-dashboard')}
            className="px-3.5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
          >
            Staff Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
