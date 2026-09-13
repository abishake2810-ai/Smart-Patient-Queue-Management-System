import React, { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import { AppView } from '../types';
import {
  Activity,
  Ticket,
  Clock,
  Bell,
  Calendar,
  User,
  ShieldAlert,
  Brain,
  Repeat,
  HelpCircle,
  Sparkles,
  Info,
  Menu,
  X,
  Stethoscope,
  LogIn,
  LayoutDashboard,
  Users,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    unreadNotificationCount,
    currentServingTokenStr,
    isStaffLoggedIn,
    isPatientLoggedIn,
    logoutPatient,
    logoutStaff,
    patient,
  } = useQueue();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  const isStaffActive = currentView.startsWith('staff-') || currentView === 'queue-management';
  const isConceptActive = ['ai-estimation', 'feedback-loop', 'how-it-works', 'features', 'about-project'].includes(currentView);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-10 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('patient-dashboard')}
              className="flex items-center gap-3 text-left focus:outline-hidden"
              id="brand-header-link"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-sm ring-2 ring-teal-100">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                  Smart Patient Queue Management System
                </h1>
                <p className="text-[11px] text-teal-700 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                  Academic Prototype • College Project Demo
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-600">
            {/* Patient Portal Links */}
            <button
              id="nav-btn-dashboard"
              onClick={() => navigateTo('patient-dashboard')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'patient-dashboard'
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-teal-600" />
              <span>Dashboard</span>
            </button>

            <button
              id="nav-btn-get-token"
              onClick={() => navigateTo('get-token')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'get-token'
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Ticket className="w-4 h-4 text-teal-600" />
              <span>Get Token</span>
            </button>

            <button
              id="nav-btn-live-queue"
              onClick={() => navigateTo('live-queue')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'live-queue'
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Live Queue</span>
            </button>

            <button
              id="nav-btn-notifications"
              onClick={() => navigateTo('notifications')}
              className={`relative px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'notifications'
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Bell className="w-4 h-4 text-teal-600" />
              <span>Notifications</span>
              {unreadNotificationCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            <button
              id="nav-btn-appointments"
              onClick={() => navigateTo('appointments')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'appointments'
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Appointments</span>
            </button>

            {/* Academic & AI Concept Dropdown */}
            <div className="relative group">
              <button
                id="nav-btn-ai-concepts"
                onClick={() => setDropdownOpen(dropdownOpen === 'concept' ? null : 'concept')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isConceptActive
                    ? 'bg-indigo-50 text-indigo-800 font-semibold'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Brain className="w-4 h-4 text-indigo-600" />
                <span>AI & Concepts</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-full font-bold">5</span>
              </button>

              <div className="absolute left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 hidden group-hover:block z-50">
                <button
                  onClick={() => navigateTo('ai-estimation')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-slate-900"
                >
                  <Brain className="w-3.5 h-3.5 text-indigo-600" />
                  <div>
                    <div className="font-semibold">AI Waiting-Time Estimation</div>
                    <div className="text-[10px] text-slate-500">Mathematical & AI estimation model</div>
                  </div>
                </button>
                <button
                  onClick={() => navigateTo('feedback-loop')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-slate-900"
                >
                  <Repeat className="w-3.5 h-3.5 text-teal-600" />
                  <div>
                    <div className="font-semibold">Dynamic Feedback Loop</div>
                    <div className="text-[10px] text-slate-500">Self-correcting queue data cycle</div>
                  </div>
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button
                  onClick={() => navigateTo('how-it-works')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-slate-900"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>How It Works (6 Steps)</span>
                </button>
                <button
                  onClick={() => navigateTo('features')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-slate-900"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Key Project Features</span>
                </button>
                <button
                  onClick={() => navigateTo('about-project')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-slate-900"
                >
                  <Info className="w-3.5 h-3.5 text-slate-600" />
                  <span>About Project & Disclaimer</span>
                </button>
              </div>
            </div>

            {/* Staff / OPD Portal Button */}
            <div className="h-5 w-px bg-slate-200 mx-1"></div>

            <button
              id="nav-btn-staff-portal"
              onClick={() => {
                if (isStaffLoggedIn) {
                  navigateTo('staff-dashboard');
                } else {
                  navigateTo('staff-login');
                }
              }}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                isStaffActive
                  ? 'bg-purple-50 text-purple-800 font-semibold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-purple-600" />
              <span>Staff / OPD</span>
            </button>

            {/* Login / Auth Button */}
            <button
              id="nav-btn-login"
              onClick={() => navigateTo('login')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                currentView === 'login' || currentView === 'patient-login'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-teal-50 text-teal-800 hover:bg-teal-100'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login Portal</span>
            </button>

            {/* Patient Profile */}
            <button
              id="nav-btn-profile"
              onClick={() => navigateTo('profile')}
              className={`p-2 rounded-lg transition-colors text-slate-600 hover:bg-slate-100 hover:text-slate-900 ${
                currentView === 'profile' ? 'bg-teal-50 text-teal-800' : ''
              }`}
              title={`Patient Profile (${patient.name})`}
            >
              <User className="w-4 h-4 text-slate-700" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => navigateTo('notifications')}
              className="relative p-2 text-slate-600 hover:text-slate-900"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-teal-600" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 pt-2">
            Patient Portal
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateTo('patient-dashboard')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-slate-50 text-slate-800 hover:bg-teal-50"
            >
              <LayoutDashboard className="w-4 h-4 text-teal-600" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigateTo('get-token')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-slate-50 text-slate-800 hover:bg-teal-50"
            >
              <Ticket className="w-4 h-4 text-teal-600" />
              <span>Get Token</span>
            </button>
            <button
              onClick={() => navigateTo('live-queue')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-slate-50 text-slate-800 hover:bg-teal-50"
            >
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Live Queue</span>
            </button>
            <button
              onClick={() => navigateTo('notifications')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-slate-50 text-slate-800 hover:bg-teal-50"
            >
              <Bell className="w-4 h-4 text-teal-600" />
              <span>Notifications ({unreadNotificationCount})</span>
            </button>
            <button
              onClick={() => navigateTo('appointments')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-slate-50 text-slate-800 hover:bg-teal-50"
            >
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Appointments</span>
            </button>
            <button
              onClick={() => navigateTo('profile')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-slate-50 text-slate-800 hover:bg-teal-50"
            >
              <User className="w-4 h-4 text-slate-600" />
              <span>Patient Profile</span>
            </button>
            <button
              id="mobile-nav-btn-login"
              onClick={() => navigateTo('login')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-semibold bg-teal-50 text-teal-800 hover:bg-teal-100 col-span-2"
            >
              <LogIn className="w-4 h-4 text-teal-600" />
              <span>Sign In / Switch Account (Login Portal)</span>
            </button>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 pt-2">
            Staff & OPD Administration
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                if (!isStaffLoggedIn) navigateTo('staff-login');
                else navigateTo('staff-dashboard');
              }}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-purple-50 text-purple-900 hover:bg-purple-100"
            >
              <Stethoscope className="w-4 h-4 text-purple-600" />
              <span>Staff Dashboard</span>
            </button>
            <button
              onClick={() => {
                if (!isStaffLoggedIn) navigateTo('staff-login');
                else navigateTo('queue-management');
              }}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-purple-50 text-purple-900 hover:bg-purple-100"
            >
              <Users className="w-4 h-4 text-purple-600" />
              <span>Queue Control</span>
            </button>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 pt-2">
            Academic Concept & Evaluation
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => navigateTo('ai-estimation')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-indigo-50 text-indigo-900 hover:bg-indigo-100"
            >
              <Brain className="w-4 h-4 text-indigo-600" />
              <span>AI Waiting-Time Model</span>
            </button>
            <button
              onClick={() => navigateTo('feedback-loop')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-teal-50 text-teal-900 hover:bg-teal-100"
            >
              <Repeat className="w-4 h-4 text-teal-600" />
              <span>Dynamic Feedback Loop</span>
            </button>
            <button
              onClick={() => navigateTo('how-it-works')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-slate-100 text-slate-800"
            >
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>How It Works (6 Steps)</span>
            </button>
            <button
              onClick={() => navigateTo('features')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-slate-100 text-slate-800"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Key Features</span>
            </button>
            <button
              onClick={() => navigateTo('about-project')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-left text-sm font-medium bg-slate-100 text-slate-800"
            >
              <Info className="w-4 h-4 text-slate-600" />
              <span>About Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
