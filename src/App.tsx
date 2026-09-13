import React from 'react';
import { QueueProvider, useQueue } from './context/QueueContext';
import { DemoControlBar } from './components/DemoControlBar';
import { Navbar } from './components/Navbar';
import { WelcomeLoginPage } from './components/patient/WelcomeLoginPage';
import { LoginPage } from './components/auth/LoginPage';
import { PatientDashboard } from './components/patient/PatientDashboard';
import { GetTokenPage } from './components/patient/GetTokenPage';
import { LiveQueuePage } from './components/patient/LiveQueuePage';
import { NotificationsPage } from './components/patient/NotificationsPage';
import { AppointmentsPage } from './components/patient/AppointmentsPage';
import { ProfilePage } from './components/patient/ProfilePage';
import { StaffLoginPage } from './components/staff/StaffLoginPage';
import { StaffDashboard } from './components/staff/StaffDashboard';
import { QueueManagement } from './components/staff/QueueManagement';
import { AIWaitingEstimationPage } from './components/concept/AIWaitingEstimationPage';
import { FeedbackLoopPage } from './components/concept/FeedbackLoopPage';
import { HowItWorksPage } from './components/concept/HowItWorksPage';
import { FeaturesPage } from './components/concept/FeaturesPage';
import { AboutProjectPage } from './components/concept/AboutProjectPage';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, setCurrentView } = useQueue();

  return (
    <main className="flex-1 pb-16">
      {/* Dynamic View Router */}
      {currentView === 'login' && <LoginPage />}
      {currentView === 'patient-login' && <LoginPage defaultTab="patient" />}
      {currentView === 'patient-dashboard' && <PatientDashboard />}
      {currentView === 'get-token' && <GetTokenPage />}
      {currentView === 'live-queue' && <LiveQueuePage />}
      {currentView === 'notifications' && <NotificationsPage />}
      {currentView === 'appointments' && <AppointmentsPage />}
      {currentView === 'profile' && <ProfilePage />}

      {currentView === 'staff-login' && <StaffLoginPage />}
      {currentView === 'staff-dashboard' && <StaffDashboard />}
      {currentView === 'queue-management' && <QueueManagement />}

      {currentView === 'ai-estimation' && <AIWaitingEstimationPage />}
      {currentView === 'feedback-loop' && <FeedbackLoopPage />}
      {currentView === 'how-it-works' && <HowItWorksPage />}
      {currentView === 'features' && <FeaturesPage />}
      {currentView === 'about-project' && <AboutProjectPage />}
    </main>
  );
};

export default function App() {
  return (
    <QueueProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
        {/* Academic Presentation Bar (Sticky Top) */}
        <DemoControlBar />

        {/* Primary Hospital Navigation */}
        <Navbar />

        {/* View Router Content */}
        <MainContent />

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <span>Smart Patient Queue Management System</span>
              </div>

              <div className="text-center sm:text-right text-[11px] text-slate-500 space-y-0.5">
                <p>Academic Prototype for College Project Demonstration</p>
                <p className="text-slate-400">Simulated demonstration data only • Not for clinical diagnosis or real hospital deployment</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </QueueProvider>
  );
}
