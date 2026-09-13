import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  User,
  ShieldCheck,
  Stethoscope,
  Building2,
  Calendar,
  Ticket,
  Phone,
  Clock,
  MapPin,
  Lock,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { patient, setCurrentView } = useQueue();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xl shadow-xs ring-4 ring-teal-50">
          {patient.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{patient.name}</h1>
            <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-100">
              Demo Patient
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Patient ID: <strong className="font-mono text-slate-700">{patient.id}</strong> • Outpatient Queue Registered
          </p>
        </div>
      </div>

      {/* Basic Demo Information Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
            Basic Registration Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block mb-1">Full Name</span>
              <span className="font-semibold text-slate-800 text-sm">{patient.name}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block mb-1">Patient ID</span>
              <span className="font-mono font-bold text-teal-700 text-sm">{patient.id}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block mb-1">Contact Mobile</span>
              <span className="font-medium text-slate-800 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{patient.phone}</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block mb-1">Department</span>
              <span className="font-medium text-slate-800 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{patient.department}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Current Active Appointment Details */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
            Active Appointment Details
          </h2>
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50/50 to-blue-50/50 border border-teal-200 space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-teal-900 text-sm">
                {patient.appointmentType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white font-mono font-bold text-xs">
                Token {patient.tokenNumber}
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-slate-700">
              <div>
                <span className="text-slate-400 block text-[11px]">Consulting Doctor:</span>
                <span className="font-medium">{patient.doctor}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Consultation Cabin:</span>
                <span className="font-medium">{patient.cabin}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Date & Time:</span>
                <span className="font-medium">{patient.appointmentDate}, {patient.appointmentTime}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-teal-200/70 flex flex-wrap items-center justify-between gap-2">
              <button
                id="btn-profile-switch-account"
                onClick={() => setCurrentView('login')}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
              >
                Switch Account / Login Portal
              </button>
              <button
                id="btn-profile-track-live"
                onClick={() => setCurrentView('live-queue')}
                className="px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                Track In Live Queue
              </button>
            </div>
          </div>
        </div>

        {/* Privacy notice complying with prompt mandate: "Do not request sensitive medical information." */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <Lock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-800">Academic Privacy & Safety Standards</span>
            <p className="leading-relaxed">
              In accordance with project guidelines, this academic prototype operates strictly with simulated queue and token data. No sensitive medical history, diagnosis files, or personal clinical records are collected, stored, or processed.
            </p>
          </div>
        </div>
      </div>

      <ResponsibleAIDisclaimer />
    </div>
  );
};
