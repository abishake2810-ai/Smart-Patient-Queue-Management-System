import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  Calendar,
  Clock,
  Stethoscope,
  MapPin,
  Ticket,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const { appointments, setCurrentView, patient, currentServingTokenStr } = useQueue();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

  const upcomingAppointments = appointments.filter((a) => a.status === 'Waiting' || a.status === 'Confirmed');
  const pastAppointments = appointments.filter((a) => a.status === 'Completed' || a.status === 'Cancelled');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
              Appointments
            </span>
            <span className="text-xs text-slate-400">• OPD Schedule</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Patient Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            View scheduled OPD appointments, assigned consulting doctors, and generated queue tokens.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('get-token')}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book New Token</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold text-slate-600">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-3.5 py-2 rounded-lg transition-colors ${
            activeTab === 'upcoming' ? 'bg-teal-600 text-white shadow-xs' : 'hover:bg-slate-100'
          }`}
        >
          Upcoming Appointments ({upcomingAppointments.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-3.5 py-2 rounded-lg transition-colors ${
            activeTab === 'history' ? 'bg-teal-600 text-white shadow-xs' : 'hover:bg-slate-100'
          }`}
        >
          Past Consultations ({pastAppointments.length})
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {(activeTab === 'upcoming' ? upcomingAppointments : pastAppointments).map((apt) => (
          <div
            key={apt.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-teal-300 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {apt.status}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {apt.type}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Token Number:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-amber-400 font-mono font-bold text-sm">
                  {apt.tokenNumber}
                </span>
              </div>
            </div>

            {/* Grid of parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Department</span>
                <span className="font-semibold text-slate-800 text-sm">{apt.department}</span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Doctor</span>
                <span className="font-semibold text-slate-800 text-sm flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                  <span>{apt.doctor}</span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Date & Time</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{apt.date}, {apt.time}</span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Location</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{apt.cabin}</span>
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">
                Current OPD Serving: <strong className="font-mono text-teal-700">{currentServingTokenStr}</strong>
              </span>

              <button
                onClick={() => setCurrentView('live-queue')}
                className="text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
              >
                <span>Track Live Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ResponsibleAIDisclaimer />
    </div>
  );
};
