import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import { Activity, LogIn, UserPlus, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export const WelcomeLoginPage: React.FC = () => {
  const { loginAsPatient, generateToken } = useQueue();
  const [activeTab, setActiveTab] = useState<'login' | 'new-patient'>('login');

  // Login form state
  const [patientId, setPatientId] = useState('CS-1001');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [loginError, setLoginError] = useState('');

  // New Patient registration state
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newDept, setNewDept] = useState('General Medicine');
  const [newDoctor, setNewDoctor] = useState('Dr. Priya');
  const [newAppointmentType, setNewAppointmentType] = useState('Regular Consultation');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId.trim() || !mobileNumber.trim()) {
      setLoginError('Please enter both Patient ID and registered mobile number.');
      return;
    }
    setLoginError('');
    loginAsPatient(patientId.trim());
  };

  const handleDemoLogin = () => {
    setPatientId('CS-1001');
    setMobileNumber('9876543210');
    loginAsPatient('CS-1001');
  };

  const handleNewPatientRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMobile.trim()) {
      setLoginError('Please provide a name and mobile contact.');
      return;
    }
    generateToken({
      name: newName.trim(),
      phone: newMobile.trim(),
      department: newDept,
      doctor: newDoctor,
      appointmentType: newAppointmentType,
    });
    loginAsPatient();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white shadow-md mb-4 ring-4 ring-teal-50">
          <Activity className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome to Smart Patient Queue
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2">
          Academic demonstration prototype reducing waiting uncertainty with digital token tracking and approximate waiting-time estimates.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Login / Registration Form */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex border-b border-slate-200 mb-6">
            <button
              id="tab-btn-login"
              onClick={() => setActiveTab('login')}
              className={`pb-3 font-semibold text-sm transition-colors relative flex-1 text-center ${
                activeTab === 'login' ? 'text-teal-700 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Patient Sign In
            </button>
            <button
              id="tab-btn-new-patient"
              onClick={() => setActiveTab('new-patient')}
              className={`pb-3 font-semibold text-sm transition-colors relative flex-1 text-center ${
                activeTab === 'new-patient' ? 'text-teal-700 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              New Patient
            </button>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Patient ID
                </label>
                <input
                  id="input-patient-id"
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="e.g. CS-1001"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-slate-50/50"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">Demo Patient ID: <strong className="text-slate-600">CS-1001</strong></p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number
                </label>
                <input
                  id="input-patient-mobile"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-slate-50/50"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">Only used for queue turn notifications</p>
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  id="btn-patient-login-submit"
                  type="submit"
                  className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log In to Patient Portal</span>
                </button>

                <button
                  id="btn-demo-quick-login"
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 text-teal-800 border border-teal-200 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Demo Login (Dhanu Sri • Token A-047)</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleNewPatientRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  id="input-new-patient-name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Kavya Mohan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Contact
                </label>
                <input
                  id="input-new-patient-mobile"
                  type="tel"
                  value={newMobile}
                  onChange={(e) => setNewMobile(e.target.value)}
                  placeholder="e.g. 9812345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Department
                  </label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="General Medicine">General Medicine</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Consultation Type
                  </label>
                  <select
                    value={newAppointmentType}
                    onChange={(e) => setNewAppointmentType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Regular Consultation">Regular Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Prescription Refill">Prescription Refill</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="btn-new-patient-submit"
                  type="submit"
                  className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register & Generate Token</span>
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Academic project: Only minimal demo information is recorded. No health records or sensitive data are collected.</span>
          </div>
        </div>

        {/* Right Column: College Demo Information & Flow summary */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-md border border-slate-800">
            <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>College Project Demonstration</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Preset Demo Profile
            </h2>
            <div className="bg-slate-800/80 rounded-xl p-3.5 space-y-2 text-xs border border-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-700/60">
                <span className="text-slate-400">Patient Name:</span>
                <span className="font-semibold text-white">Dhanu Sri</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700/60">
                <span className="text-slate-400">Patient ID:</span>
                <span className="font-mono font-medium text-teal-300">CS-1001</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700/60">
                <span className="text-slate-400">Department:</span>
                <span className="text-slate-200">General Medicine</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700/60">
                <span className="text-slate-400">Assigned Doctor:</span>
                <span className="text-slate-200">Dr. Priya (Cabin 3)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700/60">
                <span className="text-slate-400">Assigned Token:</span>
                <span className="font-mono font-bold text-amber-400">A-047</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Initial Queue Position:</span>
                <span className="text-emerald-300 font-medium">8 patients ahead (~35 min wait)</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={handleDemoLogin}
                className="w-full py-2 px-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
              >
                Instant 1-Click Launch
              </button>
            </div>
          </div>

          <ResponsibleAIDisclaimer />
        </div>
      </div>
    </div>
  );
};
