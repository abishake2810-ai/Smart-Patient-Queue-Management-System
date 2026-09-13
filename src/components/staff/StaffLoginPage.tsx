import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import { Stethoscope, KeyRound, ShieldAlert, Sparkles, LogIn, ArrowRight } from 'lucide-react';

export const StaffLoginPage: React.FC = () => {
  const { loginAsStaff, setCurrentView } = useQueue();
  const [employeeId, setEmployeeId] = useState('ST-402');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId.trim()) {
      setError('Please provide Employee ID');
      return;
    }
    loginAsStaff(employeeId);
  };

  const handleDemoQuickStaffLogin = () => {
    setEmployeeId('ST-402');
    setPassword('demo');
    loginAsStaff('ST-402');
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md ring-4 ring-purple-50">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Hospital Staff & OPD Portal
          </h1>
          <p className="text-xs text-slate-500">
            Demo credentials for Doctors, Triage Nurses, and OPD Desk Staff
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Staff / Employee ID
            </label>
            <input
              id="input-staff-id"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="e.g. ST-402"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-hidden bg-slate-50/50"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Demo ID: <strong>ST-402</strong> (Dr. Priya / Sister Mary)</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Demo Access Code
            </label>
            <input
              id="input-staff-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-hidden bg-slate-50/50"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Any password works for demo mode</p>
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              id="btn-staff-login-submit"
              type="submit"
              className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In as OPD Staff</span>
            </button>

            <button
              id="btn-staff-demo-quick"
              type="button"
              onClick={handleDemoQuickStaffLogin}
              className="w-full py-2.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>1-Click Demo Staff Login (Dr. Priya Desk)</span>
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => setCurrentView('login')}
            className="text-teal-700 hover:underline font-medium"
          >
            ← Open Unified Login Portal
          </button>
          <span className="text-[11px] text-slate-400">Cabin 3 • OPD</span>
        </div>
      </div>

      <div className="mt-4">
        <ResponsibleAIDisclaimer compact />
      </div>
    </div>
  );
};
